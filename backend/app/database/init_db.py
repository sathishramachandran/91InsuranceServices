from app.database.database import engine
from app.database.base import Base

# Import all models
from app.models import User


def create_tables():
    Base.metadata.create_all(bind=engine)