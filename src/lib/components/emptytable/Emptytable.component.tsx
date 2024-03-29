// @ts-nocheck
import * as React from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';

// useDiv returns a div wrapper instead of tr more adapted to div based table (instead of tbody/thead/...)
type Props = {
  children: Node | React.ReactNode;
  useDiv?: boolean;
};
const EmptytableContainer = styled.tr`
  width: 100%;
  padding: ${spacing.r20};
  box-sizing: border-box;
  display: table;
  table-layout: fixed;

  ${(props) => {
    const brand = props.theme;
    return css`
      background: ${brand.backgroundLevel2};
      border-top: 1px solid ${brand.border};
    `;
  }}
`;
const EmptytableContainerDiv = styled.div`
  width: 100%;
  padding: ${spacing.r20};
  box-sizing: border-box;
  display: table;
  table-layout: fixed;

  ${(props) => {
    const brand = props.theme;
    return css`
      background: ${brand.backgroundLevel2};
      border-top: 1px solid ${brand.border};
    `;
  }}
`;
// Using !important as the only way to prioritize this over the general tr td styling that may be defined in the apps
const EmptytableContent = styled.td`
  text-align: center !important;
  border: none !important;
  ${(props) => {
    const brand = props.theme;
    return css`
      background: ${brand.backgroundLevel2};
      color: ${brand.textSecondary};
    `;
  }}
`;
const EmptytableContentDiv = styled.div`
  text-align: center !important;
  border: none !important;
  ${(props) => {
    const brand = props.theme;
    return css`
      background: ${brand.backgroundLevel2};
      color: ${brand.textSecondary};
    `;
  }}
`;

function EmptyTable(props: Props) {
  if (props.useDiv)
    return (
      <EmptytableContainerDiv className="sc-emptytable">
        <EmptytableContentDiv>{props.children}</EmptytableContentDiv>
      </EmptytableContainerDiv>
    );
  return (
    <EmptytableContainer className="sc-emptytable">
      <EmptytableContent>{props.children}</EmptytableContent>
    </EmptytableContainer>
  );
}

export { EmptyTable };
