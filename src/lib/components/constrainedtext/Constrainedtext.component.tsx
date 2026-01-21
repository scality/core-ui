// @ts-nocheck
import { $PropertyType } from 'utility-types';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Tooltip } from '../tooltip/Tooltip.component';
import { Props as TooltipProps } from '../tooltip/Tooltip.component';
import { Text } from '../text/Text.component';
import { CoreUITheme } from '../../style/theme';

type Props = {
  text: string | number | JSX.Element | JSX.Element[];
  tooltipStyle?: $PropertyType<TooltipProps, 'overlayStyle'>;
  tooltipPlacement?: $PropertyType<TooltipProps, 'placement'>;
  lineClamp?: number;
  centered?: boolean;
  color?: keyof CoreUITheme;
};
// for lineClamp cf https://css-tricks.com/almanac/properties/l/line-clamp/
// it should work on all major navigator, despite the --webkit prefix
// just in case if we don't use line clamp we can just use the classic way
const ConstrainedTextContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${(props) => (props.centered ? 'center' : 'left')};

  ${(props) =>
    props.lineClamp > 1
      ? `
  display: -webkit-box;
  -webkit-line-clamp: ${props.lineClamp};
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  word-break: normal;
  `
      : `overflow-wrap: break-word;
      white-space: nowrap;
      word-break: normal;
      `};
`;
const BlockTooltip = styled.div`
  width: stretch;
  & > .sc-tooltip {
    display: block;
  }
`;

function isEllipsisActive(element: HTMLDivElement) {
  return (
    element &&
    (element.offsetWidth < element.scrollWidth ||
      element.offsetHeight < element.scrollHeight)
  );
}

function getConstrainedTextContainer(
  constrainedTextRef,
  lineClamp,
  text,
  centered,
) {
  return (
    <ConstrainedTextContainer
      ref={constrainedTextRef}
      className="sc-constrainedtext"
      lineClamp={lineClamp}
      centered={centered}
    >
      {text}
    </ConstrainedTextContainer>
  );
}

function ConstrainedText({
  text,
  tooltipStyle,
  tooltipPlacement,
  lineClamp = 1,
  color,
  centered = false,
}: Props): JSX.Element {
  const [displayToolTip, setDisplayToolTip] = useState(false);
  const constrainedTextRef = useCallback(
    (element) => {
      element && text && setDisplayToolTip(isEllipsisActive(element));
    },
    [text],
  );
  return (
    <BlockTooltip>
      {displayToolTip ? (
        <Tooltip
          overlay={text}
          overlayStyle={tooltipStyle}
          placement={tooltipPlacement}
        >
          <Text color={color}>
            {getConstrainedTextContainer(
              constrainedTextRef,
              lineClamp,
              text,
              centered,
            )}
          </Text>
        </Tooltip>
      ) : (
        <Text color={color}>
          {getConstrainedTextContainer(
            constrainedTextRef,
            lineClamp,
            text,
            centered,
          )}
        </Text>
      )}
    </BlockTooltip>
  );
}

export { ConstrainedText };
