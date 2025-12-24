import React from "react";
import styled , { css } from "styled-components";

import { TriangleAlert } from "lucide-react";

type AlertLevel = "warning" | "danger" | "info";

interface AlertBannerProps {
  level: AlertLevel;
  message: string;
}

const levelStyles = {
    warning: css`
      background-color: #fefce8;
      border-color: #fde68a;
      color: #92400e;
    `,
    danger: css`
      background-color: #fef2f2;
      border-color: #fecaca;
      color: #991b1b;
    `,
    info: css`
      background-color: #eff6ff;
      border-color: #bfdbfe;
      color: #1e40af;
    `,
  };
  

const Banner = styled.div<{ level: AlertLevel }>`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 8px;
  border: 1px solid;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 380px;      

  ${({ level }) => levelStyles[level]};
`;

const IconWrapper = styled.div<{ level: AlertLevel }>`
  margin-top: 0.125rem;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
  }
`;

const Message = styled.p`
  flex: 1;
  font-size: 1rem;
  line-height: 1.25rem; 
`;


export function AlertBanner({ level, message }: AlertBannerProps) {
    return (
      <Banner level={level}>
        <IconWrapper level={level}>
          <TriangleAlert />
        </IconWrapper>
        <Message>{message}</Message>
      </Banner>
    );
  }
  