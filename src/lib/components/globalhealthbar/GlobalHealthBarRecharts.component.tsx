import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle,
  Customized,
  CartesianGrid,
} from 'recharts';
import styled, { useTheme } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Wrap, spacing } from '../../spacing';

import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';
import {
  DATE_FORMATER,
  FormattedDateTime,
  TIME_FORMATER,
  TIME_SECOND_FORMATER,
} from '../date/FormattedDateTime';
import { useHistoryAlert } from './HistoryProvider';
import { Box } from '../box/Box';
import { Text } from '../text/Text.component';
import { Icon } from '../icon/Icon.component';
import { get } from 'styled-system';
import { RectRadius } from 'recharts/types/shape/Rectangle';

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
  margin-top: -1px;
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
    width: 3px;
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

export const StyledDataList = styled.datalist`
  display: none;
`;

export function GlobalHealthBar({ id, alerts, start, end }: GlobalHealthProps) {
  const history = useHistoryAlert();
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, [history.selectedDate]);

  // TODO : Border radius on alerts close to the start and end
  // TODO :

  // TODO change tooltip position if it's out of the screen
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();

  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * oneHour;
  const oneWeek = 7 * oneDay;
  const span = endDate - startDate;

  // get 20%, 40%, 60%, 80% of span interval for ticks
  // value = (percentage * (max - min) / 100) + min
  const getDataListOptions = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const span = endDate - startDate;
    if (span === 7 * oneDay) {
      return Array.from({ length: 6 }, (_, i) => endDate - (i + 1) * oneDay);
    }
    return Array.from({ length: 4 }, (_, i) => endDate - ((i + 1) / 5) * span);
  };
  const getStep = (startDate, endDate) => {
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;
    const span = endDate - startDate;
    if (span === 7 * oneDay) {
      return oneHour;
    } else if (span === oneDay) {
      return oneHour / 4;
    } else if (span === oneHour) {
      return 60 * 1000;
    }
  };
  const getRadius = (start, end, startDate, endDate): RectRadius => {
    const marge = span >= oneDay ? 0.011 * span : 0;
    // TODO need to correct the conditions (don't take into || only &&)
    if (start === startDate && end === endDate) {
      return [15, 15, 15, 15];
    } else if (start <= startDate + marge && end >= endDate - marge) {
      return [6, 6, 6, 6];
    } else if (start === startDate) {
      return [15, 0, 0, 15];
    } else if (end === endDate) {
      return [0, 15, 15, 0];
    } else if (start <= startDate + marge) {
      return [6, 0, 0, 6];
    } else if (end >= endDate - marge) {
      return [0, 6, 6, 0];
    } else {
      return [0, 0, 0, 0];
    }
  };

  const setHistoryTooltipPosition = (): string => {
    const history = useHistoryAlert();
    if (history.selectedDate && popoverRef.current) {
      const width =
        ((history.selectedDate - startDate) / (endDate - startDate)) * 600;
      const leftPosition = width - popoverRef.current.offsetWidth / 2;
      return `auto auto -4px ${leftPosition}px`;
    }
    return 'auto';
  };

  const data = [
    {
      start: startDate,
      end: endDate,
      range: [startDate, endDate],
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
    const { tooltipData, coordinate } = props;
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [tooltipInset, setTooltipInset] = useState({ top: 0, left: 0 });

    useEffect(() => {
      if (tooltipRef.current) {
        // console.log('tooltip', tooltipRef.current);
        // console.log('tooltipCoord', tooltipRef.current.getBoundingClientRect());
        // left and top < 0 = tooltip is out of the screen
        // right or bottom > window.innerWidth or window.innerheight = tooltip is out of the screen

        setTooltipInset({
          left: coordinate.x - tooltipRef.current.offsetWidth / 2,
          top: coordinate.y + 20,
        });
      }
    }, [tooltipRef.current, coordinate]);
    if (tooltipData) {
      const { payload, name } = tooltipData[0];
      const tooltipName = name.replace('range', '');
      return (
        <div
          ref={tooltipRef}
          style={{
            border: `1px solid ${theme.border}`,
            width: '25rem',
            color: theme.textSecondary,
            backgroundColor: theme.backgroundLevel1,
            borderRadius: '4px',
            position: 'absolute',
            inset: `${tooltipInset.top}px auto auto ${tooltipInset.left}px`,
            padding: spacing.r8,
          }}
        >
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Text isEmphazed>View details on Alert Page</Text>
          </Box>
          <Wrap style={{ flexDirection: 'column', gap: spacing.r8 }}>
            <Wrap>
              <span>Severity:</span>
              <span>{payload[`${tooltipName}Severity`]}</span>
            </Wrap>
            <Wrap>
              <span>Start:</span>
              <FormattedDateTime
                format="date-time-second"
                value={payload[`range${tooltipName}`][0]}
              />
            </Wrap>
            <Wrap>
              <span>End:</span>
              <FormattedDateTime
                format="date-time-second"
                value={payload[`range${tooltipName}`][1]}
              />
            </Wrap>
            <Wrap>
              <span>Description:</span>
              <span>{payload[`${tooltipName}Description`]}</span>
            </Wrap>
          </Wrap>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ padding: 50, position: 'relative', width: '100%' }}>
      {history.selectedDate !== null && (
        <div
          id="history-slider"
          style={{
            width: '600px',
            position: 'relative',
          }}
        >
          <div
            id="history-tooltip"
            ref={popoverRef}
            style={{
              position: 'absolute',
              opacity: isVisible ? 1 : 0,
              display: 'flex',
              inset: setHistoryTooltipPosition(),
              alignItems: 'center',
              flexDirection: 'column',
              gap: spacing.r2,
            }}
          >
            <div
              style={{
                padding: `${spacing.r4} ${spacing.r8}`,
                whiteSpace: 'nowrap',
                border: `1px solid ${theme.border}`,
                borderRadius: '4px',
                color: theme.textSecondary,
              }}
            >
              <FormattedDateTime
                value={new Date(history.selectedDate)}
                format="date-time"
              />
            </div>
            <Icon name="Dropdown-down" color="selectedActive" size="2x" />
          </div>

          <StyledRange
            type="range"
            name="alert-history"
            id="alert-history"
            min={new Date(start).getTime()}
            max={new Date(end).getTime()}
            onMouseEnter={toggleVisibility}
            onMouseLeave={toggleVisibility}
            onFocus={toggleVisibility}
            onBlur={toggleVisibility}
            step={getStep(startDate, endDate)}
            value={history.selectedDate}
            list="list"
            onChange={(e) => {
              if (e.target.valueAsNumber > endDate)
                history.setSelectedDate(endDate);
              if (e.target.valueAsNumber < startDate)
                history.setSelectedDate(startDate);
              history.setSelectedDate(+e.target.value);
            }}
          />
          <datalist id="list" style={{ display: 'none' }}>
            {getDataListOptions(startDate, endDate).map((date) => (
              <option key={date} value={date}></option>
            ))}
          </datalist>
        </div>
      )}

      <BarChart
        width={600}
        height={60}
        data={data}
        layout="vertical"
        margin={{ left: 0, right: 0, bottom: 10 }}
        maxBarSize={600}
      >
        <XAxis
          allowDataOverflow={true}
          dataKey="start"
          type="number"
          domain={[new Date(start).getTime(), new Date(end).getTime()]}
          tickSize={8}
          minTickGap={0}
          interval={0}
          ticks={getDataListOptions(startDate, endDate)}
          tick={(props) => {
            const { x, y, payload } = props;
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
                  {span === oneWeek ? (
                    <>
                      <tspan x={0} dy="12">
                        {DATE_FORMATER.format(new Date(payload.value))}
                      </tspan>

                      <tspan x={0} dy="12">
                        {TIME_FORMATER.format(new Date(payload.value))}
                      </tspan>
                    </>
                  ) : span === oneDay ? (
                    DATE_FORMATER.format(new Date(payload.value)) +
                    ' ' +
                    TIME_FORMATER.format(new Date(payload.value))
                  ) : (
                    TIME_SECOND_FORMATER.format(new Date(payload.value))
                  )}
                </text>
              </g>
            );
          }}
          tickLine={{ stroke: theme.textSecondary }}
          axisLine={false}
        />
        {!history.selectedDate && (
          <Tooltip
            allowEscapeViewBox={{ x: true, y: true }}
            offset={20}
            isAnimationActive={false}
            cursor={false}
            content={<CustomTooltip tooltipData={tooltipData}></CustomTooltip>}
          />
        )}

        <YAxis yAxisId={'background'} type="category" hide />
        <YAxis yAxisId="clip" type="category" hide></YAxis>
        {[...criticalKeys, ...warningKeys].map((key) => (
          <YAxis key={`yAxis${key}`} yAxisId={key} type="category" hide />
        ))}

        <Bar
          dataKey="range"
          fill={theme.statusHealthy}
          radius={15}
          yAxisId="background"
        />

        {warningKeys.map((key) => (
          <Bar
            dataKey={key}
            yAxisId={key}
            key={key}
            onPointerEnter={(e) => {
              setTooltipData(e.tooltipPayload);
            }}
            onPointerLeave={() => setTooltipData(null)}
            fill={theme.statusWarning}
            shape={(props) => {
              const { x, y, height, fill } = props;

              const start =
                props[key][0] < startDate ? startDate : props[key][0];
              const end = props[key][1] > endDate ? endDate : props[key][1];
              const test = (end - start) / (endDate - startDate);
              return (
                <Rectangle
                  x={x < 0 ? 0 : x}
                  y={y}
                  width={test * 600}
                  height={height}
                  fill={fill}
                  radius={getRadius(start, end, startDate, endDate)}
                  // radius={[15, 0, 0, 15]}
                ></Rectangle>
              );
            }}
          ></Bar>
        ))}

        {criticalKeys.map((key) => (
          <Bar
            dataKey={key}
            yAxisId={key}
            key={key}
            fill={theme.statusCritical}
            radius={15}
            onPointerEnter={(e) => {
              setTooltipData(e.tooltipPayload);
            }}
            onPointerLeave={() => setTooltipData(null)}
            shape={(props) => {
              const { x, y, height, fill } = props;

              const start =
                props[key][0] < startDate ? startDate : props[key][0];
              const end = props[key][1] > endDate ? endDate : props[key][1];
              const test = (end - start) / (endDate - startDate);
              return (
                <Rectangle
                  x={x < 0 ? 0 : x}
                  y={y}
                  width={test * 600}
                  height={height}
                  fill={fill}
                  radius={getRadius(start, end, startDate, endDate)}
                  // radius={[15, 0, 0, 15]}
                ></Rectangle>
              );
            }}
          />
        ))}
      </BarChart>
    </div>
  );
}
