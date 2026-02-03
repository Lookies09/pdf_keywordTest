from typing import List
import fitz
from konlpy.tag import Okt
from collections import Counter

def extract_text(pdf_path: str) -> str:
    text: str = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

def analyze_keywords(text: str, top_n: int = 20, min_length: int = 2) -> List[tuple]:
    okt = Okt()
    nouns: List[str] = okt.nouns(text)

    clean_nouns = [n for n in nouns if len(n) >= min_length]

    counts = Counter(clean_nouns)
    return counts.most_common(top_n)