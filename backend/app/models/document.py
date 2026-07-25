from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Document(Base):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    vehicle_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("vehicles.id", ondelete="CASCADE"),
        nullable=True,
        index=True
    )

    document_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True
    )

    file_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    file_path: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    owner: Mapped["User"] = relationship(
        "User",
        backref="documents"
    )

    vehicle: Mapped["Vehicle | None"] = relationship(
        "Vehicle",
        backref="documents"
    )
