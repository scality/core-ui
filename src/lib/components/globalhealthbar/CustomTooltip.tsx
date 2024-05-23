import { useEffect, useRef, useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { Box } from '../../next';
import { Text, FormattedDateTime, Wrap, spacing } from '../../index';

const TootlipContainer = styled.div<{ tooltipInset }>`
  ${(props) => {
    const theme = useTheme();
    return css`
      border: 1px solid ${theme.border};
      width: 24rem;
      color: ${theme.textSecondary};
      background-color: ${theme.backgroundLevel1};
      border-radius: 4px;
      position: absolute;
      inset: ${props.tooltipInset.top}px auto auto ${props.tooltipInset.left}px;
      padding: ${spacing.r8};
      font-size: 1rem;
    `;
  }}
`;

export const CustomTooltip = (props) => {
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
      <TootlipContainer ref={tooltipRef} tooltipInset={tooltipInset}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: spacing.r8,
          }}
        >
          <Text isEmphazed>View details on Alert Page</Text>
        </Box>
        <Wrap style={{ flexDirection: 'column', gap: spacing.r8 }}>
          <Wrap>
            <span>Severity:</span>
            <Text>{payload[`${tooltipName}Severity`]}</Text>
          </Wrap>
          <Wrap>
            <span>Start:</span>
            <Text>
              <FormattedDateTime
                format="date-time-second"
                value={payload[`range${tooltipName}`][0]}
              />
            </Text>
          </Wrap>
          <Wrap>
            <span>End:</span>
            <Text>
              <FormattedDateTime
                format="date-time-second"
                value={payload[`range${tooltipName}`][1]}
              />
            </Text>
          </Wrap>
          <Wrap>
            <span>Description:</span>
            <Text>{payload[`${tooltipName}Description`]}</Text>
          </Wrap>
        </Wrap>
      </TootlipContainer>
    );
  }

  return null;
};
