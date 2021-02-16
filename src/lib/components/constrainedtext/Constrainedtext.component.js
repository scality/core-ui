//@flow
import React from "react";
import type { Node } from "react";
import styled from "styled-components";
import Tooltip from "../tooltip/Tooltip.component.js";
import type { Props as TooltipProps } from "../tooltip/Tooltip.component.js";
type Props = {
  text: string,
  tooltipStyle?: $PropertyType<TooltipProps, "overlayStyle">,
  tooltipPlacement?: $PropertyType<TooltipProps, "placement">,
};

const ConstrainedTextContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
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
}: Props): Node {
  return (
    <BlockTooltip>
      <Tooltip
        overlay={text}
        overlayStyle={tooltipStyle}
        placement={tooltipPlacement}
      >
        <ConstrainedTextContainer className="sc-constrainedtext">
          {text}
        </ConstrainedTextContainer>
      </Tooltip>
    </BlockTooltip>
  );
}

export default ConstrainedText;
