from datetime import date

from pydantic import BaseModel, Field


class QuoteRequestCreate(BaseModel):
    vehicle_id: int
    claim: bool = Field(default=False)
    name_transfer: bool = Field(default=False)
    ncb: str | None = None
    previous_insurance_company: str | None = None
    expiry_date: date | None = None
    remarks: str | None = Field(default=None, max_length=500)


class QuoteRequestResponse(BaseModel):
    id: int
    user_id: int
    vehicle_id: int
    claim: bool
    name_transfer: bool
    ncb: str | None
    previous_insurance_company: str | None
    expiry_date: date | None
    remarks: str | None
    status: str

    class Config:
        from_attributes = True
