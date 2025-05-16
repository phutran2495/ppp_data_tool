# PPP Data Tool – Baselayer Interview Project

This project is a small-scale data scraping, processing, and API service built using FastAPI, Playwright, PostgreSQL, and Docker. It scrapes PPP loan data from the SBA website, validates and stores it, and serves it through a RESTful API.

---

## 🚀 Features

- Scrapes PPP loan CSV data from https://data.sba.gov/dataset/ppp-foia
- Cleans and validates records using Pydantic
- Stores data in PostgreSQL
- Exposes REST API to search businesses and retrieve records
- Fully containerized using Docker and Docker Compose

---

## 🧱 Tech Stack

- Python 3.10
- FastAPI
- Playwright (for scraping)
- PostgreSQL (via Docker)
- Pydantic, SQLAlchemy
- Docker + Docker Compose
- `uv` for dependency management

---

## 📁 Project Structure

```bash
ppp_data_tool/
├── app/
│   ├── api/            # FastAPI routes
│   ├── db/             # SQLAlchemy models and DB setup
│   ├── schemas/        # Pydantic models
│   ├── services/       # Scraper + data processor
│   └── main.py         # FastAPI app entrypoint
├── docker/             # Dockerfile
├── docker-compose.yml  # Compose config
├── pyproject.toml       # Dependencies
├── .env                 # Environment variables
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ppp_data_tool
```

### 2. Add environment variables
Create a `.env` file:
```env
DATABASE_URL=postgresql://ppp_user:ppp_pass@db:5432/ppp_db
```

### 3. Run the project with Docker
```bash
docker compose up --build
```

The API will be available at: [http://localhost:8000](http://localhost:8000)

---

## 🧪 API Endpoints

### `GET /search?name=partial_name`
- Search businesses by borrower name (case-insensitive)

### `GET /business/{tin}`
- Fetch a business record by internal ID (used as TIN placeholder)

---

## ✅ Example Workflow

1. Scrape PPP data using Playwright (automatically handled on startup)
2. Validate and clean with Pydantic
3. Load into PostgreSQL via SQLAlchemy
4. Serve data through FastAPI endpoints

---

## 📝 Notes

- Uses `uv` instead of pip for fast dependency installation
- Playwright is headless and auto-installs Chromium in Docker
- Database is persisted using Docker volumes

---

## 📬 Contact
For any questions, feel free to reach out.

---

**Made for the Baselayer engineering interview project.**