import React from 'react';
import styled from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize, fontWeight } from '../../style/theme';

export const ChartTooltipContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.backgroundLevel1};
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 4px;
  font-size: ${fontSize.small};
  padding: ${spacing.r8};
  min-width: 10rem;
  max-width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TooltipText = styled.div<{
  isHovered?: boolean;
  align?: 'left' | 'right';
}>`
  color: ${({ theme, isHovered }) =>
    isHovered ? theme.textPrimary : theme.textSecondary};
  font-size: ${fontSize.smaller};
  font-weight: ${({ isHovered }) =>
    isHovered ? fontWeight.bold : fontWeight.base};
  text-align: ${({ align }) => align || 'left'};
  ${({ align }) => align === 'right' && 'flex-shrink: 0;'}
`;

const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing.r32};
  width: 100%;
`;

const TooltipLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
  flex: 1;
  min-width: 0;
`;

interface ChartTooltipItemProps {
  label: React.ReactNode;
  value: React.ReactNode;
  isHovered?: boolean;
  legendIcon?: React.ReactNode;
}

export const ChartTooltipItem: React.FC<ChartTooltipItemProps> = ({
  label,
  value,
  isHovered = false,
  legendIcon,
}) => (
  <TooltipRow>
    <TooltipLabel>
      {legendIcon}
      <TooltipText isHovered={isHovered}>{label}</TooltipText>
    </TooltipLabel>
    <TooltipText isHovered={isHovered} align="right">
      {value}
    </TooltipText>
  </TooltipRow>
);

export const ChartTooltipHeader = styled.div`
  color: ${({ theme }) => theme.textPrimary};
  font-weight: ${fontWeight.bold};
  text-align: center;
  margin-bottom: ${spacing.r8};
`;

export const ChartTooltipItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.r8};
  width: 100%;
`;
