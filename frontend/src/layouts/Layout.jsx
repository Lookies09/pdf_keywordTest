import styled from "styled-components";

const HEADER_HEIGHT = 80; // 조금 더 슬림하게 조정

const AppWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center; // 가로 중앙 정렬

  @media (min-width: 768px) { max-width: 840px; }
  @media (min-width: 1024px) { max-width: 1140px; }
  @media (min-width: 1440px) { max-width: 1280px; }
`;

const MainContent = styled.main`
  padding: ${HEADER_HEIGHT}px 20px 40px;
  min-height: calc(100vh - ${HEADER_HEIGHT}px - 40px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; // 자식 요소들을 가로 중앙으로
`;

const Layout = ({ children }) => {
  return (
    <AppWrapper>
      <MainContent>{children}</MainContent>
    </AppWrapper>
  );
};

export default Layout;