from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError

from app.auth.jwt import verify_token

# Login endpoint that returns the JWT
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Validate JWT and return the current user's email.
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = verify_token(token)

        email = payload.get("sub")

        if email is None:
            raise credentials_exception

        return email

    except JWTError:
        raise credentials_exception