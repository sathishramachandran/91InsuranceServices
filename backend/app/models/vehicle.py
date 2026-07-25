from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.user import User


class Vehicle(Base):
    __tablename__ = "vehicles"

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

    vehicle_number: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        unique=True,
        index=True
    )

    vehicle_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    manufacturer: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    model: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    fuel_type: Mapped[str] = mapped_column(
        String(30),
        nullable=False
    )

    registration_year: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    owner_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    engine_number: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    chassis_number: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    rto: Mapped[str] = mapped_column(
        String(100),
        nullable=False
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

    owner: Mapped["User"] = relationship(
        "User",
        backref="vehicles"
    )
