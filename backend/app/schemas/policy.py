from datetime import date

from pydantic import BaseModel, Field


class PolicyCreate(BaseModel):
    vehicle_id: int
    quote_id: int | None = None
    policy_number: str = Field(..., min_length=3, max_length=100)
    insurance_company: str = Field(..., min_length=2, max_length=100)
    premium_amount: float = Field(..., gt=0)
    issue_date: date
    expiry_date: date
    document_path: str = Field(..., min_length=1, max_length=500)


class PolicyResponse(BaseModel):
    id: int
    user_id: int
    vehicle_id: int
    quote_id: int | None
    policy_number: str
    insurance_company: str
    premium_amount: float
    issue_date: date
    expiry_date: date
    document_path: str
    status: str

    class Config:
        from_attributes = True
