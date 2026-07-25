from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.user import (
    UserRegister,
    UserResponse,
)

from app.schemas.login import UserLogin

from app.services.auth_service import (
    register_user,
    login_user,
)

from app.auth.dependencies import (
    get_current_user,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201
)
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    return register_user(db, user)


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    return login_user(db, user)


@router.get("/profile")
def profile(
    current_user: str = Depends(get_current_user)
):
    return {
        "email": current_user
    }