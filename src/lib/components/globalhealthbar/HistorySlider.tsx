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
  :focus-visible::-webkit-slider-thumb {
    ${FocusVisibleStyle}
  }
  :focus-visible::-moz-range-thumb {
    ${FocusVisibleStyle}
  }
`;

const HistoryContainer = styled.div`
  width: 100%;
  position: relative;
`;

const HistoryTooltipContainer = styled.div<{ inset }>`
  position: absolute;
  display: ${(props) => (props.inset ? 'flex' : 'none')};
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
      border-radius: 4px;
      width: 116px;
      color: ${theme.textSecondary};
    `;
  }}
`;
type HistorySliderProps = {
  start: string;
  end: string;
  startDate: number;
  endDate: number;
};

export const HistoryAlertSlider = ({
  start,
  end,
  startDate,
  endDate,
}: HistorySliderProps) => {
  const history = useHistoryAlert();

  if (history.selectedDate === null) {
    return null;
  }
  // check in 1hour range : bug with input date going from 1:00 to 0:00
  if (history.selectedDate > endDate) {
    history.setSelectedDate(endDate);
  }
  if (history.selectedDate < startDate) {
    history.setSelectedDate(startDate);
  }

  return (
    <HistoryContainer id="history-slider">
      <HistoryTooltipContainer
        id="history-tooltip"
        inset={setHistoryTooltipPosition(
          startDate,
          endDate,
          history.selectedDate,
        )}
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
          history.setSelectedDate(+e.target.value);
        }}
      />
    </HistoryContainer>
  );
};
