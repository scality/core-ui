// @flow
import React from "react";
import type { Node } from "react";
import styled, { css } from "styled-components";
import { ellipsis } from "polished";

import * as defaultTheme from "../../style/theme";
import { getThemeProp } from "../../utils";

type Props = {
  paths: Array<Node>
};

const BreadcrumbContainer = styled.ol`
  display: flex;
  list-style-type: none;
  padding: ${defaultTheme.padding.base};
  margin: 0;
`;
const BreadcrumbItem = styled.li`
  padding: ${defaultTheme.padding.smaller} ${defaultTheme.padding.base};
  box-sizing: border-box;
  height: 100%;
  font-size: ${defaultTheme.fontSize.larger};
  ${ellipsis("250px")}

  ${props => {
    const brandingTheme = getTheme(props);

    if (props.active) {
      const activeColor = brandingTheme.primary;
      return css`
        font-weight: ${defaultTheme.fontWeight.bold};
        a {
          color: ${activeColor};
        }
        color: ${activeColor};
        border-bottom: 2px solid ${activeColor};
      `;
    }
    const hoverColor = brandingTheme.primary;
    return css`
      a {
        text-decoration: none;
        color: ${brandingTheme.text};
      }
      color: ${brandingTheme.text};
      &:hover {
        a {
          color: ${hoverColor};
        }
        border-bottom: 2px solid ${hoverColor};
      }
    `;
  }}
`;
const BreadcrumbSeparator = styled.li`
  padding: ${defaultTheme.padding.smaller} ${defaultTheme.padding.base};
  color: ${defaultTheme.grayLight};
  display: flex;
  align-items: center;
  font-size: ${defaultTheme.fontSize.small};
`;

const withBreadcrumbSeparator = lastIndex => (acc, item, index) => {
  const notLast = index < lastIndex;
  return notLast
    ? [
        ...acc,
        item,
        <BreadcrumbSeparator
          key={`sc-breadcrumb_separator_${index}`}
          className="sc-breadcrumb_separator"
        >
          <i className="fas fa-chevron-right" />
        </BreadcrumbSeparator>
      ]
    : [...acc, item];
};

const Breadcrumb = ({ paths = [], ...rest }: Props) => {
  const lastIndex = paths.length - 1;
  const breadcrumbItems = paths
    .map((item, index) => {
      return (
        <BreadcrumbItem
          key={`sc-breadcrumb_item_${index}`}
          className="sc-breadcrumb_item"
          active={index === lastIndex}
        >
          {item}
        </BreadcrumbItem>
      );
    })
    .reduce(withBreadcrumbSeparator(lastIndex), []);
  return (
    <BreadcrumbContainer className="sc-breadcrumb" {...rest}>
      {breadcrumbItems}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
