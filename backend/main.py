from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from pipeline import run_research_pipeline

app = FastAPI(title="AI Research Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResearchRequest(BaseModel):
    topic: str

@app.get("/")
def home():
    return {"message": "AI Research Agent API is running"}

@app.post("/generate-report")
async def generate_report(request: ResearchRequest):
    return run_research_pipeline(request.topic)