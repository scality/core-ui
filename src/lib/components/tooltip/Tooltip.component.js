//@flow
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import type { Node } from 'react';
// $FlowFixMe
import { computePosition, offset, shift, flip } from '@floating-ui/dom';
import * as defaultTheme from '../../style/theme';
import { getTheme, getThemePropSelector } from '../../utils';

export const TOP = 'top';
export const BOTTOM = 'bottom';
export const BOTTOMRIGHT = 'bottom-right';
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

type Position =
  | typeof TOP
  | typeof BOTTOM
  | typeof BOTTOMRIGHT
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
  placement?: Position,
  overlayStyle?: {
    backgroundColor?: string,
    color?: string,
    fontSize?: string,
    width?: string,
  },
  overlay?: Node,
  children?: Node,
};

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipOverLayContainer = styled.div`
  display: flex;
  opacity: 0;
  position: absolute;
  border: 1px solid ${getThemePropSelector('border')};
  background-color: ${(props) =>
    (props && props.overlayStyle && props.overlayStyle.backgroundColor) ||
    getTheme(props).backgroundLevel1};
  color: ${(props) =>
    (props && props.overlayStyle && props.overlayStyle.color) ||
    getTheme(props).textPrimary};
  z-index: ${defaultTheme.zIndex.tooltip};
  border-radius: 4px;
  font-size: ${(props) =>
    (props && props.overlayStyle && props.overlayStyle.fontSize) ||
    defaultTheme.fontSize.small};
  width: ${(props) => props && props.overlayStyle && props.overlayStyle.width};
  text-align: center;
  vertical-align: middle;
  padding: ${defaultTheme.padding.smaller};
  }};
`;

const TooltipText = styled.div`
  width: 100%;
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

  console.log({
    isHovering,
    isTooltipVisible,
    childrenRef,
    tooltipRef,
    overlay,
  });

  useEffect(() => {
    console.log({
      isHovering,
      isHoveringBis: document.querySelectorAll(':hover'),
      isHoveringTer: Array.from(document.querySelectorAll(':hover')).includes(
        childrenRef.current,
      ),
    });
    if (isHovering && !isTooltipVisible) {
      setIsTooltipVisible(!isTooltipVisible);
    }
  }, [isHovering, childrenRef.current, isTooltipVisible]);

  useEffect(() => {
    if (childrenRef.current && tooltipRef.current) {
      computePosition(childrenRef.current, tooltipRef.current, {
        placement,
        middleware: [offset(5), shift(), flip()],
      }).then(({ x, y }) => {
        // flow doesn't understand that the ref is not null
        // $FlowFixMe
        Object.assign(tooltipRef.current.style, {
          opacity: '1', // we set opacity to 1 to make sure the tooltip is not displayed before the position is computed
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipRef.current, childrenRef.current, isHovering]);

  return (
    <TooltipContainer
      className="sc-tooltip"
      onMouseEnter={() => {
        setIsTooltipVisible(true);
      }}
      onMouseLeave={() => {
        setIsTooltipVisible(false);
      }}
    >
      {isTooltipVisible ? (
        <TooltipOverLayContainer
          ref={tooltipRef}
          className="sc-tooltip-overlay"
          placement={placement}
          overlayStyle={overlayStyle}
        >
          {overlay && (
            <TooltipText className="sc-tooltip-overlay-text">
              {overlay}
            </TooltipText>
          )}
        </TooltipOverLayContainer>
      ) : null}
      <div ref={childrenRef}>{children}</div>
    </TooltipContainer>
  );
}
export default Tooltip;
