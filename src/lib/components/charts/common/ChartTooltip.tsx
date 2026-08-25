import React from 'react';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useState, useRef } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  Middleware,
} from '@floating-ui/react';
import styled from 'styled-components';
import { spacing } from '../../../spacing';
import { fontSize, fontWeight } from '../../../style/theme';
import { FormattedDateTime } from '../../date/FormattedDateTime';
import { getTooltipDateFormat } from './chartUtils';

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
  $isHovered?: boolean;
  $align?: 'left' | 'right';
}>`
  color: ${({ theme, $isHovered }) =>
    $isHovered ? theme.textPrimary : theme.textSecondary};
  font-size: ${fontSize.smaller};
  font-weight: ${({ $isHovered }) =>
    $isHovered ? fontWeight.bold : fontWeight.base};
  text-align: ${({ $align }) => $align || 'left'};
  ${({ $align }) => $align === 'right' && 'flex-shrink: 0;'}
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
      <TooltipText $isHovered={isHovered}>{label}</TooltipText>
    </TooltipLabel>
    <TooltipText $isHovered={isHovered} $align="right">
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

export type TooltipHeaderProps = {
  duration: number;
  value: string | number;
};
/**
 * Tooltip header component
 * @param duration - Duration in seconds
 * @param value - Value to format
 * @returns Formatted string type
 */
export const TooltipHeader = ({ duration, value }: TooltipHeaderProps) => {
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

/** Zero-sized rect at a point, for anchoring the tooltip to a pointer position. */
const pointRect = (x: number, y: number): DOMRect =>
  ({
    width: 0,
    height: 0,
    x,
    y,
    left: x,
    top: y,
    right: x,
    bottom: y,
  }) as DOMRect;

/** Pointer moves smaller than this don't move the tooltip. */
const POSITION_THRESHOLD = 5;

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
  const positionRef = useRef<{ x: number; y: number } | null>(null);
  const [isPositioned, setIsPositioned] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  const customPositionRef = useRef(customPosition);
  customPositionRef.current = customPosition;

  const defaultMiddleware = useMemo(
    () => [offset(customOffset || 20), flip(), shift({ padding: 10 })],
    [customOffset],
  );

  const { refs, floatingStyles, update } = useFloating({
    placement: 'top',
    middleware: middleware || defaultMiddleware,
    whileElementsMounted: autoUpdate,
  });

  // One reference for the tooltip's whole life, reading the position from a ref.
  // A new reference identity per mousemove would rebuild `autoUpdate` — and its
  // ResizeObserver — ~60 times a second, which is what triggers
  // "ResizeObserver loop completed with undelivered notifications".
  useEffect(() => {
    refs.setPositionReference({
      getBoundingClientRect: () => {
        const { x, y } = positionRef.current ?? { x: 0, y: 0 };
        return pointRect(x, y);
      },
    });
  }, [refs]);

  useEffect(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    setPortalContainer(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chartRect = chartContainerRef.current.getBoundingClientRect();

    const next = customPositionRef.current
      ? customPositionRef.current(chartRect, coordinate)
      : coordinate && {
          x: chartRect.left + coordinate.x,
          y: chartRect.top + coordinate.y,
        };
    if (!next) return;

    const previous = positionRef.current;
    if (
      previous &&
      Math.abs(previous.x - next.x) <= POSITION_THRESHOLD &&
      Math.abs(previous.y - next.y) <= POSITION_THRESHOLD
    ) {
      return;
    }

    positionRef.current = next;
    setIsPositioned(true);
    update();
  }, [coordinate, chartContainerRef, update]);

  if (!isVisible || !isPositioned || !portalContainer) return null;

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
