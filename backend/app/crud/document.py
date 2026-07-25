from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.document import Document


def create_document(db: Session, document: Document) -> Document:
    db.add(document)
    db.commit()
    db.refresh(document)
    return document


def get_user_documents(db: Session, user_id: int) -> List[Document]:
    return db.query(Document).filter(Document.user_id == user_id).all()


def get_document(db: Session, document_id: int, user_id: int) -> Optional[Document]:
    return db.query(Document).filter(Document.id == document_id, Document.user_id == user_id).first()


def delete_document(db: Session, document: Document) -> None:
    db.delete(document)
    db.commit()
