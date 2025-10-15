import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import { TooltipContentProps } from 'recharts';
import { FormattedDateTime } from '../../date/FormattedDateTime';
import { Stack } from '../../../spacing';
import { Text } from '../../text/Text.component';
import { Wrap } from '../../../spacing';
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

const TooltipContainer = styled.div`
  ${(props) => {
    const theme = useTheme();

    return css`
      border: 1px solid ${theme.border};
      width: 24rem;
      z-index: ${zIndex.tooltip};
      color: ${theme.textSecondary};
      background-color: ${theme.backgroundLevel1};
      border-radius: 4px;
      padding: ${spacing.r8};
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
  }}
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

  if (!tooltipData) return null;

  const { description, startsAt, endsAt, severity } = tooltipData;

  const tooltipContent = (
    <Stack direction="vertical" gap="r8">
      <Wrap>
        <Text variant="Smaller">Severity</Text>
        <Text color="textPrimary" variant="Smaller">
          {severity}
        </Text>
      </Wrap>
      <Wrap>
        <Text variant="Smaller">Start</Text>
        <Text color="textPrimary" variant="Smaller">
          <FormattedDateTime format="date-time" value={new Date(startsAt)} />
        </Text>
      </Wrap>
      <Wrap>
        <Text variant="Smaller">End</Text>
        <Text color="textPrimary" variant="Smaller">
          <FormattedDateTime format="date-time" value={new Date(endsAt)} />
        </Text>
      </Wrap>
      <Wrap>
        <Text variant="Smaller" style={{ paddingRight: spacing.r32 }}>
          Description
        </Text>
        <Text
          color="textPrimary"
          variant="Smaller"
          style={{ whiteSpace: 'wrap', textAlign: 'justify' }}
        >
          {description}
        </Text>
      </Wrap>
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
      containerComponent={TooltipContainer}
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
