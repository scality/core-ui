import { TooltipContentProps } from 'recharts';
import styled, { css, useTheme } from 'styled-components';
import { FormattedDateTime, Stack, Text, Wrap, spacing } from '../../index';
import { Alert } from './GlobalHealthBarRecharts.component';
import { useEffect, useRef, useState } from 'react';

interface CustomTooltipProps {
  tooltipData: Alert | null;
  tooltipProps: TooltipContentProps<number, string>;
}

const TooltipContainer = styled.div<{
  tooltipInset: { left: number; top: number };
}>`
  ${(props) => {
    const theme = useTheme();

    return css`
      border: 1px solid ${theme.border};
      width: 20rem;
      color: ${theme.textSecondary};
      background-color: ${theme.backgroundLevel1};
      border-radius: 4px;
      padding: ${spacing.r8};
      position: fixed;
      top: ${props.tooltipInset.top}px;
      left: ${props.tooltipInset.left}px;
    `;
  }}
`;

export const CustomTooltip = (props: CustomTooltipProps) => {
  const { tooltipData, tooltipProps } = props;
  const { coordinate } = tooltipProps;
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipInset, setTooltipInset] = useState({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    if (tooltipRef.current && coordinate) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const MARGIN = 10;
      const TOOLTIP_OFFSET = 30;

      // Calculate initial position (centered horizontally, offset vertically)
      let left = coordinate.x - tooltipRect.width / 2;
      let top = coordinate.y + TOOLTIP_OFFSET;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Horizontal boundary adjustments
      if (left < MARGIN) {
        left = MARGIN;
      } else if (left + tooltipRect.width > viewportWidth - MARGIN) {
        left = viewportWidth - tooltipRect.width - MARGIN;
      }

      // Vertical boundary adjustments - prefer showing below if enough space
      if (top + tooltipRect.height > viewportHeight - MARGIN) {
        const topPosition = coordinate.y - tooltipRect.height - MARGIN;
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

      setTooltipInset({ left, top });
    }
  }, [coordinate, tooltipRef]);
  if (tooltipData) {
    const { description, startsAt, endsAt, severity } = tooltipData;
    return (
      <TooltipContainer ref={tooltipRef} tooltipInset={tooltipInset}>
        <Stack direction="vertical" gap="r8">
          <Wrap>
            <Text variant="Small">Severity</Text>
            <Text color="textPrimary" variant="Small">
              {severity}
            </Text>
          </Wrap>
          <Wrap>
            <Text variant="Small">Start</Text>
            <Text color="textPrimary" variant="Small">
              <FormattedDateTime
                format="date-time"
                value={new Date(startsAt)}
              />
            </Text>
          </Wrap>
          <Wrap>
            <Text variant="Small">End</Text>
            <Text color="textPrimary" variant="Small">
              <FormattedDateTime format="date-time" value={new Date(endsAt)} />
            </Text>
          </Wrap>
          <Wrap>
            <Text variant="Small">Description</Text>
            <Text color="textPrimary" variant="Small">
              {description}
            </Text>
          </Wrap>
        </Stack>
      </TooltipContainer>
    );
  }

  return null;
};
