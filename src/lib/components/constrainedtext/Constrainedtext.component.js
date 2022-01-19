//@flow
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import Tooltip from '../tooltip/Tooltip.component.js';
import type { Props as TooltipProps } from '../tooltip/Tooltip.component.js';
type Props = {
  text: string,
  tooltipStyle?: $PropertyType<TooltipProps, 'overlayStyle'>,
  tooltipPlacement?: $PropertyType<TooltipProps, 'placement'>,
  lineClamp?: Number,
};

// for lineClamp cf https://css-tricks.com/almanac/properties/l/line-clamp/
// it should work on all major navigator, despite the --webkit prefix
// just in case if we don't use line clamp we can just use the classic way
const ConstrainedTextContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;

  ${(props) =>
    props.lineClamp > 1
      ? `
  display: -webkit-box;
  -webkit-line-clamp: ${props.lineClamp};
  -webkit-box-orient: vertical;
  `
      : `word-wrap: break-word;
      white-space: nowrap;`}};
`;

const BlockTooltip = styled.div`
  & > .sc-tooltip {
    display: block;
  }
`;

function ConstrainedText({
  text,
  tooltipStyle,
  tooltipPlacement,
  lineClamp = 1,
}: Props): Node {
  return (
    <BlockTooltip>
      <Tooltip
        overlay={text}
        overlayStyle={tooltipStyle}
        placement={tooltipPlacement}
      >
        <ConstrainedTextContainer
          className="sc-constrainedtext"
          lineClamp={lineClamp}
        >
          {text}
        </ConstrainedTextContainer>
      </Tooltip>
    </BlockTooltip>
  );
}

export default ConstrainedText;
