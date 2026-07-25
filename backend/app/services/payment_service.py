from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.payment import create_payment, get_payments_by_user
from app.models.payment import Payment
from app.models.quote import Quote
from app.schemas.payment import PaymentCreate


def record_payment_service(db: Session, user_id: int, payment_data: PaymentCreate) -> Payment:
    if payment_data.quote_id is not None:
        quote = db.query(Quote).filter(Quote.id == payment_data.quote_id, Quote.user_id == user_id).first()
        if not quote:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Quote not found"
            )

    payment = Payment(
        user_id=user_id,
        quote_id=payment_data.quote_id,
        amount=payment_data.amount,
        payment_status=payment_data.payment_status,
        transaction_reference=payment_data.transaction_reference or "",
        payment_method=payment_data.payment_method,
    )

    return create_payment(db, payment)


def list_payments_service(db: Session, user_id: int):
    return get_payments_by_user(db, user_id)
