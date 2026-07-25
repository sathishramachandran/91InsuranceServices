from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.payment import Payment


def create_payment(db: Session, payment: Payment) -> Payment:
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment


def get_payments_by_user(db: Session, user_id: int) -> List[Payment]:
    return db.query(Payment).filter(Payment.user_id == user_id).all()


def get_payment(db: Session, payment_id: int, user_id: int) -> Optional[Payment]:
    return db.query(Payment).filter(Payment.id == payment_id, Payment.user_id == user_id).first()
