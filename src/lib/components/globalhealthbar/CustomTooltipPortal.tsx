import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { FormattedDateTime, Stack, Text, Wrap, spacing } from '../../index';
import { Alert } from './GlobalHealthBarRecharts.component';
import { TooltipContentProps } from 'recharts';
import { zIndex } from '../../style/theme';

interface CustomTooltipPortalProps {
  tooltipData: Alert | null;
  coordinate?: { x: number; y: number };
  tooltipProps: TooltipContentProps<number, string>;
  chartContainerRef: React.RefObject<HTMLDivElement>;
}

const TooltipContainer = styled.div<{
  tooltipPosition: { top: number; left: number };
}>`
  ${(props) => {
    const theme = useTheme();

    return css`
      border: 1px solid ${theme.border};
      width: 24rem;
      z-index: ${zIndex.tooltip};
      color: ${theme.textSecondary};
      background-color: ${theme.backgroundLevel1};
      position: fixed;
      top: ${props.tooltipPosition.top}px;
      left: ${props.tooltipPosition.left}px;
      border-radius: 4px;
      padding: ${spacing.r8};
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
  }}
`;

export const CustomTooltipPortal = (props: CustomTooltipPortalProps) => {
  const { tooltipData, tooltipProps, chartContainerRef } = props;
  const { coordinate } = tooltipProps;

  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    top: -9999,
    left: -9999,
  });

  useEffect(() => {
    if (tooltipRef.current && coordinate && chartContainerRef.current) {
      const chartRect = chartContainerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const MARGIN = 10;
      const TOOLTIP_OFFSET = 20;

      // Calculate initial position (centered horizontally, offset vertically)
      let left = chartRect.left + coordinate.x - tooltipRect.width / 2;
      let top = chartRect.top + coordinate.y + TOOLTIP_OFFSET;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Horizontal boundary adjustments
      if (left < MARGIN) {
        left = MARGIN;
      } else if (left + tooltipRect.width > viewportWidth - MARGIN) {
        left = viewportWidth - tooltipRect.width - MARGIN;
      }

      // Vertical boundary adjustments - prefer showing above if not enough space below
      if (top + tooltipRect.height > viewportHeight - MARGIN) {
        const topPosition =
          chartRect.top + coordinate.y - tooltipRect.height - MARGIN;
        if (topPosition >= MARGIN) {
          top = topPosition;
        } else {
          // If can't fit above either, keep below but adjust to fit
          top = viewportHeight - tooltipRect.height - MARGIN;
        }
      }

      // Final safety check to ensure tooltip is never off-screen
      if (top < MARGIN) {
        top = MARGIN;
      }

      setTooltipPosition({ left, top });
    }
  }, [coordinate, chartContainerRef]);

  if (!tooltipData) return null;

  const { description, startsAt, endsAt, severity } = tooltipData;

  const tooltipContent = (
    <TooltipContainer ref={tooltipRef} tooltipPosition={tooltipPosition}>
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
    </TooltipContainer>
  );

  return createPortal(tooltipContent, document.body);
};
