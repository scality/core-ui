import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";
import { Loader as SemanticUILoader } from "semantic-ui-react";

import { LOADER_SIZE as SIZE } from "../constants";
import { ReactComponent as LoaderIcon } from "../../icons/svg/scality-loading.svg";

import { gray, svgMd, svgLg, svgSm } from "../../style/theme";

const LoaderContainer = styled.div`
  ${props => {
    switch (props.size) {
      case SIZE.small:
        return css`
          svg {
            height: ${svgSm};
            width: ${svgSm};
            fill: ${props.color};
          }
        `;
      case SIZE.large:
        return css`
          svg {
            height: ${svgLg};
            width: ${svgLg};
            fill: ${props.color};
          }
        `;
      default:
        return css`
          svg {
            height: ${svgMd};
            width: ${svgMd};
            fill: ${props.color};
          }
        `;
    }
  }}
`;

const SemanticUILoaderContainer = styled.div`
  ${props => {
    return css`
      .ui.loader:after {
        border-color: ${props.color} transparent transparent;
      }
    `;
  }}
`;

SemanticUILoaderContainer;
function Loader({ color = gray, customized, size = SIZE.medium }) {
  return customized ? (
    <LoaderContainer size={size} color={color}>
      <LoaderIcon />
    </LoaderContainer>
  ) : (
    <SemanticUILoaderContainer color={color}>
      <SemanticUILoader active inline size={size} />
    </SemanticUILoaderContainer>
  );
}

Loader.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  customized: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(SIZE))
};

export default Loader;
