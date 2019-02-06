import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { LOADER_SIZE as SIZE } from "../constants";
import LoaderIcon from "../../icons/scality-loading";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

const LoaderContainer = styled.div`
  display: flex;
  ${props => {
    const brandingTheme = mergeTheme(props.theme, defaultTheme);

    return css`
      font-size: ${defaultTheme.fontSize[props.size]};
      svg {
        height: ${defaultTheme.svgSize[props.size]};
        width: ${defaultTheme.svgSize[props.size]};
        fill: ${brandingTheme.primary};
      }
    `;
  }}
`;

const LoaderText = styled.span`
  padding: 10px 0;
`;

const LoaderTextDiv = styled.span`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

function Loader({ children, color = defaultTheme.gray, size = SIZE.large }) {
  return (
    <LoaderContainer size={size} color={color} className="sc-loader">
      <LoaderTextDiv>
        <LoaderIcon />
        <LoaderText> {children}</LoaderText>
      </LoaderTextDiv>
    </LoaderContainer>
  );
}

Loader.propTypes = {
  size: PropTypes.oneOf(Object.values(SIZE))
};

export default Loader;
