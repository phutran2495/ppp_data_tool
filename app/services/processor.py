import pandas as pd
import numpy as np
from services.logger import get_logger

logger = get_logger()

def load_ppp_csv(csv_path: str) -> pd.DataFrame:
    try:
        logger.info("Loading PPP CSV...")
        df = pd.read_csv(csv_path, dtype=str, encoding="utf-8")
        logger.info(f"✅ Loaded PPP CSV with {len(df)} rows and {len(df.columns)} columns.")
        return df.head(10000)  # Limit to 10,000 rows for testing
    except UnicodeDecodeError:
        logger.info("⚠️ UTF-8 decoding failed. Trying ISO-8859-1 encoding...")
        try:
            df = pd.read_csv(csv_path, dtype=str, encoding="ISO-8859-1")
            logger.info(f"✅ Loaded PPP CSV with fallback encoding. Rows: {len(df)} Columns: {len(df.columns)}")
            return df.head(10000)  # Limit to 10,000 rows for testing
        except Exception as e:
            raise RuntimeError(f"❌ Failed to load CSV with fallback encoding: {e}")
    except Exception as e:
        raise RuntimeError(f"❌ Failed to load CSV: {e}")

def validate_schema(csv_df: pd.DataFrame, dict_path: str) -> list:
    dict_df = pd.read_excel(dict_path, usecols=[0, 1], names=["Field", "Description"], skiprows=1)
    expected_columns = dict_df["Field"].dropna().tolist()
    missing = [col for col in expected_columns if col not in csv_df.columns]
    
    if missing:
        logger.info(f"❌ CSV is missing {len(missing)} column(s): {missing}")
        return False

    logger.info("✅ CSV matches the data dictionary schema.")
    
    return True

def clean_ppp_data(df: pd.DataFrame) -> pd.DataFrame:
    df.columns = [col.strip() for col in df.columns]

    # Drop rows missing primary identifiers
    df = df.dropna(subset=["LoanNumber"])

    # Convert numeric and date columns safely
    numeric_cols = [
        "InitialApprovalAmount", "CurrentApprovalAmount",
        "ForgivenessAmount", "SBAGuarantyPercentage", "JobsReported", "Term"
    ]
    date_cols = ["DateApproved", "LoanStatusDate", "ForgivenessDate"]

    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    for col in date_cols:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors="coerce")
    df = df.replace({pd.NaT: None, np.nan: None, "NaT": None})
    logger.info("✅ Cleaned and formatted data.")
    return df