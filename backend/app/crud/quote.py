from typing import List

from sqlalchemy.orm import Session

from app.models.quote import Quote


def create_quote(db: Session, quote: Quote) -> Quote:
    db.add(quote)
    db.commit()
    db.refresh(quote)
    return quote


def get_quotes_by_user(db: Session, user_id: int) -> List[Quote]:
    return db.query(Quote).filter(Quote.user_id == user_id).all()


def get_quote(db: Session, quote_id: int, user_id: int) -> Quote | None:
    return db.query(Quote).filter(Quote.id == quote_id, Quote.user_id == user_id).first()


def get_user_quote_by_vehicle(db: Session, user_id: int, vehicle_id: int) -> Quote | None:
    return db.query(Quote).filter(Quote.user_id == user_id, Quote.vehicle_id == vehicle_id).first()
