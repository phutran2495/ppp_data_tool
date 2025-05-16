from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router
import os 

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Welcome to the PPP Data Tool API!"}


@app.on_event("startup")
def startup_event():
    host = os.getenv("HOST", "localhost")
    port = os.getenv("PORT", "8000")
    print(f"🚀 FastAPI is running at http://{host}:{port}")