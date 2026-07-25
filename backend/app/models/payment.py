from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Payment(Base):
    __tablename__ = "payments"

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

    quote_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("quotes.id", ondelete="SET NULL"),
        nullable=True,
        index=True
    )

    amount: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False,
        default=0.0
    )

    payment_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="pending"
    )

    transaction_reference: Mapped[str] = mapped_column(
        String(200),
        nullable=True
    )

    payment_method: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="offline"
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

    user = relationship("User", backref="payments")
    quote = relationship("Quote", backref="payments")
