from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from src.core.pdf_engine import extract_text, analyze_keywords

app = FastAPI()

# 현재는 모든 출처 허용 cors 설정 (개발, 테스트 용도
# TODO: 실제 배포시에는 프론트 주소만 허용하도록 변경
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/analyze_trend")
async def get_trend(min_len: int = 1):
    raw_path = "data/raw"
    files = sorted([f for f in os.listdir(raw_path) if f.endswith('.pdf')])

    result = {}

    for file in files:
        year = file.split('.')[0]
        file_full_path = os.path.join(raw_path, file)
        text = extract_text(file_full_path)

        keywords = analyze_keywords(text, top_n=50, min_length=min_len)
        result[year] = {word: count for word, count in keywords}

    return result