from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.crud.user import get_user_by_email
from app.database.session import get_db
from app.schemas.document import DocumentResponse
from app.services.document_service import list_documents_service, remove_document_service, upload_document_service

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


def get_authenticated_user_id(db: Session, current_user: str) -> int:
    user = get_user_by_email(db, current_user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user.id


@router.post("", response_model=DocumentResponse, status_code=201)
def upload_document(
    document_type: str,
    vehicle_id: int | None = None,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    return upload_document_service(db, user_id, vehicle_id, document_type, file)


@router.get("", response_model=list[DocumentResponse])
def list_documents(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    return list_documents_service(db, user_id)


@router.delete("/{document_id}", status_code=204)
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    remove_document_service(db, user_id, document_id)
    return None
