import { TooltipContentProps } from 'recharts';
import styled, { css, useTheme } from 'styled-components';
import { FormattedDateTime, Stack, Text, Wrap, spacing } from '../../index';
import { Alert } from './GlobalHealthBarRecharts.component';

interface CustomTooltipProps {
  tooltipData: Alert | null;
  tooltipProps: TooltipContentProps<number, string>;
}

const TooltipContainer = styled.div`
  ${(props) => {
    const theme = useTheme();

    return css`
      border: 1px solid ${theme.border};
      width: 20rem;
      color: ${theme.textSecondary};
      background-color: ${theme.backgroundLevel1};
      border-radius: 4px;
      padding: ${spacing.r8};
    `;
  }}
`;

export const CustomTooltip = (props: CustomTooltipProps) => {
  const { tooltipData } = props;

  // useEffect(() => {
  //   if (tooltipRef.current && coordinate) {
  //     // left and top < 0 = tooltip is out of the screen
  //     // right or bottom > window.innerWidth or window.innerheight = tooltip is out of the screen

  //     // we subtract the width of the tooltip from the x coordinate to center the tooltip
  //     setTooltipInset({
  //       left: coordinate.x - tooltipRef.current.offsetWidth / 2,
  //       top: coordinate.y + 20,
  //     });
  //   }
  // }, [coordinate, tooltipRef]);
  if (tooltipData) {
    const { description, startsAt, endsAt, severity } = tooltipData;

    return (
      <TooltipContainer>
        <Stack direction="vertical" gap="r8">
          <Wrap>
            <Text variant="Small">Severity</Text>
            <Text color="textPrimary" variant="Small">
              {severity}
            </Text>
          </Wrap>
          <Wrap>
            <Text variant="Small">Start</Text>
            <Text color="textPrimary" variant="Small">
              <FormattedDateTime
                format="date-time"
                value={new Date(startsAt)}
              />
            </Text>
          </Wrap>
          <Wrap>
            <Text variant="Small">End</Text>
            <Text color="textPrimary" variant="Small">
              <FormattedDateTime format="date-time" value={new Date(endsAt)} />
            </Text>
          </Wrap>
          <Wrap>
            <Text variant="Small">Description</Text>
            <Text color="textPrimary" variant="Small">
              {description}
            </Text>
          </Wrap>
        </Stack>
      </TooltipContainer>
    );
  }

  return null;
};
