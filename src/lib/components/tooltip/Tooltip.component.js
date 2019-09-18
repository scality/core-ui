// @flow

import React from "react";
import styled from "styled-components";
import RcTooltip from "rc-tooltip";
import type { Node } from "react";

export const LEFT = "left";
export const RIGHT = "right";
export const BOTTOM = "bottom";
export const TOP = "top";
type Position = typeof LEFT | typeof RIGHT | typeof BOTTOM | typeof TOP;

type Props = {
  placement?: Position,
  mouseEnterDelay?: number,
  mouseLeaveDelay?: number,
  destroyTooltipOnHide?: boolean,
  overlay: Node,
  trigger?: Array<string>,
  children: Node
};

const TooltipContainer = styled.div``;

function Tooltip({
  placement = "right",
  mouseEnterDelay = 0,
  mouseLeaveDelay = 0,
  destroyTooltipOnHide = true,
  trigger = ["hover"],
  overlay = null,
  children
}: Props) {
  return (
    <TooltipContainer className="sc-tooltip">
      <RcTooltip
        placement={placement}
        mouseEnterDelay={mouseEnterDelay}
        mouseLeaveDelay={mouseLeaveDelay}
        destroyTooltipOnHide={destroyTooltipOnHide}
        trigger={trigger}
        overlay={overlay}
      >
        {children}
      </RcTooltip>
    </TooltipContainer>
  );
}

export default Tooltip;
