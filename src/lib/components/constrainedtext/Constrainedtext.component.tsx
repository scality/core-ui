// @ts-nocheck
import { $PropertyType } from 'utility-types';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Tooltip } from '../tooltip/Tooltip.component';
import { Props as TooltipProps } from '../tooltip/Tooltip.component';

type Props = {
  text: string | number;
  tooltipStyle?: $PropertyType<TooltipProps, 'overlayStyle'>;
  tooltipPlacement?: $PropertyType<TooltipProps, 'placement'>;
  lineClamp?: number;
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
  overflow-wrap: break-word;
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
  return (
    element &&
    (element.offsetWidth < element.scrollWidth ||
      element.offsetHeight < element.scrollHeight)
  );
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
}: Props): JSX.Element {
  const [displayToolTip, setDisplayToolTip] = useState(false);
  const constrainedTextRef = useCallback((element) => {
    element && setDisplayToolTip(isEllipsisActive(element));
  }, []);
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

export { ConstrainedText };
