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

const Fill = styled(Progress.Indicator)`
  height: 100%;
  background-color: #10B981;
  transition: width 0.6s ease;
`;
export function EnviormentalImpact({ carbonSaved }) {
  const progress = Math.min(carbonSaved / 1000, 1); 

  return (
    <Card>
      <Heading>Environmental Impact</Heading>
      <Row>
        <Leaf color="#10B981" size={20} />
        <span style={{ fontSize: '14px', color: '#374151' }}>{carbonSaved}g CO₂ Emissions</span>
      </Row>
      <Bar value={progress * 100}>
        <Fill style={{ width: `${progress * 100}%` }} />
      </Bar>

      <Row>
        <Zap color="#10B981" size={20} />
        <span style={{ fontSize: '14px', color: '#374151' }}>{carbonSaved} Energy Usage</span>
      </Row>
      <Bar value={progress * 100}>
        <Fill style={{ width: `${progress * 100}%` }} />
      </Bar>
    </Card>
  );
}