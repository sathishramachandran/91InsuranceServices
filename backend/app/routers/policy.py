from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.crud.user import get_user_by_email
from app.database.session import get_db
from app.schemas.policy import PolicyCreate, PolicyResponse
from app.services.policy_service import upload_policy_service, list_policies_service

router = APIRouter(
    prefix="/policies",
    tags=["Policies"],
)


def get_authenticated_user_id(db: Session, current_user: str) -> int:
    user = get_user_by_email(db, current_user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user.id


@router.post("", response_model=PolicyResponse, status_code=201)
def upload_policy(
    policy: PolicyCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    return upload_policy_service(db, user_id, policy)


@router.get("", response_model=list[PolicyResponse])
def list_policies(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    return list_policies_service(db, user_id)
