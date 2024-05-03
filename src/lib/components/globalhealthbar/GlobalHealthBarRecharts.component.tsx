import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts';
import styled, { useTheme } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Wrap, spacing } from '../../spacing';

import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';
import {
  DATE_FORMATER,
  FormattedDateTime,
  TIME_FORMATER,
} from '../date/FormattedDateTime';
import { useHistoryAlert } from './HistoryProvider';

export const TOP = 'top';
export const BOTTOM = 'bottom';
export type GlobalHealthProps = {
  id: string;
  alerts: {
    description: string;
    startsAt: string;
    endsAt: string;
    severity: string;
  }[];
  start: string;
  end: string;
};

export const StyledRange = styled.input`
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
    margin-top: -7px;
    width: 2px;
    height: 16px;
    background-color: green;
  }
  &::-moz-range-thumb {
    margin: 0;
    width: 2px;
    height: 16px;
    background-color: green;
    border: none;
  }
`;

export const StyledDataList = styled.datalist`
  display: none;
`;

export function GlobalHealthBar({ id, alerts, start, end }: GlobalHealthProps) {
  const history = useHistoryAlert();
  const [widthValue, setWidthValue] = useState(0);
  const [popoverWidth, setPopoverWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  //initialize selectedDate
  useEffect(() => {
    if (history.selectedDate !== null) history.setSelectedDate(0);
  }, []);
  useEffect(() => {
    if (popoverRef.current) setPopoverWidth(popoverRef.current.offsetWidth);
    if (history.selectedDate)
      setWidthValue(
        ((history.selectedDate - new Date(start).getTime()) * 100) /
          (new Date(end).getTime() - new Date(start).getTime()),
      );
  }, [history.selectedDate, popoverRef.current]);

  useEffect(() => {
    setIsVisible(true);
  }, [history.selectedDate]);
  const data = [
    {
      start: new Date(start).getTime(),
      end: new Date(end).getTime(),
      range: [new Date(start).getTime(), new Date(end).getTime()],
      ...alerts.reduce((acc, alert, index) => {
        const key = `${alert.severity}${index}`;
        acc['range' + key] = [
          new Date(alert.startsAt).getTime(),
          new Date(alert.endsAt).getTime(),
        ];
        acc[`${key}Severity`] = alert.severity;
        acc[`${key}Description`] = alert.description;
        return acc;
      }, {}),

      id,
    },
  ];
  const warningKeys = Object.keys(data[0]).filter((key) =>
    key.startsWith('rangewarning'),
  );
  const criticalKeys = Object.keys(data[0]).filter((key) =>
    key.startsWith('rangecritical'),
  );

  const toggleVisibility = (e) => {
    console.log('e', e);
    if (!isFocused) {
      if (e.type === 'mouseleave') setIsVisible(false);
    }
    if (e.type === 'mouseenter') setIsVisible(true);
    if (e.type === 'blur') {
      setIsVisible(false);
      setIsFocused(false);
    }
    if (e.type === 'focus') {
      setIsVisible(true);
      setIsFocused(true);
    }
  };
  const CustomTooltip = (props) => {
    const { coordinate } = props;
    if (tooltip) {
      const { tooltipPayload } = tooltip;
      // @ts-expect-error
      const name = tooltipPayload[0].name.replace('range', '');
      return (
        <div
          style={{
            border: `1px solid ${theme.border}`,
            width: '25rem',
            color: theme.textSecondary,
            backgroundColor: theme.backgroundLevel1,
            // position: 'absolute',
            // left: coordinate.x - 80,
            // top: coordinate.y + 20,
            padding: spacing.r8,
          }}
        >
          <span style={{ width: '100%', textAlign: 'center' }}>
            View details on Alert Page
          </span>
          <Wrap style={{ flexDirection: 'column', gap: spacing.r8 }}>
            <Wrap>
              <span>Severity:</span>
              <span>
                {/* @ts-expect-error */}
                {tooltip.tooltipPayload[0].payload[`${name}Severity`]}
              </span>
            </Wrap>
            <Wrap>
              <span>Start:</span>
              <FormattedDateTime
                format="date-time-second"
                value={
                  // @ts-expect-error
                  tooltip.tooltipPayload[0].payload[`range${name}`][0]
                }
              />
            </Wrap>
            <Wrap>
              <span>End:</span>
              <FormattedDateTime
                format="date-time-second"
                value={
                  // @ts-expect-error
                  tooltip.tooltipPayload[0].payload[`range${name}`][1]
                }
              />
            </Wrap>
            <Wrap>
              <span>Description:</span>
              <span>
                {/* @ts-expect-error */}
                {tooltip.tooltipPayload[0].payload[`${name}Description`]}
              </span>
            </Wrap>
          </Wrap>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ padding: 50, position: 'relative' }}>
      {history.selectedDate !== null && (
        <div
          id="div"
          style={{
            width: '600px',
            position: 'relative',
          }}
        >
          <div
            id="tooltip"
            ref={popoverRef}
            style={{
              position: 'absolute',
              display: isVisible ? 'block' : 'none',
              left: 'calc(' + widthValue + '% - ' + popoverWidth / 2 + 'px)',
              padding: `${spacing.r4} ${spacing.r8}`,
              bottom: '0.5rem',
              whiteSpace: 'nowrap',
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              color: theme.textSecondary,
            }}
          >
            <FormattedDateTime
              value={new Date(history.selectedDate || 0)}
              format="date-time"
            />
          </div>
          <StyledRange
            type="range"
            name="alert-history"
            id="alert-history"
            min={new Date(start).getTime()}
            max={new Date(end).getTime()}
            onMouseEnter={toggleVisibility}
            onMouseLeave={toggleVisibility}
            onMouseOver={toggleVisibility}
            onFocus={toggleVisibility}
            onBlur={toggleVisibility}
            step={60 * 1000 * 10}
            value={history.selectedDate}
            list="list"
            onChange={(e) => {
              history.setSelectedDate(+e.target.value);
            }}
          />
          <StyledDataList id="list">
            <option value={start} label={start}></option>
            <option
              value={(new Date(start).getTime() + new Date(end).getTime()) / 2}
              label={'middle'}
            ></option>
            <option value={end} label={end}></option>
          </StyledDataList>
        </div>
      )}
      <div>
        <BarChart
          width={600}
          height={50}
          data={data}
          layout="vertical"
          margin={{ left: 0, right: 0 }}
        >
          <XAxis
            dataKey="start"
            type="number"
            domain={[new Date(start).getTime(), new Date(end).getTime()]}
            tick={(props) => {
              const { x, y, payload, index } = props;
              return (
                <g transform={`translate(${x},${y})`} overflow={'visible'}>
                  <text
                    x={0}
                    y={0}
                    dy={12}
                    textAnchor={'middle'}
                    fill={theme.textSecondary}
                    fontSize={11}
                  >
                    {DATE_FORMATER.format(new Date(payload.value)) +
                      ' ' +
                      TIME_FORMATER.format(new Date(payload.value))}
                  </text>
                </g>
              );
            }}
            interval={'preserveStartEnd'}
            tickLine={{ stroke: theme.textSecondary }}
            axisLine={false}
            tickSize={8}
          />
          {!history.selectedDate && (
            <Tooltip
              allowEscapeViewBox={{ x: true, y: true }}
              offset={20}
              content={<CustomTooltip tooltipPayload={tooltip}></CustomTooltip>}
            />
          )}

          <YAxis yAxisId={'background'} type="category" hide />
          {[...criticalKeys, ...warningKeys].map((key) => (
            <YAxis key={`yAxis${key}`} yAxisId={key} type="category" hide />
          ))}
          <Bar
            dataKey="range"
            fill="transparent"
            yAxisId="background"
            isAnimationActive={false}
            shape={(props) => {
              const { x, y, width, height } = props;
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={theme.statusHealthy}
                  ry="15%"
                />
              );
            }}
          />

          {warningKeys.map((key) => (
            <Bar
              dataKey={key}
              yAxisId={key}
              key={key}
              isAnimationActive={false}
              onMouseEnter={(e) => setTooltip(e)}
              onMouseLeave={() => setTooltip(null)}
              fill={theme.statusWarning}
            ></Bar>
          ))}
          {criticalKeys.map((key) => (
            <Bar
              dataKey={key}
              yAxisId={key}
              key={key}
              isAnimationActive={false}
              fill={theme.statusCritical}
              onMouseEnter={(e) => setTooltip(e)}
              onMouseLeave={() => setTooltip(null)}
            />
          ))}
        </BarChart>
      </div>
    </div>
  );
}
