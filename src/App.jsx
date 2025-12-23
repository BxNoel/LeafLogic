import styled, { createGlobalStyle } from "styled-components";
import { UsageChart } from "./assets/UsageChart";
import {EnviormentalImpact} from "./assets/EnviormentalImpact";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;              
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  min-width: 500px;
`;

function App() {
  const data = [
    { time: 'SUN', usage: 2 },
    { time: 'MON', usage: 5 },
    { time: 'TUE', usage: 1 },
    { time: 'WED', usage: 7 },
    { time: 'THU', usage: 3 },
    { time: 'FRI', usage: 6 },
    { time: 'SAT', usage: 4 },
  ];

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <EnviormentalImpact carbonSaved={250} />
        <UsageChart data={data} />
      </PageWrapper>
    </>
  );
}

export default App;
