from datetime import datetime

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.quote import create_quote, get_quotes_by_user, get_user_quote_by_vehicle
from app.models.quote import Quote
from app.models.vehicle import Vehicle
from app.schemas.quote import QuoteRequestCreate


def submit_quote_request(db: Session, user_id: int, quote_data: QuoteRequestCreate) -> Quote:
    vehicle = db.query(Vehicle).filter(Vehicle.id == quote_data.vehicle_id, Vehicle.user_id == user_id).first()
    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found"
        )

    existing_quote = get_user_quote_by_vehicle(db, user_id, quote_data.vehicle_id)
    if existing_quote:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Quote request already exists for this vehicle"
        )

    quote = Quote(
        user_id=user_id,
        vehicle_id=quote_data.vehicle_id,
        claim=quote_data.claim,
        name_transfer=quote_data.name_transfer,
        ncb=quote_data.ncb or "",
        previous_insurance_company=quote_data.previous_insurance_company or "",
        expiry_date=datetime.combine(quote_data.expiry_date, datetime.min.time()) if quote_data.expiry_date else None,
        remarks=quote_data.remarks or "",
        status="pending"
    )

    return create_quote(db, quote)


def list_user_quotes(db: Session, user_id: int):
    return get_quotes_by_user(db, user_id)
