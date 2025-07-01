import { useState } from 'react';
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
import StackedBarLegend from './StackedBarLegend.component';
import StackedBarTooltip from './StackedBarTooltip.component';
import { useChartData } from './useChartData';

const CHART_CONSTANTS = {
  BAR_SIZE: 8,
  MARGIN: { top: 16, bottom: 24 },
  TICK_COUNT: 1,
  MIN_VALUE: 0,
  TICK_WIDTH_OFFSET: 5,
} as const;

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
  sortBy?: 'asc' | 'desc' | undefined;
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
  padding: ${spacing.r16} 0 ${spacing.r16} ${spacing.r16};
  border-radius: ${spacing.r8};
  min-height: 12rem;
  min-width: 22rem;

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

  const tickWidth =
    width / visibleTicksCount - CHART_CONSTANTS.TICK_WIDTH_OFFSET;
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
        centered
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
const ChartContainerWrapper = ({
  children,
  title,
  rightContent,
  style,
}: {
  children: React.ReactNode;
  title?: string;
  rightContent?: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <ChartContainer role="figure" aria-label={`${title}`} style={style}>
      <Wrap justifyContent="space-between">
        <Text variant="Large" isEmphazed color="textPrimary">
          {title}
        </Text>
        {rightContent}
      </Wrap>
      {children}
    </ChartContainer>
  );
};

const StackedBarChart = ({
  data,
  dataSchema,
  typeToDisplay,
  sortBy,
  title,
  rightContent,
  yUnit,
  style = {
    width: '100%',
    height: '100%',
  },
}: StackedBarChartProps) => {
  const theme = useTheme();
  const [hoveredValue, setHoveredValue] = useState<string>();

  const isDataValid = data && Array.isArray(data) && data.length > 0;

  const isDataSchemaValid =
    dataSchema &&
    Array.isArray(dataSchema.yValues) &&
    dataSchema.yValues.length > 0;

  const chartData = useChartData(
    isDataValid && isDataSchemaValid ? data : [],
    isDataSchemaValid ? dataSchema : { xValueKey: '', yValues: [] },
    typeToDisplay,
    sortBy,
  );

  if (!isDataValid) {
    return (
      <ChartContainerWrapper
        title={title}
        rightContent={rightContent}
        style={style}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Text>No data available</Text>
        </div>
      </ChartContainerWrapper>
    );
  }

  if (!isDataSchemaValid) {
    return (
      <ChartContainerWrapper
        title={title}
        rightContent={rightContent}
        style={style}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Text>An error occurred while rendering the chart</Text>
        </div>
      </ChartContainerWrapper>
    );
  }

  const {
    filteredDataSchemaToDisplay,
    filteredLegendItems,
    sortedData,
    setSelectedLegend,
    selectedLegend,
    referenceLineValue,
  } = chartData;

  return (
    <ChartContainerWrapper
      title={title}
      rightContent={rightContent}
      style={style}
    >
      <ResponsiveContainer>
        <BarChart
          data={sortedData}
          style={{
            minHeight: '12rem',
            minWidth: '22rem',
          }}
          margin={{
            top: CHART_CONSTANTS.MARGIN.top,
            bottom: CHART_CONSTANTS.MARGIN.bottom,
          }}
          accessibilityLayer
        >
          <YAxis
            dataKey={dataSchema.xValueKey}
            unit={yUnit}
            tickCount={CHART_CONSTANTS.TICK_COUNT}
            domain={[CHART_CONSTANTS.MIN_VALUE, referenceLineValue]}
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
                dataToDisplay={filteredLegendItems}
              />
            }
          />
          {data.length > 0 &&
            filteredDataSchemaToDisplay.map((yValue) => (
              <Bar
                key={yValue.key}
                barSize={CHART_CONSTANTS.BAR_SIZE}
                dataKey={yValue.key}
                stackId={yValue.type || 'default'}
                fill={yValue.color}
                onMouseOver={() => setHoveredValue(yValue.key)}
                onMouseLeave={() => setHoveredValue(undefined)}
              />
            ))}
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
    </ChartContainerWrapper>
  );
};

export { StackedBarChart };
