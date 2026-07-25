from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Quote(Base):
    __tablename__ = "quotes"

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

    vehicle_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("vehicles.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    claim: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    name_transfer: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    ncb: Mapped[str] = mapped_column(
        String(50),
        nullable=True,
        default=""
    )

    previous_insurance_company: Mapped[str] = mapped_column(
        String(100),
        nullable=True,
        default=""
    )

    expiry_date: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=True
    )

    remarks: Mapped[str] = mapped_column(
        String(500),
        nullable=True,
        default=""
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="pending",
        nullable=False,
        index=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    user = relationship("User", backref="quotes")
    vehicle = relationship("Vehicle", backref="quotes")
