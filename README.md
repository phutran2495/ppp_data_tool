# PPP Data Analysis Tool

## 🚀 Project Overview

This tool automates the scraping, validation, processing, and querying of Paycheck Protection Program (PPP) loan data from the U.S. Small Business Administration (SBA)'s public dataset.

It showcases an end-to-end data engineering workflow involving:
- Web scraping
- Data validation and transformation
- PostgreSQL data storage
- REST API querying
- Dockerized deployment

---

## 🛠️ Tech Stack

- **Python 3.12**
- **FastAPI** – RESTful API framework
- **Playwright** – Headless browser automation for scraping
- **Pandas** – Data parsing and transformation
- **SQLAlchemy** – ORM for database interactions
- **PostgreSQL** – Relational data storage
- **Docker + Docker Compose** – Containerization and orchestration
- **uv** – Fast Python dependency manager

---

## 🔍 Design Decisions

### 🕸 Web Scraping

- The `/load` API endpoint triggers data scraping. Although this could be handled by a standalone script, exposing it via an endpoint for better usability 
- **Playwright** is used to navigate [https://data.sba.gov/organization](https://data.sba.gov/organization) and locate the latest CSV and Excel files.
- The actual download of the CSV file is performed using `aiohttp` after the URL is retrieved via Playwright.
- Both files are saved to `tmp/downloads/` for staging and debugging, though they can be streamed into memory if needed. For massive data , we can stage them to a blog storage like S3 and another process will pick the files and load to the database

### 📊 Data Validation & Cleaning

- The downloaded CSV is parsed using **pandas**.
- Schema validation is performed by comparing against the columns defined in the Excel data dictionary, missing collumns will raise an error
- Data is cleaned to remove any rows with invalid or missing values.
- The `LoanNumber` column is used as the primary key for the database table.
- Fields are coerced to correct data types: numeric and datetime values are parsed gracefully.
- Records with missing primary keys (`LoanNumber`) are dropped.
- Data is limited to the first 10,000 rows to improve loading speed during local development.

### 🗄️ PostgreSQL Integration

- Database schema is auto-generated using `SQLAlchemy`'s `Base.metadata.create_all()` on Fastapi's startup
- Records are bulk-inserted into the database using the ORM layer.
- The PostgreSQL database is containerized and provisioned via `docker-compose`.

### 🌐 API Development

- `/load`: Triggers scraping, validation, cleaning, and insertion into the database.
- `/search?name=...`: Searches businesses by name with optional filters for city and state.
- `/business/{tin}`: Returns business details for a given TIN (Tax Identification Number, aka `LoanNumber`).
- Performance is improved via SQL indexes on searchable fields: `borrowername`, `borrowercity`, and `borrowerstate`.

---

## 🔧 Setup Instructions

### 📦 One-liner Setup

```bash
docker-compose up --build