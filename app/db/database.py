from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Load from environment or fallback default
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:Password123!@getbismart-db-cluster.cluster-ccauumjcjayl.us-west-1.rds.amazonaws.com:5432/applevel-development")

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Session› factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarative base model
Base = declarative_base()

def init_db():
    """Create the database tables."""
    from db.models import PPPRecordDB  # Import models here to avoid circular imports
    Base.metadata.create_all(bind=engine)