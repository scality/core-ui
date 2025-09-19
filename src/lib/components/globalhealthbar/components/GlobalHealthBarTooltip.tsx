import React from 'react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from '@floating-ui/react';
import { FormattedDateTime, Stack, Text, Wrap, spacing } from '../../../index';
import { Alert } from '../GlobalHealthBarRecharts.component';
import { TooltipContentProps } from 'recharts';
import { zIndex } from '../../../style/theme';

interface GlobalHealthBarTooltipProps {
  tooltipData: Alert | null;
  coordinate?: { x: number; y: number };
  tooltipProps: TooltipContentProps<number, string>;
  chartContainerRef: React.RefObject<HTMLDivElement>;
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
  const { tooltipData, tooltipProps, chartContainerRef } = props;
  const { coordinate } = tooltipProps;

  const [virtualElement, setVirtualElement] = useState<any>(null);

  const { refs, floatingStyles } = useFloating({
    elements: {
      reference: virtualElement,
    },
    placement: 'bottom',
    middleware: [offset(20), flip(), shift({ padding: 10 })],
    whileElementsMounted: autoUpdate,
  });

  // Create virtual element from coordinate
  useEffect(() => {
    if (coordinate && chartContainerRef.current) {
      const chartRect = chartContainerRef.current.getBoundingClientRect();

      setVirtualElement({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: chartRect.left + coordinate.x,
            y: chartRect.top + coordinate.y,
            left: chartRect.left + coordinate.x,
            top: chartRect.top + coordinate.y,
            right: chartRect.left + coordinate.x,
            bottom: chartRect.top + coordinate.y,
          };
        },
      });
    }
  }, [coordinate, chartContainerRef]);

  if (!tooltipData) return null;

  const { description, startsAt, endsAt, severity } = tooltipData;

  const tooltipContent = (
    <TooltipContainer ref={refs.setFloating} style={floatingStyles}>
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
