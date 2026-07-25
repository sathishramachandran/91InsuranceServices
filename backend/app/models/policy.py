from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Policy(Base):
    __tablename__ = "policies"

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

    quote_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("quotes.id", ondelete="SET NULL"),
        nullable=True,
        index=True
    )

    policy_number: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True
    )

    insurance_company: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    premium_amount: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False,
        default=0.0
    )

    issue_date: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False
    )

    expiry_date: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False
    )

    document_path: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="active",
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

    user = relationship("User", backref="policies")
    vehicle = relationship("Vehicle", backref="policies")
    quote = relationship("Quote", backref="policies")
