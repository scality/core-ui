import { ResponsiveContainer } from 'recharts';
import styled, { useTheme } from 'styled-components';
import { spacing, Stack, Wrap } from '../../../spacing';
import { Box } from '../../box/Box';
import { ConstrainedText } from '../../constrainedtext/Constrainedtext.component';
import { FormattedDateTime } from '../../date/FormattedDateTime';
import { IconHelp } from '../../iconhelper/IconHelper';
import { Loader } from '../../loader/Loader.component';
import { Text } from '../../text/Text.component';
import { formatDate } from './chartUtils';

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

const maxWidthTooltip = { maxWidth: '20rem' };

interface ChartHeaderProps {
  title?: string;
  secondaryTitle?: string;
  helpTooltip?: React.ReactNode;
  rightTitle?: React.ReactNode;
}

/**
 * Shared chart header component
 * Used by Barchart and can be used by other charts
 */
export const ChartHeader = ({
  title,
  secondaryTitle,
  helpTooltip,
  rightTitle,
}: ChartHeaderProps) => {
  return (
    <Wrap>
      <Stack gap="r4">
        <Text variant="ChartTitle">{title}</Text>
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
      </Stack>

      {rightTitle && <Text>{rightTitle}</Text>}
    </Wrap>
  );
};

interface TimeType {
  type: 'time';
  timeRange: {
    startDate: Date;
    endDate: Date;
    interval: number;
  };
}

interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: number;
  };
  visibleTicksCount: number;
  width: number;
  type: TimeType;
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
  const tickWidth = width / visibleTicksCount - tickWidthOffset;
  const centerX = x - tickWidth / 2;

  const duration =
    type.type === 'time'
      ? type.timeRange.endDate.getTime() - type.timeRange.startDate.getTime()
      : 0;

  return (
    <foreignObject
      x={centerX}
      y={y - 10}
      width={tickWidth}
      color={theme.textSecondary}
      overflow="visible"
    >
      <ConstrainedText
        color="textSecondary"
        text={
          <Text variant="Smaller">
            {type.type === 'time' ? (
              <FormattedDateTime
                format={formatDate(duration)}
                value={new Date(payload.value)}
              />
            ) : (
              String(payload.value)
            )}
          </Text>
        }
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
