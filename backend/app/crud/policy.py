from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.policy import Policy


def create_policy(db: Session, policy: Policy) -> Policy:
    db.add(policy)
    db.commit()
    db.refresh(policy)
    return policy


def get_policies_by_user(db: Session, user_id: int) -> List[Policy]:
    return db.query(Policy).filter(Policy.user_id == user_id).all()


def get_policy(db: Session, policy_id: int, user_id: int) -> Optional[Policy]:
    return db.query(Policy).filter(Policy.id == policy_id, Policy.user_id == user_id).first()
