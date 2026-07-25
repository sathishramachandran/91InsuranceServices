from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.policy import create_policy, get_policies_by_user
from app.models.policy import Policy
from app.models.vehicle import Vehicle
from app.schemas.policy import PolicyCreate


def upload_policy_service(db: Session, user_id: int, policy_data: PolicyCreate) -> Policy:
    vehicle = db.query(Vehicle).filter(Vehicle.id == policy_data.vehicle_id, Vehicle.user_id == user_id).first()
    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found"
        )

    policy = Policy(
        user_id=user_id,
        vehicle_id=policy_data.vehicle_id,
        quote_id=policy_data.quote_id,
        policy_number=policy_data.policy_number,
        insurance_company=policy_data.insurance_company,
        premium_amount=policy_data.premium_amount,
        issue_date=policy_data.issue_date,
        expiry_date=policy_data.expiry_date,
        document_path=policy_data.document_path,
        status="active"
    )

    return create_policy(db, policy)


def list_policies_service(db: Session, user_id: int):
    return get_policies_by_user(db, user_id)
