from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.vehicle import create_vehicle, delete_vehicle, get_user_vehicles, get_vehicle_by_number, get_vehicle
from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleCreate


def add_vehicle_service(db: Session, user_id: int, vehicle_data: VehicleCreate) -> Vehicle:
    existing_vehicle = get_vehicle_by_number(db, vehicle_data.vehicle_number)
    if existing_vehicle:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Vehicle with this number already exists"
        )

    vehicle = Vehicle(
        user_id=user_id,
        vehicle_number=vehicle_data.vehicle_number,
        vehicle_type=vehicle_data.vehicle_type,
        manufacturer=vehicle_data.manufacturer,
        model=vehicle_data.model,
        fuel_type=vehicle_data.fuel_type,
        registration_year=vehicle_data.registration_year,
        owner_name=vehicle_data.owner_name,
        engine_number=vehicle_data.engine_number,
        chassis_number=vehicle_data.chassis_number,
        rto=vehicle_data.rto,
    )

    return create_vehicle(db, vehicle)


def list_vehicle_service(db: Session, user_id: int):
    return get_user_vehicles(db, user_id)


def get_vehicle_service(db: Session, user_id: int, vehicle_id: int) -> Vehicle:
    vehicle = get_vehicle(db, vehicle_id, user_id)
    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found"
        )
    return vehicle


def remove_vehicle_service(db: Session, user_id: int, vehicle_id: int) -> None:
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id, Vehicle.user_id == user_id).first()
    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found"
        )

    delete_vehicle(db, vehicle)
