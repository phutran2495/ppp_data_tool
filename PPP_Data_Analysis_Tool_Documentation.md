
# PPP Data Analysis Tool - Documentation

## 🚀 Project Overview
This tool is built to automate the scraping, validation, processing, and querying of Paycheck Protection Program (PPP) loan data from the U.S. Small Business Administration (SBA) public dataset.

It serves as a demonstration of end-to-end data engineering with:
- Web scraping
- Data processing
- PostgreSQL data storage
- REST API querying
- Dockerized deployment

---

## 📆 Tech Stack
- **Python 3.12**
- **FastAPI**: For building the REST API
- **Playwright**: For automating browser-based scraping
- **Pandas**: For processing CSV and Excel files
- **SQLAlchemy**: For ORM-based database modeling
- **PostgreSQL**: For data storage
- **Docker + Docker Compose**: For containerized development and deployment
- **uv**: For dependency management

---

## 🔍 Design Decisions

### 🗓 Web Scraping
- Used **Playwright** to navigate and interact with [https://data.sba.gov/organization](https://data.sba.gov/organization) due to JavaScript-rendered content.
- Programmatically locates and downloads the PPP FOIA CSV data and the data dictionary Excel file.

### 📊 Data Validation & Cleaning
- The CSV is parsed using **pandas**.
- Data is validated by comparing columns against the downloaded **data dictionary**.
- Missing or incorrectly typed values are coerced and handled.
- Datetime and numeric conversions are handled gracefully.
- Final dataset is limited to 30,000 rows to optimize load performance.

### 🚚 PostgreSQL Integration
- Tables are created automatically using SQLAlchemy's `Base.metadata.create_all()`.
- Records are bulk inserted using SQLAlchemy ORM.
- PostgreSQL service is containerized and initialized via `docker-compose.yml`.

### 👩‍💻 API Development
- `/load`: Triggers scraping, processing, and loading into the DB
- `/search?name=...`: Search businesses by name, with optional filters
- `/business/{tin}`: Get business info by TIN
- Query performance is improved by indexing searchable fields

---

## 🔄 Setup Instructions

### ✨ One-Liner
```bash
docker-compose up --build
```

### 📂 Project Structure
```
app/
├── main.py                # FastAPI entry point
├── db/
│   ├── models.py          # SQLAlchemy models
│   └── database.py        # DB engine & session
├── services/
│   ├── scraper.py         # Playwright scraping logic
│   ├── processor.py       # CSV cleaning/validation
│   └── loader.py          # Data insertion logic
├── api/
│   └── routes.py          # FastAPI endpoints
├── pyproject.toml         # uv dependency manager
├── uv.lock                # Locked dependency versions
Dockerfile                 # FastAPI Docker build
docker-compose.yml         # App + PostgreSQL
```

### 🗂 Environment Variables
Inside `docker-compose.yml`, FastAPI uses:
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/ppp_db
```

You can override this via `.env` if needed.

---

## 🔐 API Endpoints
| Method | Endpoint              | Description |
|--------|------------------------|-------------|
| GET    | `/load`               | Triggers scraping and loading |
| GET    | `/search?name=...`    | Search for businesses by name |
| GET    | `/business/{tin}`     | Get business record by TIN |

Swagger UI: http://localhost:8000/docs

---

## 📊 Example Queries

### Search by Name
```
GET /search?name=STARBUCKS
```

### Get Business by TIN
```
GET /business/1234567890
```

---

## 🌍 Deployment Notes
- FastAPI app is built and served using `uvicorn` with `--reload` for local development.
- `uv` is used in Docker for dependency resolution based on `pyproject.toml`.
- PostgreSQL data persists via the `pg_data` named volume.

---

## 💪 Future Improvements
- Add pagination and fuzzy search support
- Include frontend interface for easier browsing
- Integrate Alembic for schema migration
- Add unit and integration test coverage

---

## ✅ License
MIT
