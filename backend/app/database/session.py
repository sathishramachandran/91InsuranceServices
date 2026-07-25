from sqlalchemy.orm import sessionmaker

from app.database.database import engine

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    future=True
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()