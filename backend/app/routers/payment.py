from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.crud.user import get_user_by_email
from app.database.session import get_db
from app.schemas.payment import PaymentCreate, PaymentResponse
from app.services.payment_service import record_payment_service, list_payments_service

router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


def get_authenticated_user_id(db: Session, current_user: str) -> int:
    user = get_user_by_email(db, current_user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user.id


@router.post("", response_model=PaymentResponse, status_code=201)
def create_payment(
    payment: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    return record_payment_service(db, user_id, payment)


@router.get("", response_model=list[PaymentResponse])
def list_payments(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    return list_payments_service(db, user_id)
