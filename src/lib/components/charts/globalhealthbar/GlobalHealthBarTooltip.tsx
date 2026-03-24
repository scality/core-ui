import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import { TooltipContentProps } from 'recharts';
import { FormattedDateTime } from '../../date/FormattedDateTime';
import { Stack } from '../../../spacing';
import { Text } from '../../text/Text.component';
import { spacing } from '../../../spacing';
import { Alert } from './GlobalHealthBar.hooks';
import { zIndex } from '../../../style/theme';
import { CHART_CONFIG, getTooltipPosition } from './GlobalHealthBar.utils';
import { ChartTooltipPortal } from '../common/ChartTooltip';

interface GlobalHealthBarTooltipProps {
  tooltipData: Alert | null;
  coordinate?: { x: number; y: number };
  tooltipProps: TooltipContentProps<number, string>;
  chartContainerRef: React.RefObject<HTMLDivElement>;
  isKeyboardActive?: boolean;
  startTimestamp?: number;
  endTimestamp?: number;
}

const TooltipContainer = styled.div<{ $severityColor: string }>`
  ${(props) => {
    const theme = useTheme();

    return css`
      border: 1px solid ${theme.border};
      border-left: 3px solid ${props.$severityColor};
      width: 22rem;
      z-index: ${zIndex.tooltip};
      color: ${theme.textSecondary};
      background-color: ${theme.backgroundLevel2};
      border-radius: 4px;
      padding: ${spacing.r12};
      pointer-events: none;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    `;
  }}
`;

const SeverityDot = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.r8};
`;

export const GlobalHealthBarTooltip = (props: GlobalHealthBarTooltipProps) => {
  const {
    tooltipData,
    tooltipProps,
    chartContainerRef,
    isKeyboardActive = false,
    startTimestamp = 0,
    endTimestamp = 0,
  } = props;
  const { coordinate } = tooltipProps;
  const theme = useTheme();

  if (!tooltipData) return null;

  const { description, startsAt, endsAt, severity } = tooltipData;

  const severityColor =
    severity === 'critical'
      ? theme.statusCritical
      : severity === 'warning'
        ? theme.statusWarning
        : theme.textSecondary;

  const tooltipContent = (
    <Stack direction="vertical" gap="r12">
      <Stack gap="r8" style={{ alignItems: 'center' }}>
        <SeverityDot $color={severityColor} />
        <Text color="textPrimary" variant="Smaller" isEmphazed style={{ textTransform: 'capitalize' }}>
          {severity}
        </Text>
      </Stack>
      <Text color="textPrimary" variant="Basic">
        {description}
      </Text>
      <Stack direction="vertical" gap="r4">
        <DateRow>
          <Text variant="Smaller" style={{ width: '2.5rem', flexShrink: 0 }}>From</Text>
          <Text color="textPrimary" variant="Smaller">
            <FormattedDateTime format="date-time" value={new Date(startsAt)} />
          </Text>
        </DateRow>
        <DateRow>
          <Text variant="Smaller" style={{ width: '2.5rem', flexShrink: 0 }}>To</Text>
          <Text color="textPrimary" variant="Smaller">
            <FormattedDateTime format="date-time" value={new Date(endsAt)} />
          </Text>
        </DateRow>
      </Stack>
    </Stack>
  );

  return (
    <ChartTooltipPortal
      coordinate={coordinate}
      chartContainerRef={chartContainerRef}
      isVisible={!!tooltipData}
      customPosition={(chartRect, coordinate) => {
        if (isKeyboardActive && tooltipData && startTimestamp && endTimestamp) {
          // Calculate the chart's usable width (excluding margins)
          const chartUsableWidth =
            chartRect.width -
            CHART_CONFIG.MARGINS.left -
            CHART_CONFIG.MARGINS.right;

          // Use the same positioning logic as alert bars
          const alertCenterX = getTooltipPosition(
            tooltipData,
            startTimestamp,
            endTimestamp,
            chartUsableWidth,
          );

          return {
            x: chartRect.left + alertCenterX,
            y: chartRect.top + CHART_CONFIG.BAR_SIZE,
          };
        } else {
          // For mouse navigation, use the provided coordinate
          return {
            x: chartRect.left + (coordinate?.x || 0),
            y: chartRect.top + (coordinate?.y || 0),
          };
        }
      }}
      containerComponent={(p) => <TooltipContainer $severityColor={severityColor} {...p} />}
      offset={({ placement }) => {
        // Use larger offset when tooltip is on top
        // to avoid tooltip over bar
        return placement.includes('top') ? 20 : 30;
      }}
    >
      {tooltipContent}
    </ChartTooltipPortal>
  );
};
