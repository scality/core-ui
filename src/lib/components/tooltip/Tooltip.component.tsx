import { useState, useRef, useEffect, CSSProperties } from 'react';
import styled from 'styled-components';
import { computePosition, offset, shift, flip } from '@floating-ui/dom';

import * as defaultTheme from '../../style/theme';
import { getTheme, getThemePropSelector } from '../../utils';
import { spacing } from '../../spacing';
export const TOP = 'top';
export const BOTTOM = 'bottom';
export const LEFT = 'left';
export const TOPSTART = 'top-start';
export const TOPEND = 'top-end';
export const RIGHT = 'right';
export const RIGHTSTART = 'right-start';
export const RIGHTEND = 'right-end';
export const BOTTOMEND = 'bottom-end';
export const BOTTOMSTART = 'bottom-start';
export const LEFTSTART = 'left-start';
export const LEFTEND = 'left-end';
export type Position =
  | typeof TOP
  | typeof BOTTOM
  | typeof LEFT
  | typeof RIGHT
  | typeof TOPSTART
  | typeof TOPEND
  | typeof RIGHTSTART
  | typeof RIGHTEND
  | typeof BOTTOMEND
  | typeof BOTTOMSTART
  | typeof LEFTEND
  | typeof LEFTSTART;
export type Props = {
  placement?: Position;
  overlayStyle?: CSSProperties;
  overlay?: React.ReactNode;
  children?: React.ReactNode;
};
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;
const TooltipOverLayContainer = styled.div<{
  placement: Position;
  style?: CSSProperties;
}>`
  display: inline-block;
  opacity: 0;
  position: fixed;
  width: max-content;
  border: 1px solid ${getThemePropSelector('border')};
  background-color: ${(props) =>
    (props && props.style && props.style.backgroundColor) ||
    getTheme(props).backgroundLevel1};
  color: ${(props) =>
    (props && props.style && props.style.color) || getTheme(props).textPrimary};
  z-index: ${defaultTheme.zIndex.tooltip};
  border-radius: 4px;
  font-size: ${(props) =>
    (props && props.style && props.style.fontSize) ||
    defaultTheme.fontSize.small};
  vertical-align: middle;
  padding: ${spacing.r4} ${spacing.r8};
  max-width: 40rem;
`;

const TooltipText = styled.div`
  width: 100%;
  text-align: justify;
  ul,
  ol {
    padding-inline-start: ${spacing.r16};
    margin-block-start: 0;
    margin-block-end: 0;
  }
`;

function Tooltip({
  placement = TOP,
  overlayStyle,
  children,
  overlay,
  ...rest
}: Props) {
  const childrenRef = useRef(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const isHovering = Array.from(document.querySelectorAll(':hover')).includes(
    childrenRef.current,
  );
  const [isTooltipVisible, setIsTooltipVisible] = useState(isHovering);
  useEffect(() => {
    if (childrenRef.current && tooltipRef.current) {
      computePosition(childrenRef.current, tooltipRef.current, {
        placement,
        middleware: [offset(5), shift(), flip()],
      }).then(({ x, y }) => {
        if (tooltipRef.current) {
          Object.assign(tooltipRef.current.style, {
            opacity: '1',
            // we set opacity to 1 to make sure the tooltip is not displayed before the position is computed
            left: `${x}px`,
            top: `${y}px`,
          });
        }
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipRef.current, childrenRef.current, isHovering]);
  return (
    <TooltipContainer
      className="sc-tooltip"
      onPointerEnter={() => {
        setIsTooltipVisible(true);
      }}
      onPointerLeave={() => {
        setIsTooltipVisible(false);
      }}
    >
      {isTooltipVisible && overlay ? (
        <TooltipOverLayContainer
          ref={tooltipRef}
          className="sc-tooltip-overlay"
          placement={placement}
          style={overlayStyle}
        >
          <TooltipText className="sc-tooltip-overlay-text">
            {overlay}
          </TooltipText>
        </TooltipOverLayContainer>
      ) : null}
      <div ref={childrenRef}>{children}</div>
    </TooltipContainer>
  );
}

export { Tooltip };
