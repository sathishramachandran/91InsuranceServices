from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine
from app.database.base import Base

# Import routers
from app.routers.auth import router as auth_router
from app.routers.document import router as document_router
from app.routers.payment import router as payment_router
from app.routers.policy import router as policy_router
from app.routers.quote import router as quote_router
from app.routers.vehicle import router as vehicle_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="91 Insurance Services API",
    description="Backend API for 91 Insurance Services",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home
@app.get("/")
def home():
    return {
        "message": "Welcome to 91 Insurance Services API"
    }

# Health Check
@app.get("/health")
def health():
    return {
        "status": "Running"
    }

# Register Routers
app.include_router(auth_router)
app.include_router(document_router)
app.include_router(payment_router)
app.include_router(policy_router)
app.include_router(quote_router)
app.include_router(vehicle_router)