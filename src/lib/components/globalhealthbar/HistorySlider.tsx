import { useEffect, useRef, useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { FormattedDateTime, Icon, spacing } from '../../index';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';
import { useHistoryAlert } from './HistoryProvider';
import { getStep, setHistoryTooltipPosition } from './utils';

const StyledRange = styled.input`
  width: 600px;
  padding: 0; /* nécessaire pour IE */
  margin: 0;
  margin-top: 2px;
  appearance: none; /* nécessaire pour IE */
  -moz-appearance: none; /* nécessaire pour Firefox */
  -webkit-appearance: none; /* nécessaire pour Chrome */
  font: inherit; /* même rendu suivant font document */
  outline: none;
  opacity: 1;
  background: transparent; /* sert pour couleur de fond de la zone de déplacement */
  box-sizing: content-box; /* même modèle de boîte pour tous */
  transition: opacity 0.2s;
  cursor: pointer;
  position: absolute;
  z-index: 10;
  height: 16px;
  :focus-visible::-webkit-slider-thumb {
    ${FocusVisibleStyle}
  }
  /*==============================*/
  /* cursor                       */
  /*==============================*/
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    padding: 0;
    appearance: none;
    margin: 0;
    width: 2px;
    height: 16px;
    background-color: ${(props) => props.theme.selectedActive};
  }
  &::-moz-range-thumb {
    margin: 0;
    width: 2px;
    height: 16px;
    background-color: ${(props) => props.theme.selectedActive};
    border: none;
  }
`;

const HistoryContainer = styled.div`
  width: 100%;
  position: relative;
`;

const HistoryTooltipContainer = styled.div<{ inset: string }>`
  position: absolute;
  display: flex;
  inset: ${(props) => props.inset};
  align-items: center;
  flex-direction: column;
  gap: ${spacing.r2};
`;

const HistoryTooltip = styled.div`
  ${(props) => {
    const theme = useTheme();
    return css`
      padding: ${spacing.r4} ${spacing.r8};
      white-space: 'nowrap';
      border: 1px solid ${theme.border};
      border-radius: '4px';
      color: ${theme.textSecondary};
    `;
  }}
`;

export const HistoryAlertSlider = ({ start, end, startDate, endDate }) => {
  const history = useHistoryAlert();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState('auto');
  useEffect(() => {
    if (popoverRef.current) {
      setTooltipPosition(
        setHistoryTooltipPosition(
          startDate,
          endDate,
          popoverRef.current,
          history.selectedDate,
        ),
      );
    }
  }, [history.selectedDate, startDate, endDate, popoverRef.current]);

  if (!history.selectedDate) {
    return null;
  }
  return (
    <HistoryContainer id="history-slider">
      <HistoryTooltipContainer
        id="history-tooltip"
        ref={popoverRef}
        inset={tooltipPosition}
      >
        <HistoryTooltip>
          <FormattedDateTime
            value={new Date(history.selectedDate)}
            format="date-time"
          />
        </HistoryTooltip>
        <Icon name="Dropdown-down" color="selectedActive" size="2x" />
      </HistoryTooltipContainer>

      <StyledRange
        type="range"
        name="alert-history"
        id="alert-history"
        min={new Date(start).getTime()}
        max={new Date(end).getTime()}
        step={getStep(startDate, endDate)}
        value={history.selectedDate}
        onChange={(e) => {
          if (e.target.valueAsNumber > endDate)
            history.setSelectedDate(endDate);
          if (e.target.valueAsNumber < startDate)
            history.setSelectedDate(startDate);
          history.setSelectedDate(+e.target.value);
        }}
      />
    </HistoryContainer>
  );
};
