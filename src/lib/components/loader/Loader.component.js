//@flow
import React from "react";
import styled, { css } from "styled-components";
import type { Node } from "react";

import { LOADER_SIZE as SIZE } from "../constants";
import LoaderIcon from "../../icons/scality-loading";
import * as defaultTheme from "../../style/theme";
import { getTheme, getThemePropSelector } from "../../utils";

type Props = {
  size?: string,
  color?: string,
  children?: Node
};

const LoaderContainer = styled.div`
  display: flex;
  ${props => {
    return css`
      font-size: ${defaultTheme.fontSize[props.size]};
      svg {
        height: ${defaultTheme.svgSize[props.size]};
        width: ${defaultTheme.svgSize[props.size]};
        fill: ${getTheme(props).primaryButton};
      }
    `;
  }}
`;

const LoaderText = styled.span`
  padding: 10px 0;
  color: ${getThemePropSelector("textPrimary")};
`;

const LoaderTextDiv = styled.span`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

function Loader({
  children,
  color = defaultTheme.gray,
  size = SIZE.large,
  ...rest
}: Props) {
  return (
    <LoaderContainer size={size} color={color} className="sc-loader" {...rest}>
      <LoaderTextDiv>
        <LoaderIcon />
        {children && <LoaderText> {children}</LoaderText>}
      </LoaderTextDiv>
    </LoaderContainer>
  );
}

export default Loader;
