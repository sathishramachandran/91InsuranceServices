import os
import re
from datetime import date, timedelta
from typing import Any

import httpx
from fastapi import HTTPException, status


def normalize_registration_number(registration_number: str) -> str:
    return re.sub(r"[^A-Z0-9]", "", registration_number.upper())


def mask_policy_number(policy_number: str | None) -> str | None:
    if not policy_number:
        return None
    compact = policy_number.replace(" ", "")
    if len(compact) <= 4:
        return compact
    return f"{'*' * (len(compact) - 4)}{compact[-4:]}"


def _status_from_expiry(expiry_date: str | None) -> str:
    if not expiry_date:
        return "UNKNOWN"
    try:
        parsed = date.fromisoformat(expiry_date)
    except ValueError:
        return "UNKNOWN"
    return "ACTIVE" if parsed >= date.today() else "EXPIRED"


def _demo_lookup(registration_number: str) -> dict[str, Any]:
    normalized = normalize_registration_number(registration_number)
    if len(normalized) < 6:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Enter a valid vehicle registration number.",
        )

    active = not normalized.endswith(("0", "9"))
    expiry = date.today() + timedelta(days=74 if active else -18)
    insurer = "Demo General Insurance" if active else "Previous Demo Insurance"

    return {
        "registration_number": normalized,
        "insurance_status": "ACTIVE" if active else "EXPIRED",
        "insurer_name": insurer,
        "policy_number": mask_policy_number(f"POL{normalized[-4:]}2026"),
        "insurance_valid_until": expiry.isoformat(),
        "source": "demo",
        "message": "Demo data. Add a compliant provider API key for live VAHAN/RTO results.",
    }


def _extract_first(data: dict[str, Any], keys: tuple[str, ...]) -> Any:
    for key in keys:
        value = data.get(key)
        if value not in (None, ""):
            return value
    return None


def _normalize_provider_response(
    registration_number: str,
    raw: Any,
    source: str,
    message: str,
) -> dict[str, Any]:
    data = raw.get("data", raw) if isinstance(raw, dict) else {}
    if isinstance(data, dict) and isinstance(data.get("result"), dict):
        data = data["result"]
    if isinstance(data, dict) and isinstance(data.get("response"), dict):
        data = data["response"]
    if not isinstance(data, dict):
        data = {}

    expiry = _extract_first(
        data,
        (
            "insurance_valid_upto",
            "insurance_valid_until",
            "insurance_expiry",
            "insurance_expiry_date",
            "insurance_validity",
            "rc_insurance_upto",
        ),
    )
    insurer = _extract_first(
        data,
        (
            "insurance_company",
            "insurer_name",
            "insurance_name",
            "insurer",
            "rc_insurance_comp",
        ),
    )
    policy = _extract_first(
        data,
        (
            "insurance_policy_number",
            "policy_number",
            "insurance_policy_no",
            "rc_insurance_policy_no",
        ),
    )
    provider_status = _extract_first(data, ("insurance_status", "status", "rc_status"))

    return {
        "registration_number": normalize_registration_number(registration_number),
        "insurance_status": str(provider_status or _status_from_expiry(expiry)).upper(),
        "insurer_name": insurer,
        "policy_number": mask_policy_number(str(policy)) if policy else None,
        "insurance_valid_until": expiry,
        "source": source,
        "message": message,
    }


async def _generic_provider_lookup(registration_number: str) -> dict[str, Any]:
    endpoint = os.getenv("RTO_API_URL")
    api_key = os.getenv("RTO_API_KEY")
    if not endpoint or not api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Live RTO provider is not configured. Set RTO_API_URL and RTO_API_KEY, or use demo mode.",
        )

    payload_key = os.getenv("RTO_API_REGISTRATION_FIELD", "registration_no")
    auth_header = os.getenv("RTO_API_AUTH_HEADER", "Authorization")
    auth_prefix = os.getenv("RTO_API_AUTH_PREFIX", "Bearer")
    headers = {
        "Content-Type": "application/json",
        auth_header: f"{auth_prefix} {api_key}".strip(),
    }

    try:
        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.post(endpoint, json={payload_key: registration_number}, headers=headers)
            response.raise_for_status()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"RTO provider rejected the request with status {exc.response.status_code}.",
        ) from exc
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unable to reach the configured RTO provider.",
        ) from exc

    return _normalize_provider_response(
        registration_number,
        response.json(),
        "live",
        "Live provider response normalized by backend.",
    )


async def _rapidapi_lookup(registration_number: str) -> dict[str, Any]:
    api_key = os.getenv("RTO_RAPIDAPI_KEY")
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="RapidAPI RTO provider is not configured. Set RTO_RAPIDAPI_KEY in backend .env.",
        )

    endpoint = os.getenv("RTO_RAPIDAPI_URL", "https://rto-vehicle-details.p.rapidapi.com/api")
    host = os.getenv("RTO_RAPIDAPI_HOST", "rto-vehicle-details.p.rapidapi.com")

    try:
        async with httpx.AsyncClient(timeout=25) as client:
            response = await client.post(
                endpoint,
                json={"vehicle_number": registration_number},
                headers={
                    "Content-Type": "application/json",
                    "x-rapidapi-key": api_key,
                    "x-rapidapi-host": host,
                },
            )
            response.raise_for_status()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"RapidAPI RTO provider rejected the request with status {exc.response.status_code}.",
        ) from exc
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unable to reach RapidAPI RTO provider.",
        ) from exc

    return _normalize_provider_response(
        registration_number,
        response.json(),
        "rapidapi",
        "RapidAPI RTO response normalized by backend.",
    )


async def lookup_insurance_status(registration_number: str) -> dict[str, Any]:
    normalized = normalize_registration_number(registration_number)
    provider = os.getenv("RTO_PROVIDER", "demo").lower()

    if provider == "demo":
        return _demo_lookup(normalized)
    if provider == "rapidapi":
        return await _rapidapi_lookup(normalized)
    if provider == "generic":
        return await _generic_provider_lookup(normalized)

    raise HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail="Unsupported RTO_PROVIDER. Use 'demo', 'rapidapi', or 'generic'.",
    )
