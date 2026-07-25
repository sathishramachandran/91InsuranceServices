from pydantic import BaseModel, Field


class DocumentUpload(BaseModel):
    vehicle_id: int | None = None
    document_type: str = Field(..., min_length=2, max_length=50)


class DocumentResponse(BaseModel):
    id: int
    user_id: int
    vehicle_id: int | None
    document_type: str
    file_name: str
    file_path: str

    class Config:
        from_attributes = True
