from sqlalchemy.orm import Session

from app.models.user import User


def get_user_by_email(db: Session, email: str):
    """
    Get user by email.
    """
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: User):
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    except Exception as e:
        db.rollback()
        print("DATABASE ERROR:", repr(e))
        raise