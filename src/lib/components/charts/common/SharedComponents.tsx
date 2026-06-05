import { ResponsiveContainer } from 'recharts';
import styled, { useTheme } from 'styled-components';
import { spacing, Stack, Wrap } from '../../../spacing';
import { Box } from '../../box/Box';
import { IconHelp } from '../../iconhelper/IconHelper';
import { Loader } from '../../loader/Loader.component';
import { Text } from '../../text/Text.component';
import { ConstrainedText } from '../../constrainedtext/Constrainedtext.component';
import { FormattedDateTime } from '../../date/FormattedDateTime';
import { formatXAxisDate, maxWidthTooltip } from './chartUtils';
import { TimeType, CategoryType } from '../types';

/**
 * Styled ResponsiveContainer for charts
 * Shared by Barchart and LineTimeSerieChart
 * Ensures tooltip overflow is visible and removes outline
 */
export const StyledResponsiveContainer = styled(ResponsiveContainer)`
  // Avoid tooltip over constrained text to be cut off
  & .recharts-surface {
    outline: none;
    overflow: visible;
  }
`;

const TickContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Stacks a multi-line tick label (e.g. time + date on a midnight crossover)
// tightly. The reduced line-height keeps the two lines visually grouped; each
// line stays its own ConstrainedText so it truncates independently.
const MultilineTickContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & span {
    line-height: 1.1;
  }
`;

// Extra height granted per wrapped line so a second line is not clipped.
const TICK_LINE_HEIGHT = 12;

interface ChartLoadingOrErrorProps {
  height: number;
}

/**
 * Error state component for charts
 */
export const ChartError = ({ height }: ChartLoadingOrErrorProps) => {
  return (
    <Box
      height={height}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Text>Chart data is not available</Text>
    </Box>
  );
};

/**
 * Loading state component for charts
 */
export const ChartLoading = ({ height }: ChartLoadingOrErrorProps) => {
  return (
    <Box
      height={height}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Loader size="larger" children={<Text>Loading Chart Data...</Text>} />
    </Box>
  );
};

interface ChartHeaderProps {
  title?: string;
  secondaryTitle?: string;
  helpTooltip?: React.ReactNode;
  rightTitle?: React.ReactNode;
  isLoading?: boolean;
}

/**
 * Shared chart header component
 * Used by Barchart and LineTimeSerieChart
 */
export const ChartHeader = ({
  title,
  secondaryTitle,
  helpTooltip,
  rightTitle,
  isLoading,
}: ChartHeaderProps) => {
  return (
    <Wrap>
      <Stack gap="r4">
        {title && <Text variant="ChartTitle">{title}</Text>}
        {helpTooltip && (
          <IconHelp
            tooltipMessage={helpTooltip}
            overlayStyle={maxWidthTooltip}
          />
        )}
        {secondaryTitle && (
          <Text
            color="textSecondary"
            style={{
              marginLeft: spacing.r8,
            }}
          >
            {secondaryTitle}
          </Text>
        )}
        {isLoading && <Loader />}
      </Stack>

      {rightTitle}
    </Wrap>
  );
};

interface CustomTickProps {
  x: number | string;
  y: number | string;
  payload: {
    value: number;
  };
  visibleTicksCount?: number;
  width?: number | string;
  type: TimeType | CategoryType;
  tickWidthOffset?: number;
}

/**
 * Custom tick component for charts
 * Used by Barchart for time-based x-axis ticks
 */
export const CustomTick = ({
  x,
  y,
  payload,
  visibleTicksCount,
  width,
  type,
  tickWidthOffset = 4,
}: CustomTickProps) => {
  const theme = useTheme();
  const numX = typeof x === 'string' ? parseFloat(x) : x;
  const numY = typeof y === 'string' ? parseFloat(y) : y;
  const numWidth = typeof width === 'string' ? parseFloat(width) : (width ?? 0);
  const tickCount = visibleTicksCount ?? 1;
  const tickWidth = numWidth / tickCount - tickWidthOffset;
  const centerX = numX - tickWidth / 2;

  const duration =
    type.type === 'time'
      ? (type.timeRange.endDate.getTime() -
        type.timeRange.startDate.getTime()) /
      1000
      : 0;

  const tooltipStyle = {
    backgroundColor: theme.backgroundLevel1,
    padding: spacing.r10,
    borderRadius: spacing.r8,
    border: `1px solid ${theme.border}`,
    position: 'absolute' as const,
  };

  const labelLine = (content: React.ReactNode, key?: React.Key) => (
    <ConstrainedText
      key={key}
      color="textSecondary"
      text={<Text variant="Smaller">{content}</Text>}
      centered
      tooltipStyle={tooltipStyle}
    />
  );

  // A category label may carry a second line (e.g. a date on a midnight
  // crossover) separated by "\n"; those lines are stacked tightly.
  const lines = type.type === 'time' ? [] : String(payload.value).split('\n');
  const isMultiline = lines.length > 1;

  const content =
    type.type === 'time' ? (
      labelLine(
        <FormattedDateTime
          format={formatXAxisDate(duration)}
          value={new Date(payload.value)}
        />,
      )
    ) : isMultiline ? (
      <MultilineTickContainer>
        {lines.map((line, index) => labelLine(line, index))}
      </MultilineTickContainer>
    ) : (
      labelLine(String(payload.value))
    );

  return (
    <foreignObject
      x={centerX}
      y={numY - 10}
      width={tickWidth}
      height={30 + (isMultiline ? (lines.length - 1) * TICK_LINE_HEIGHT : 0)}
      style={{
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <TickContainer>{content}</TickContainer>
    </foreignObject>
  );
};
