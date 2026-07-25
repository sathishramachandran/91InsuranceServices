from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.crud.user import get_user_by_email
from app.database.session import get_db
from app.schemas.vehicle import InsuranceStatusRequest, InsuranceStatusResponse, VehicleCreate, VehicleResponse
from app.services.rto_insurance_service import lookup_insurance_status
from app.services.vehicle_service import add_vehicle_service, get_vehicle_service, list_vehicle_service, remove_vehicle_service

router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicles"],
)


def get_authenticated_user_id(db: Session, current_user: str) -> int:
    user = get_user_by_email(db, current_user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user.id


@router.post("", response_model=VehicleResponse, status_code=201)
def create_vehicle(
    vehicle: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    return add_vehicle_service(db, user_id, vehicle)


@router.get("", response_model=list[VehicleResponse])
def list_vehicles(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    return list_vehicle_service(db, user_id)


@router.post("/insurance-status", response_model=InsuranceStatusResponse)
async def get_insurance_status(
    request: InsuranceStatusRequest,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    get_authenticated_user_id(db, current_user)
    return await lookup_insurance_status(request.registration_number)


@router.get("/{vehicle_id}", response_model=VehicleResponse)
def get_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    return get_vehicle_service(db, user_id, vehicle_id)


@router.delete("/{vehicle_id}", status_code=204)
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    user_id = get_authenticated_user_id(db, current_user)
    remove_vehicle_service(db, user_id, vehicle_id)
    return None
