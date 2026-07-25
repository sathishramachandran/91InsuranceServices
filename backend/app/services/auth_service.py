from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.crud.user import (
    get_user_by_email,
    create_user,
)
from app.auth.password import (
    hash_password,
    verify_password,
)
from app.auth.jwt import create_access_token


def register_user(db: Session, user_data):
    """
    Register a new user.
    """

    existing_user = get_user_by_email(
        db,
        user_data.email
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    new_user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        phone=user_data.phone,
        password=hash_password(user_data.password),
        role="customer"
    )

    return create_user(
        db,
        new_user
    )


def login_user(db: Session, login_data):
    """
    Login user.
    """

    user = get_user_by_email(
        db,
        login_data.email
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_password(
        login_data.password,
        user.password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }