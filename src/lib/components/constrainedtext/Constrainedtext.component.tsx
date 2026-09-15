import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Tooltip } from '../tooltip/Tooltip.component';
import { Props as TooltipProps } from '../tooltip/Tooltip.component';
import { Text, TextProps } from '../text/Text.component';

type Align = 'start' | 'center' | 'end';

type Props = {
  text: string | number | JSX.Element | JSX.Element[];
  tooltipStyle?: TooltipProps['overlayStyle'];
  tooltipPlacement?: TooltipProps['placement'];
  lineClamp?: number;
  align?: Align;
  /** @deprecated use `align="center"` instead. */
  centered?: boolean;
} & TextProps;

// for lineClamp cf https://css-tricks.com/almanac/properties/l/line-clamp/
// it should work on all major navigator, despite the --webkit prefix
// just in case if we don't use line clamp we can just use the classic way
const ConstrainedTextContainer = styled.div<{
  $lineClamp: number;
  $align?: Align;
}>`
  overflow: hidden;
  text-overflow: ellipsis;
  /* inherit when no align is given: this is a rule on the element, so a
     hard-coded value silently outranks whatever alignment the container set --
     a table cell declaring textAlign: center kept left-aligned text with
     nothing to explain why. */
  text-align: ${(props) => props.$align ?? 'inherit'};

  ${(props) =>
    props.$lineClamp > 1
      ? `
  display: -webkit-box;
  -webkit-line-clamp: ${props.$lineClamp};
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  word-break: normal;
  line-height: 1.2;
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

function ConstrainedText({
  text,
  tooltipStyle,
  tooltipPlacement,
  lineClamp = 1,
  align,
  centered = false,
  ...textProps
}: Props): JSX.Element {
  const [displayToolTip, setDisplayToolTip] = useState(false);
  const constrainedTextRef = useCallback(
    (element: HTMLDivElement | null) => {
      element && text && setDisplayToolTip(isEllipsisActive(element));
    },
    [text],
  );
  const constrainedText = (
    <Text {...textProps}>
      <ConstrainedTextContainer
        ref={constrainedTextRef}
        className="sc-constrainedtext"
        $lineClamp={lineClamp}
        $align={align ?? (centered ? 'center' : undefined)}
      >
        {text}
      </ConstrainedTextContainer>
    </Text>
  );
  return (
    <BlockTooltip>
      {displayToolTip ? (
        <Tooltip
          overlay={text}
          overlayStyle={tooltipStyle}
          placement={tooltipPlacement}
        >
          {constrainedText}
        </Tooltip>
      ) : (
        constrainedText
      )}
    </BlockTooltip>
  );
}

export { ConstrainedText };
