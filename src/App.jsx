import styled, { createGlobalStyle } from "styled-components";
import React from "react";
import { UsageCard } from "./assets/UsageCard.tsx";
import { UsageChart } from "./assets/UsageChart";
import {EnviormentalImpact} from "./assets/EnviormentalImpact";
import { AlertBanner } from "./assets/AlertBanner.tsx";
import { Activity } from "lucide-react";

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

const UsageCardsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 50px;
    width: 100%;
    max-width: 380px;
`

function percentChange(current, previous) {
  if (previous === 0) return current === 0 ? 0 : 100;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

function App() {
  const FALLBACK = {
    Sunday_promptCount: 250,
    Monday_promptCount: 170,
    Tuesday_promptCount: 102,
    Wednesday_promptCount: 174,
    Thursday_promptCount: 36,
    Friday_promptCount: 69,
    Saturday_promptCount: 42,
  };

  const DAY_ORDER = [
    { key: 'Sunday_promptCount', label: 'SUN' },
    { key: 'Monday_promptCount', label: 'MON' },
    { key: 'Tuesday_promptCount', label: 'TUE' },
    { key: 'Wednesday_promptCount', label: 'WED' },
    { key: 'Thursday_promptCount', label: 'THU' },
    { key: 'Friday_promptCount', label: 'FRI' },
    { key: 'Saturday_promptCount', label: 'SAT' },
  ];

  const [USAGE_DATA, setUsageData] = React.useState(
    DAY_ORDER.map(d => ({ time: d.label, usage: FALLBACK[d.key] }))
  );

  React.useEffect(() => {
    const keys = DAY_ORDER.map(d => d.key);
    const getStorage = () =>
      new Promise(resolve => {
        if (window.chrome?.storage?.local) {
          chrome.storage.local.get(keys, resolve);
        } else {
          const res = {};
          keys.forEach(k => {
            const v = localStorage.getItem(k);
            if (v !== null) res[k] = v;
          });
          resolve(res);
        }
      });

    getStorage().then(res => {
      const data = DAY_ORDER.map(d => {
        const hasKey = Object.prototype.hasOwnProperty.call(res, d.key);
        const raw = hasKey ? res[d.key] : undefined;
        const num = Number(raw);
        return {
          time: d.label,
          usage: Number.isFinite(num) ? num : FALLBACK[d.key],
        };
      });
      setUsageData(data);
    });
  }, []);


  const TotalQueries = USAGE_DATA.reduce((total, entry) => total + entry.usage, 0);
  const TodayQueries = USAGE_DATA[new Date().getDay()]?.usage ?? 0;
  const YesterdayQueries = USAGE_DATA[(new Date().getDay() + 6) % 7]?.usage ?? 0;
  const dailyTrend = percentChange(TodayQueries, YesterdayQueries);

  // Caclaulte Carbon Emission from Total Queries in wh
  const TotalEnergy_kWh = Number((TotalQueries * 0.34).toFixed(2));

  
  return (
    <>
      <GlobalStyle />
      <PageWrapper>

      <AlertBanner
        level="danger"
        message="⚠️ Critical: Your Al usage today has exceeded recommended environmental limits. Consider reducing your queries."
      />

      <UsageCardsWrapper>
        <UsageCard
          title="Today's Queries"
          value={TodayQueries}
          unit="requests"
          trend={dailyTrend}
          icon={<Activity className="w-5 h-5" />}
        />
        <UsageCard
          title="Total This Week"
          value={TotalQueries}
          unit="requests"
          icon={<Activity className="w-5 h-5" />}
        />
      </UsageCardsWrapper>

        <EnviormentalImpact carbonEmissions={TotalEnergy_kWh} />

        <UsageChart data={USAGE_DATA} />


      </PageWrapper>
    </>
  );
}

export default App;
