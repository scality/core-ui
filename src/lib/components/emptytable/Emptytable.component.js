//@flow
import * as React from "react";
import styled, { css } from "styled-components";
import * as defaultTheme from "../../style/theme";
import { getTheme } from "../../utils";

type Props = {
  children: Node | React.Node,
};

const EmptytableContainer = styled.tr`
  width: 100%;
  padding: ${defaultTheme.padding.large};
  box-sizing: border-box;
  display: table;
  table-layout: fixed;

  ${(props) => {
    const brand = getTheme(props);
    return css`
      background: ${brand.primary};
      border-top: 1px solid ${brand.border};
    `;
  }}
`;

const EmptytableContent = styled.td`
  // Using !important as the only way to prioritize this over the general tr td styling that may be defined in the apps
  text-align: center !important;
  border: none !important;
  ${(props) => {
    const brand = getTheme(props);
    return css`
      background: ${brand.primary};
      color: ${brand.textSecondary};
    `;
  }}
`;

function Emptytable(props: Props) {
  return (
    <EmptytableContainer className="sc-emptytable">
      <EmptytableContent>{props.children}</EmptytableContent>
    </EmptytableContainer>
  );
}

export default Emptytable;
