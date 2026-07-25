from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.vehicle import Vehicle


def create_vehicle(db: Session, vehicle: Vehicle) -> Vehicle:
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return vehicle


def get_vehicle_by_number(db: Session, vehicle_number: str) -> Optional[Vehicle]:
    return db.query(Vehicle).filter(Vehicle.vehicle_number == vehicle_number).first()


def get_user_vehicles(db: Session, user_id: int) -> List[Vehicle]:
    return db.query(Vehicle).filter(Vehicle.user_id == user_id).all()


def get_vehicle(db: Session, vehicle_id: int, user_id: int) -> Optional[Vehicle]:
    return db.query(Vehicle).filter(Vehicle.id == vehicle_id, Vehicle.user_id == user_id).first()


def delete_vehicle(db: Session, vehicle: Vehicle) -> None:
    db.delete(vehicle)
    db.commit()
