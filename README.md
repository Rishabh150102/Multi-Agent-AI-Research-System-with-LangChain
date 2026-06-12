# Multi-Agent AI Research System with LangChain

A research assistant built using LangChain agents, Tavily Search, BeautifulSoup scraping, and OpenAI models.

## Features

- Search Agent for information gathering
- Reader Agent for webpage scraping
- Writer Agent for report generation
- Critic Agent for report evaluation

## Tech Stack

- FastAPI
- LangChain
- OpenAI
- Tavily
- BeautifulSoup
- Python

## API Endpoint

POST /generate-report

Request:

{
  "topic": "Artificial Intelligence"
}

## Run Locally

pip install -r requirements.txt

uvicorn main:app --reload

## Environment Variables

OPENAI_API_KEY=
TAVILY_API_KEY=