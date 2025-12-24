import { Leaf, Zap } from 'lucide-react';
import * as Progress from "@radix-ui/react-progress";
import styled from "styled-components";

const Card = styled.div`
  width: 380px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0rem 1rem 2rem;
`;

const Heading = styled.h3`
  color: #111827;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const Bar = styled(Progress.Root)`
  width: 100%;
  height: 12px;
  background-color: #e5e7eb;
  border-radius: 5px;
  overflow: hidden;
`;

const Unit = styled.span`
  margin-left: 4px;
  font-size: 12px;
  color: #6b7280;
  letter-spacing: 0.02em;
`;

// Remove TS generic here
const Fill = styled(Progress.Indicator)`
  height: 100%;
  background-color: ${({ $color }) => $color};
  transition: width 0.6s ease, background-color 0.2s ease;
`;

export function EnviormentalImpact({ carbonEmissions }) {

  const ENERGY_progress = Math.min(carbonEmissions / 340, 1);
  const ENERGY_percent = ENERGY_progress * 100;

  const CARBON_EMISSION = Number((carbonEmissions / 1000) * (430)).toFixed(2); // grams of CO2
  const CO2_progress = Number ( (Math.min(carbonEmissions / 500, 1)).toFixed(2));
  const CARBON_percent = CO2_progress * 100;

  const ENERGY_fillColor =
  ENERGY_percent > 90 ? '#ef4444' :
  ENERGY_percent >= 80 ? '#f59e0b' :
    '#10B981';

  const CARBON_fillColor =
    CARBON_percent > 90 ? '#ef4444' :
    CARBON_percent >= 80 ? '#f59e0b' :
      '#10B981';

  return (
    <Card>
      <Heading>Environmental Impact</Heading>
      <Row>
        <Leaf color="#10B981" size={20} />
        <span style={{ fontSize: '14px', color: '#374151' }}>{CARBON_EMISSION}g CO₂ Emissions</span>
      </Row>
      <Bar value={CARBON_percent}>
        <Fill style={{ width: `${CARBON_percent}%` }} $color={CARBON_fillColor} />
      </Bar>

      <Row>
        <Zap color="#10B981" size={20} />
        <span style={{ fontSize: '14px', color: '#374151' }}>
          Energy Usage: {carbonEmissions}
          <Unit aria-label="watt-hours">Wh</Unit>
        </span>
      </Row>


      <Bar value={ENERGY_percent}>
        <Fill style={{ width: `${ENERGY_percent}%` }} $color={ENERGY_fillColor} />
      </Bar>
    </Card>
  );
}