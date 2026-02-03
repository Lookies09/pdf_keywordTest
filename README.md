# 📊 Trend Insight: PDF Keyword Analyzer

> **PDF 문서 내 핵심 키워드를 연도별로 추출하고 시각화하는 트렌드 분석 도구입니다.**

데이터로 가득 찬 PDF 파일들 사이에서 어떤 키워드가 시기별로 중요했는지 한눈에 파악할 수 있도록 돕습니다. 파이썬의 자연어 처리(NLP) 엔진과 리액트의 워드 클라우드 시각화를 결합한 풀스택 프로젝트입니다.

---

## ✨ 주요 기능 (Key Features)

* **PDF 텍스트 자동 추출**: `PyMuPDF`를 활용하여 폴더 내 모든 PDF의 텍스트를 정밀하게 읽어옵니다.
* **한국어 형태소 분석**: `KoNLPy(Okt)` 엔진을 통해 '명사' 위주의 핵심 키워드를 추출합니다.
* **연도별 트렌드 분류**: 파일명을 기준으로 연도를 자동 분류하여 시계열 데이터를 생성합니다.
* **동적 워드 클라우드**: 키워드 빈도수에 따라 크기와 색상이 변하는 인터랙티브 시각화를 제공합니다.
* **커스텀 필터링**: 프론트엔드에서 '최소 글자 수'를 조절하여 분석 정밀도를 실시간 변경할 수 있습니다.

---

## 🛠 기술 스택 (Tech Stack)

### 🐍 Backend
| Tech | Description |
| :--- | :--- |
| **Python 3.10+** | 메인 개발 언어 |
| **FastAPI** | 고성능 비동기 API 서버 |
| **KoNLPy (Okt)** | 한국어 형태소 분석 엔진 |
| **PyMuPDF** | PDF 텍스트 파싱 라이브러리 |

### ⚛️ Frontend
| Tech | Description |
| :--- | :--- |
| **React (Vite)** | 컴포넌트 기반 UI 라이브러리 |
| **Styled-components** | CSS-in-JS 스타일링 |
| **React-tagcloud** | 워드 클라우드 시각화 라이브러리 |

---

## 🏗 프로젝트 구조 (Project Structure)



```text
.
├── backend/
│   ├── data/raw/          # 분석할 PDF 파일 저장소
│   ├── src/core/          # NLP 및 PDF 추출 로직
│   └── main.py            # FastAPI 서버 엔트리 포인트
└── frontend/
    ├── src/               # React 컴포넌트 및 로직
    └── App.jsx            # 메인 대시보드 페이지
```

