from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.crud.user import get_user_by_email
from app.database.session import get_db
from app.schemas.quote import QuoteRequestCreate, QuoteRequestResponse
from app.services.quote_service import submit_quote_request, list_user_quotes

router = APIRouter(
    prefix="/quotes",
    tags=["Quotes"],
)


def get_authenticated_user_id(db: Session, current_user: str) -> int:
    user = get_user_by_email(db, current_user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user.id


@router.post("", response_model=QuoteRequestResponse, status_code=201)
def create_quote(
    quote: QuoteRequestCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    return submit_quote_request(db, user_id, quote)


@router.get("", response_model=list[QuoteRequestResponse])
def list_quotes(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    return list_user_quotes(db, user_id)
