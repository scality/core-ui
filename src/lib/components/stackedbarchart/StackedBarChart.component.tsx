import { useState, useMemo } from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled, { useTheme } from 'styled-components';
import { ConstrainedText, spacing, Wrap } from '../..';
import { Text } from '../text/Text.component';
import StackedBarTooltip from './StackedBarTooltip.component';
import StackedBarLegend from './StackedBarLegend.component';
import {
  getMaxValueByType,
  getRoundReferenceValue,
  sumDataValues,
  KeysByType,
} from './utils';

export type DataSchema = {
  /** The key in the data object that represents the X-axis values */
  xValueKey: string;
  /** Array of Y-axis value configurations */
  yValues: Array<{
    /** The key in the data object that represents this Y value */
    key: string;
    /** Color for this data series */
    color: string;
    /** Optional type for grouping related data series */
    type?: string;
    /** Display label for this data series (falls back to key if not provided) */
    label?: string;
  }>;
};

export type StackedBarChartProps = {
  /** Array of data objects where each object represents a bar in the chart */
  data: Array<{
    [key: string]: number | string;
  }>;
  /** Configuration defining the structure and appearance of the chart data */
  dataSchema: DataSchema;
  /** Title displayed above the chart */
  title?: string;
  /** Filter to display only data series of a specific type */
  typeToDisplay?: string;
  /** Sort the bars by their total values ('asc' for ascending, 'desc' for descending) */
  sortBy?: 'asc' | 'desc';
  /** Additional content to display in the top-right area of the chart */
  rightContent?: React.ReactNode;
  /** Unit to display after Y-axis values (e.g., " TB", " IOPS") */
  yUnit?: string;
  /** Style to apply to the chart container */
  style?: React.CSSProperties;
};

const ChartContainer = styled.div<{
  style?: React.CSSProperties;
}>`
  background-color: ${(props) => props.theme.backgroundLevel1};
  padding: ${spacing.r32};
  border-radius: ${spacing.r8};

  & .recharts-surface {
    overflow: visible;
  }
`;

interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
  visibleTicksCount: number;
  width: number;
}

const CustomTick = ({
  x,
  y,
  payload,
  visibleTicksCount,
  width,
}: CustomTickProps) => {
  const theme = useTheme();

  const tickWidth = width / visibleTicksCount - 5;
  const centerX = x - tickWidth / 2;

  return (
    <foreignObject
      x={centerX}
      y={y}
      width={tickWidth}
      color={theme.textSecondary}
      overflow="visible"
    >
      <ConstrainedText
        text={String(payload.value)}
        tooltipStyle={{
          backgroundColor: theme.backgroundLevel1,
          padding: spacing.r10,
          borderRadius: spacing.r8,
          border: `1px solid ${theme.border}`,
          position: 'absolute',
        }}
      />
    </foreignObject>
  );
};

/**
 * StackedBarChart Component
 *
 * A responsive stacked bar chart component built with Recharts that supports:
 * - Multiple data series with custom colors and labels
 * - Data filtering by type
 * - Interactive legend for showing/hiding data series
 * - Sorting by total values
 * - Custom tooltips with hover effects
 * - Responsive design with customizable dimensions
 *
 * @example
 * ```tsx
 * <StackedBarChart
 *   data={[
 *     { date: 'Mon', value1: 30, value2: 20 },
 *     { date: 'Tue', value1: 45, value2: 25 }
 *   ]}
 *   dataSchema={{
 *     xValueKey: 'date',
 *     yValues: [
 *       { key: 'value1', color: '#0AADA6', label: 'Success' },
 *       { key: 'value2', color: '#E84855', label: 'Failure' }
 *     ]
 *   }}
 *   title="Weekly Performance"
 *   yUnit=" items"
 * />
 * ```
 */
const StackedBarChart = ({
  data,
  dataSchema,
  typeToDisplay,
  sortBy,
  title,
  rightContent,
  yUnit,
  style,
}: StackedBarChartProps) => {
  const theme = useTheme();
  const [selectedLegend, setSelectedLegend] = useState<string>();
  const [hoveredValue, setHoveredValue] = useState<string>();

  const minValue = 0;

  /* ------------------------------- Filter Data ------------------------------ */

  // Filter data by type
  const keysByType: KeysByType = useMemo(() => {
    const result: KeysByType = {};
    dataSchema.yValues.forEach(({ key, type }) => {
      // Use type or 'default' if type is undefined
      const typeKey = type || 'default';
      if (!result[typeKey]) {
        result[typeKey] = [];
      }
      result[typeKey].push(key);
    });
    return result;
  }, [dataSchema.yValues]);

  /* --------------------------- Filter Data to Display by Type -------------------------- */

  const filteredDataToDisplay = useMemo(
    () =>
      dataSchema.yValues.filter((yValue) =>
        typeToDisplay ? yValue.type === typeToDisplay : true,
      ),
    [dataSchema.yValues, typeToDisplay],
  );

  /* -------------------------------- Sort Data ------------------------------- */

  const sortedData = useMemo(() => {
    if (!sortBy) return data;

    return data.toSorted((a, b) => {
      const aSum = sumDataValues(a, keysByType, typeToDisplay, selectedLegend);
      const bSum = sumDataValues(b, keysByType, typeToDisplay, selectedLegend);
      if (sortBy === 'asc') {
        return aSum - bSum;
      } else {
        return bSum - aSum;
      }
    });
  }, [data, keysByType, sortBy, typeToDisplay, selectedLegend]);

  /* -------------------------- Reference Line Value -------------------------- */

  const maxValue = useMemo(
    () => getMaxValueByType(data, keysByType, typeToDisplay, selectedLegend),
    [data, keysByType, typeToDisplay, selectedLegend],
  );

  const referenceLineValue = useMemo(
    () => getRoundReferenceValue(maxValue),
    [maxValue],
  );

  // Memoize the final data to use in the chart
  const chartData = useMemo(() => {
    return sortBy ? sortedData : data;
  }, [sortBy, sortedData, data]);

  /* ------------------------------ - ------------------------------ */

  return (
    <ChartContainer
      role="figure"
      aria-label={`${title || 'Stacked bar chart'}`}
      style={style}
    >
      <Wrap justifyContent="space-between">
        <Text variant="Large" isEmphazed color="textPrimary">
          {title}
        </Text>
        {rightContent}
      </Wrap>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 16,
            bottom: 24,
          }}
          accessibilityLayer
        >
          <YAxis
            unit={yUnit}
            tickCount={1}
            domain={[minValue, referenceLineValue]}
            tickFormatter={(value) => value.toFixed(0)}
            axisLine={false}
            tick={{
              fill: theme.textSecondary,
            }}
            tickLine={false}
            label={{
              fill: theme.textSecondary,
            }}
            orientation="right"
          />
          <ReferenceLine y={referenceLineValue} fill={theme.textSecondary} />
          <Tooltip
            content={
              <StackedBarTooltip
                hoveredValue={hoveredValue}
                yUnit={yUnit}
                dataSchema={dataSchema}
              />
            }
            cursor={false}
          />
          <Legend
            content={
              <StackedBarLegend
                selectedLegend={selectedLegend}
                setSelectedLegend={setSelectedLegend}
                dataToDisplay={filteredDataToDisplay}
              />
            }
          />
          {filteredDataToDisplay.map((yValue) => {
            if (selectedLegend) {
              if (yValue.key === selectedLegend) {
                return (
                  <Bar
                    barSize={8}
                    key={yValue.key}
                    dataKey={yValue.key}
                    stackId={yValue.type || 'default'}
                    fill={yValue.color}
                  />
                );
              }
              return null;
            } else {
              return (
                <Bar
                  key={yValue.key}
                  barSize={8}
                  dataKey={yValue.key}
                  stackId={yValue.type || 'default'}
                  fill={yValue.color}
                  onMouseOver={() => setHoveredValue(yValue.key)}
                  onMouseLeave={() => setHoveredValue(undefined)}
                ></Bar>
              );
            }
          })}
          {/* X Axis
          Put it here to avoid the tooltip to be displayed under the bar
          SVG paint object in order, on top of previous elements
          */}
          <XAxis
            tick={(props) => <CustomTick {...props} />}
            dataKey={dataSchema.xValueKey}
            type="category"
            allowDataOverflow={true}
            interval={0}
            tickLine={{
              stroke: theme.textSecondary,
            }}
            axisLine={{
              stroke: theme.textSecondary,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default StackedBarChart;
