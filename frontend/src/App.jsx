import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TagCloud } from 'react-tagcloud';
import Layout from "./layouts/Layout";
import styled, { keyframes } from 'styled-components';

// --- Animations ---
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// --- Styled Components ---
const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const MainTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: -1px;
  background: linear-gradient(to right, #00d2ff, #3a7bd5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
`;

const Description = styled.p`
  color: #94a3b8;
  font-size: 1.1rem;
`;

const FilterWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  background: rgba(15, 23, 42, 0.4);
  padding: 10px 24px;
  border-radius: 100px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  margin-top: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    border-color: #3b82f6;
    background: rgba(15, 23, 42, 0.6);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
  }
  
  label { 
    color: #94a3b8; 
    font-size: 0.95rem; 
    font-weight: 600; 
    letter-spacing: 0.5px;
  }
`;

const StyledSelect = styled.select`
  appearance: none; 
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%233b82f6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E") no-repeat right 0px center;
  background-size: 14px;
  
  border: none;
  color: #3b82f6;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  padding-right: 24px; 
  transition: color 0.2s ease;

  &:hover {
    color: #00d2ff;
  }

  option {
    background: #1e293b;
    color: #ffffff;
    padding: 10px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  padding: 8px;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 20px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const StyledButton = styled.button`
  padding: 12px 28px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.$active ? '#3b82f6' : 'transparent'};
  color: ${props => props.$active ? '#ffffff' : '#94a3b8'};
  font-weight: ${props => props.$active ? '700' : '500'};
  white-space: nowrap;

  &:hover {
    background: ${props => props.$active ? '#2563eb' : 'rgba(51, 65, 85, 0.8)'};
    color: #ffffff;
  }
`;

const Card = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  padding: 60px 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 1000px;
  min-height: 400px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;

  .tag-cloud-item {
    display: inline-block;
    padding: 10px;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
    animation: ${float} 4s ease-in-out infinite;
    cursor: pointer;
    transition: all 0.3s !important;

    &:hover {
      transform: scale(1.3) rotate(0deg) !important;
      z-index: 100;
      filter: drop-shadow(0 0 20px rgba(0, 210, 255, 0.5));
      animation-play-state: paused;
    }
  }

  .loading-container {
    text-align: center;
    .spinner {
      font-size: 3rem;
      display: inline-block;
      animation: ${rotate} 2s linear infinite;
      margin-bottom: 16px;
    }
    p { color: #94a3b8; font-size: 1.1rem; }
  }
`;

// --- App Component ---
function App() {
  const [trendData, setTrendData] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [minLength, setMinLength] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async (len) => {
    setIsLoading(true);
    setTrendData(null); 
    
    try {
      const response = await fetch(`http://localhost:8000/api/analyze_trend?min_len=${len}`);
      const data = await response.json();
      
      if (data && Object.keys(data).length > 0) {
        setTrendData(data);
        const years = Object.keys(data);
        setSelectedYear(prev => years.includes(prev) ? prev : years[0]);
      }
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(minLength);
  }, [minLength, loadData]);

  const customRenderer = (tag, size) => {
    const colorValue = 
      tag.count > 40 ? '#00d2ff' : 
      tag.count > 20 ? '#3b82f6' : 
      tag.count > 10 ? '#60a5fa' : 
      '#94a3b8';

    const rotation = (tag.value.length % 2 === 0 ? 6 : -6);

    return (
      <span
        key={tag.value}
        style={{
          fontSize: `${size}px`,
          color: colorValue,
          margin: '12px',
          fontWeight: tag.count > 15 ? '800' : '500',
          display: 'inline-block',
          transform: `rotate(${rotation}deg)`,
        }}
        className="tag-cloud-item"
      >
        {tag.value}
      </span>
    );
  };

  const cloudData = useMemo(() => {
    if (!trendData || !selectedYear || !trendData[selectedYear]) return [];
    return Object.entries(trendData[selectedYear]).map(([text, weight]) => ({
      value: text,
      count: Number(weight),
    }));
  }, [trendData, selectedYear]);

  return (
    <Layout>
      <HeaderSection>
        <MainTitle>Trend Insight</MainTitle>
        <Description>PDF 데이터에서 추출한 연도별 핵심 키워드 대시보드</Description>
        
        <FilterWrapper>
          <label>Keyword Filter</label>
          <StyledSelect 
            value={minLength} 
            onChange={(e) => setMinLength(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}글자 이상</option>
            ))}
          </StyledSelect>
        </FilterWrapper>
      </HeaderSection>

      <NavContainer>
        {!isLoading && trendData && Object.keys(trendData).map(year => (
          <StyledButton 
            key={year} 
            $active={selectedYear === year}
            onClick={() => setSelectedYear(year)}
          >
            {year}년
          </StyledButton>
        ))}
      </NavContainer>

      <Card>
        {isLoading || !trendData ? (
          <div className="loading-container">
            <div className="spinner">⌛</div>
            <p>AI가 트렌드를 분석하고 있습니다...</p>
          </div>
        ) : cloudData.length > 0 ? (
          <TagCloud
            minSize={20}
            maxSize={65}
            tags={cloudData}
            renderer={customRenderer}
            onClick={(tag) => {
              alert(`📌 [${selectedYear}년 트렌드 리포트]\n\n키워드: "${tag.value}"\n분석 결과 총 ${tag.count}회 등장했습니다.`);
            }}
          />
        ) : (
          <div style={{ color: '#94a3b8' }}>표시할 키워드 데이터가 없습니다.</div>
        )}
      </Card>
    </Layout>
  );
}

export default App;