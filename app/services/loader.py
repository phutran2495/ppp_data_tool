from db.database import SessionLocal
from db.models import PPPRecordDB
import pandas as pd

def insert_ppp_records(df: pd.DataFrame):
    session = SessionLocal()
    try:
        rows = []
        for _, row in df.iterrows():
            # Convert pandas row to dict and lower-case keys
            row_dict = {k.lower(): v for k, v in row.to_dict().items()}
            record = PPPRecordDB(**row_dict)
            rows.append(record)

        session.add_all(rows)
        session.commit()
        print(f"✅ Inserted {len(rows)} records into ppp_loans.")
    except Exception as e:
        session.rollback()
        raise RuntimeError(f"❌ Failed to insert records: {e}")
    finally:
        print("Closing session...")
        session.close()