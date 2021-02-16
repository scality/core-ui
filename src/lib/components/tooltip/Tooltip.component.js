//@flow
import React, { useState } from "react";
import styled, { css } from "styled-components";
import type { Node } from "react";
import * as defaultTheme from "../../style/theme";
import { getTheme } from "../../utils";

export const TOP = "top";
export const BOTTOM = "bottom";
export const LEFT = "left";
export const RIGHT = "right";
type Position = typeof TOP | typeof BOTTOM | typeof LEFT | typeof RIGHT;
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
  position: absolute;
  background-color: ${(props) =>
    (props && props.overlayStyle && props.overlayStyle.backgroundColor) ||
    getTheme(props).primaryDark2};
  color: ${(props) =>
    (props && props.overlayStyle && props.overlayStyle.color) ||
    getTheme(props).textPrimary}
  z-index: ${defaultTheme.zIndex.tooltip};
  border-radius: 4px;
  font-size: ${(props) =>
    (props && props.overlayStyle && props.overlayStyle.fontSize) ||
    defaultTheme.fontSize.small};
  width:${(props) =>
    (props && props.overlayStyle && props.overlayStyle.width) || "50px"};
  text-align: center;
  vertical-align: middle;
  padding: ${defaultTheme.padding.smaller};
    ${(props) => {
      switch (props.placement) {
        case LEFT:
          return css`
            right: calc(100% + 10px);
            top: 50%;
            transform: translateY(-50%);
          `;
        case RIGHT:
          return css`
            left: calc(100% + 10px);
            top: 50%;
            transform: translateY(-50%);
          `;
        case BOTTOM:
          return css`
            top: calc(100% + 10px);
            left: 50%;
            transform: translateX(-50%);
          `;
        default:
          return css`
            bottom: calc(100% + 10px);
            left: 50%;
            transform: translateX(-50%);
          `;
      }
    }};
`;

function Tooltip({
  placement = TOP,
  overlayStyle,
  children,
  overlay,
  ...rest
}: Props) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <TooltipContainer
      className="sc-tooltip"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      {isTooltipVisible && overlay ? (
        <TooltipOverLayContainer
          className="sc-tooltip-overlay"
          placement={placement}
          overlayStyle={overlayStyle}
        >
          <div className="sc-tooltip-overlay-text">{overlay}</div>
        </TooltipOverLayContainer>
      ) : null}
      {children}
    </TooltipContainer>
  );
}
export default Tooltip;
