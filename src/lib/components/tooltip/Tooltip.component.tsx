import { flip, offset, shift, useFloating } from '@floating-ui/react';
import { CSSProperties, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { spacing } from '../../spacing';
import { fontSize, zIndex } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
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
  width: max-content;
  border: 1px solid ${getThemePropSelector('border')};
  background-color: ${(props) =>
    (props && props.style && props.style.backgroundColor) ||
    props.theme.backgroundLevel1};
  color: ${(props) =>
    (props && props.style && props.style.color) || props.theme.textPrimary};
  z-index: ${zIndex.tooltip};
  border-radius: 4px;
  font-size: ${(props) =>
    (props && props.style && props.style.fontSize) || fontSize.small};
  vertical-align: middle;
  padding: ${spacing.r4} ${spacing.r8};
  max-width: 20rem;
`;

const TooltipText = styled.div`
  width: 100%;
  ul,
  ol {
    padding-inline-start: ${spacing.r16};
    margin-block-start: 0;
    margin-block-end: 0;
  }
  li {
    margin-bottom: ${spacing.r8};
  }
  li:last-child {
    margin-bottom: 0;
  }
`;

function Tooltip({
  placement = TOP,
  overlayStyle,
  children,
  overlay,
  ...rest
}: Props) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement,
    open: isTooltipVisible,
    middleware: [offset(5), shift(), flip()],
  });
  return (
    <>
      <TooltipContainer
        className="sc-tooltip"
        onPointerEnter={() => {
          setIsTooltipVisible(true);
        }}
        onPointerLeave={() => {
          setIsTooltipVisible(false);
        }}
        onFocus={() => {
          setIsTooltipVisible(true);
        }}
        onBlur={() => {
          setIsTooltipVisible(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsTooltipVisible(false);
          }
        }}
      >
        <div ref={refs.setReference}>{children}</div>
      </TooltipContainer>
      {isTooltipVisible &&
        overlay &&
        createPortal(
          <TooltipOverLayContainer
            ref={refs.setFloating}
            className="sc-tooltip-overlay"
            placement={placement}
            style={{ ...floatingStyles, ...overlayStyle }}
          >
            <TooltipText className="sc-tooltip-overlay-text">
              {overlay}
            </TooltipText>
          </TooltipOverLayContainer>,
          document.body,
        )}
    </>
  );
}

export { Tooltip };
