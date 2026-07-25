from pydantic import BaseModel, Field


class PaymentCreate(BaseModel):
    quote_id: int | None = None
    amount: float = Field(..., gt=0)
    payment_status: str = Field(default="pending", max_length=50)
    transaction_reference: str | None = None
    payment_method: str = Field(default="offline", max_length=100)


class PaymentResponse(BaseModel):
    id: int
    user_id: int
    quote_id: int | None
    amount: float
    payment_status: str
    transaction_reference: str | None
    payment_method: str

    class Config:
        from_attributes = True
