from pydantic import BaseModel, Field


class VehicleCreate(BaseModel):
    vehicle_number: str = Field(..., min_length=3, max_length=30)
    vehicle_type: str = Field(..., min_length=2, max_length=50)
    manufacturer: str = Field(..., min_length=2, max_length=100)
    model: str = Field(..., min_length=2, max_length=100)
    fuel_type: str = Field(..., min_length=2, max_length=30)
    registration_year: int = Field(..., ge=1900, le=2100)
    owner_name: str = Field(..., min_length=2, max_length=100)
    engine_number: str = Field(..., min_length=3, max_length=50)
    chassis_number: str = Field(..., min_length=3, max_length=50)
    rto: str = Field(..., min_length=2, max_length=100)


class VehicleResponse(BaseModel):
    id: int
    user_id: int
    vehicle_number: str
    vehicle_type: str
    manufacturer: str
    model: str
    fuel_type: str
    registration_year: int
    owner_name: str
    engine_number: str
    chassis_number: str
    rto: str

    class Config:
        from_attributes = True


class InsuranceStatusRequest(BaseModel):
    registration_number: str = Field(..., min_length=3, max_length=30)


class InsuranceStatusResponse(BaseModel):
    registration_number: str
    insurance_status: str
    insurer_name: str | None = None
    policy_number: str | None = None
    insurance_valid_until: str | None = None
    source: str
    message: str
