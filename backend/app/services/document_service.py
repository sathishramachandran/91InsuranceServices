import os
from pathlib import Path
from typing import List

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.crud.document import create_document, delete_document, get_user_documents
from app.models.document import Document
from app.models.vehicle import Vehicle

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


def save_upload_file(db: Session, upload_file: UploadFile, user_id: int, document_type: str, vehicle_id: int | None) -> Document:
    if not upload_file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File name is required")

    safe_name = Path(upload_file.filename).name
    destination = UPLOAD_DIR / f"{user_id}_{document_type}_{safe_name}"

    contents = upload_file.file.read()
    with destination.open("wb") as buffer:
        buffer.write(contents)

    document = Document(
        user_id=user_id,
        vehicle_id=vehicle_id,
        document_type=document_type,
        file_name=safe_name,
        file_path=str(destination),
    )

    return create_document(db, document)


def upload_document_service(db: Session, user_id: int, vehicle_id: int | None, document_type: str, upload_file: UploadFile) -> Document:
    if vehicle_id is not None:
        vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id, Vehicle.user_id == user_id).first()
        if not vehicle:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found")

    return save_upload_file(db, upload_file, user_id, document_type, vehicle_id)


def list_documents_service(db: Session, user_id: int) -> List[Document]:
    return get_user_documents(db, user_id)


def remove_document_service(db: Session, user_id: int, document_id: int) -> None:
    document = db.query(Document).filter(Document.id == document_id, Document.user_id == user_id).first()
    if not document:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")

    if os.path.exists(document.file_path):
        os.remove(document.file_path)

    delete_document(db, document)
