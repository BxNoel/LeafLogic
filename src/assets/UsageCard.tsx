import React from "react";
import styled from "styled-components";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface UsageCardProps {
  title: string;
  value: string | number;
  unit: string;
  trend?: number; // positive = up, negative = down
  icon: React.ReactNode;
}

/* ================== styled components ================== */

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 8px 20px 8px 20px;
  margin-top:10px;
  width: 165px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  color: #6b7280;
  display: flex;
  align-items: center;
`;

const Trend = styled.div<{ up: boolean }>`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ up }) => (up ? "#dc2626" : "#16a34a")};
`;

const ValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 3px;
  margin-top: 12px;
`;

const Value = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
`;

const Unit = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const Title = styled.p`
  margin-top: 2px ;
  font-size: 14px;
  color: #6b7280;
`;

/* ================== component ================== */

export const UsageCard: React.FC<UsageCardProps> = ({
  title,
  value,
  unit,
  trend,
  icon,
}) => {
  const trendUp = trend !== undefined && trend > 0;
  const showIcon = title === "Today's Queries";

  return (
    <Card>
      <TopRow>
        
        <IconWrapper>{icon}</IconWrapper>

        {trend !== undefined && showIcon &&  (
          <Trend up={trendUp}>
            {trendUp ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span>{Math.abs(trend)}%</span>
          </Trend>
        )}
      </TopRow>

      <ValueRow>
        <Value>{value}</Value>
        <Unit>{unit}</Unit>
      </ValueRow>

      <Title>{title}</Title>
    </Card>
  );
};


