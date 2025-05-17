FROM python:3.12-slim

WORKDIR /app

# Install system dependencies & uv
RUN apt-get update && apt-get install -y \
    curl gcc libpq-dev build-essential \
    libglib2.0-0 libnss3 libnspr4 libdbus-1-3 libatk1.0-0 libatspi2.0-0 \
    libxcomposite1 libxdamage1 libxext6 libxfixes3 libxrandr2 libgbm1 \
    libxkbcommon0 libasound2 

RUN pip install uv

# Copy dependency files
COPY app/pyproject.toml app/uv.lock ./

# Install deps using uv
RUN uv sync

RUN uv run playwright install
# Copy the app source code
COPY ./app .

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--no-access-log"]