//@flow
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import Tooltip from '../tooltip/Tooltip.component.js';
import type { Props as TooltipProps } from '../tooltip/Tooltip.component.js';

type Props = {
  text: string,
  tooltipStyle?: $PropertyType<TooltipProps, 'overlayStyle'>,
  tooltipPlacement?: $PropertyType<TooltipProps, 'placement'>,
  lineClamp?: number,
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
      white-space: nowrap;`}
}

;
`;

const BlockTooltip = styled.div`
  & > .sc-tooltip {
    display: block;
  }
`;

function isEllipsisActive(element: HTMLDivElement) {
  return element && element.offsetWidth < element.scrollWidth;
}

function getConstrainedTextContainer(constrainedTextRef, lineClamp, text) {
  return (
    <ConstrainedTextContainer
      ref={constrainedTextRef}
      className="sc-constrainedtext"
      lineClamp={lineClamp}
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
}: Props): Node {
  const [displayToolTip, setDisplayToolTip] = useState(false);

  const constrainedTextRef = useCallback(
    (element) => {
      element && setDisplayToolTip(isEllipsisActive(element) || lineClamp > 1);
    },
    [lineClamp],
  );

  return (
    <BlockTooltip>
      {displayToolTip ? (
        <Tooltip
          overlay={text}
          overlayStyle={tooltipStyle}
          placement={tooltipPlacement}
        >
          {getConstrainedTextContainer(constrainedTextRef, lineClamp, text)}
        </Tooltip>
      ) : (
        getConstrainedTextContainer(constrainedTextRef, lineClamp, text)
      )}
    </BlockTooltip>
  );
}

export default ConstrainedText;
