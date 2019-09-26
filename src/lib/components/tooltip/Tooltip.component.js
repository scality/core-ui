import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import type { Node } from "react";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

export const TOP = "top";
export const BUTTOM = "buttom";
export const LEFT = "left";
export const RIGHT = "right";
type Position = typeof TOP | typeof BUTTOM | typeof LEFT | typeof RIGHT;
type Props = {
  placement?: Position,
  overlay?: Node,
  trigger?: Array<string>,
  children?: Node
};

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipOverLayContainer = styled.div`
  position: absolute;
  background-color: ${defaultTheme.grayDarker};
  color: ${defaultTheme.white}
  z-index: ${defaultTheme.zIndex.tooltip};
  border-radius: 4px;
  font-size: ${defaultTheme.fontSize.small};
  letter-spacing: 0.8px;
  text-align: center;
  vertical-align: middle;
  line-height: 20px;
  min-height: 20px;
  padding: 3px 5px 3px 5px
    ${props => {
      console.log("props", props);

      switch (props.placement) {
        case LEFT:
          return css`
            top: 0px;
            right: 105%;
          `;
        case RIGHT:
          return css`
            top: 0px;
            left: 105%;
          `;
        case BUTTOM:
          return css`
            top: 105%;
          `;
        default:
          return css`
            bottom: 105%;
          `;
      }
    }};
`;

function Tooltip({ placement, overlay, children }: Props) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipId, setTooltipID] = useState(
    "tooltip-" +
      Math.random()
        .toString(36)
        .substring(7)
  );
  const setTooltipVisible = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <TooltipContainer
      className="sc-tooltip"
      id={tooltipId}
      onMouseEnter={setTooltipVisible}
      onMouseLeave={setTooltipVisible}
    >
      {isTooltipVisible
        ? ReactDOM.createPortal(
            <TooltipOverLayContainer placement={placement} overlay={overlay}>
              Helloooooooooooo
            </TooltipOverLayContainer>,
            document.getElementById(tooltipId)
          )
        : null}
      {children}
    </TooltipContainer>
  );
}
export default Tooltip;
