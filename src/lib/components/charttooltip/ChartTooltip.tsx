import React from 'react';
import { createPortal } from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  Middleware,
} from '@floating-ui/react';
import styled from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize, fontWeight } from '../../style/theme';
import { FormattedDateTime } from '../date/FormattedDateTime';

export const ChartTooltipContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.backgroundLevel1};
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 4px;
  font-size: ${fontSize.small};
  padding: ${spacing.r8};
  min-width: 10rem;
  max-width: 40rem;

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

export const ChartTooltipSeparator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.border};
  margin: ${spacing.r4} 0;
  width: 100%;
`;

export type TooltipDateFormat =
  | 'day-month-abbreviated-year-hour-minute'
  | 'day-month-abbreviated-hour-minute-second'
  | 'day-month-abbreviated-hour-minute';

const getTooltipDateFormat: (duration: number) => TooltipDateFormat = (
  duration: number,
) => {
  if (duration <= 60 * 60) {
    return 'day-month-abbreviated-hour-minute-second';
  } else if (duration <= 7 * 24 * 60 * 60) {
    return 'day-month-abbreviated-hour-minute';
  } else {
    return 'day-month-abbreviated-year-hour-minute';
  }
};

export const TooltipHeader = ({
  duration,
  value,
}: {
  duration: number;
  value: string | number;
}) => {
  const timeFormat = getTooltipDateFormat(duration);
  return (
    <ChartTooltipHeader>
      <FormattedDateTime format={timeFormat} value={new Date(value)} />
    </ChartTooltipHeader>
  );
};

export interface ChartTooltipPortalProps {
  children: React.ReactNode;
  coordinate?: { x: number; y: number };
  chartContainerRef: React.RefObject<HTMLDivElement>;
  isVisible?: boolean;
  middleware?: Middleware[];
  offset?: number | (({ placement }: { placement: string }) => number);
  customPosition?: (
    chartRect: DOMRect,
    coordinate?: { x: number; y: number },
  ) => { x: number; y: number };
  containerComponent?: React.ComponentType<any>;
}

export const ChartTooltipPortal: React.FC<ChartTooltipPortalProps> = ({
  children,
  coordinate,
  chartContainerRef,
  isVisible = true,
  middleware,
  offset: customOffset,
  customPosition,
  containerComponent: ContainerComponent = ChartTooltipContainer,
}) => {
  const [virtualElement, setVirtualElement] = useState<any>(null);
  const previousPositionRef = useRef<{ x: number; y: number } | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  // Default middleware configuration
  const defaultMiddleware = [
    offset(customOffset || 20),
    flip(),
    shift({ padding: 10 }),
  ];

  const { refs, floatingStyles } = useFloating({
    elements: {
      reference: virtualElement,
    },
    placement: 'top',
    middleware: middleware || defaultMiddleware,
    whileElementsMounted: autoUpdate,
  });

  // Create portal container once
  useEffect(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    setPortalContainer(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  // Create virtual element from coordinate or custom position
  useEffect(() => {
    if (chartContainerRef.current) {
      const chartRect = chartContainerRef.current.getBoundingClientRect();

      let tooltipX: number;
      let tooltipY: number;

      if (customPosition) {
        // Use custom positioning function
        const position = customPosition(chartRect, coordinate);
        tooltipX = position.x;
        tooltipY = position.y;
      } else if (coordinate) {
        // Use default coordinate-based positioning
        tooltipX = chartRect.left + coordinate.x;
        tooltipY = chartRect.top + coordinate.y;
      } else {
        return; // No positioning method available
      }

      // Check if position has changed significantly
      const hasPositionChanged =
        !previousPositionRef.current ||
        Math.abs(previousPositionRef.current.x - tooltipX) > 5 ||
        Math.abs(previousPositionRef.current.y - tooltipY) > 5;

      if (hasPositionChanged) {
        previousPositionRef.current = { x: tooltipX, y: tooltipY };
      }

      setVirtualElement({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: tooltipX,
            y: tooltipY,
            left: tooltipX,
            top: tooltipY,
            right: tooltipX,
            bottom: tooltipY,
          };
        },
      });
    }
  }, [coordinate, chartContainerRef, customPosition]);

  if (!isVisible || !virtualElement || !portalContainer) return null;

  const tooltipContent = (
    <ContainerComponent
      ref={refs.setFloating}
      style={{
        ...floatingStyles,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </ContainerComponent>
  );

  return createPortal(tooltipContent, portalContainer);
};
