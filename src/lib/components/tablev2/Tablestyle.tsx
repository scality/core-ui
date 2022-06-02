// @ts-nocheck
import styled, { css } from 'styled-components';
import { getTheme } from '../../utils';
import { spacing } from '../../style/theme';
import { TableVariantType } from './TableUtils';

const borderSize = '4px';
export const SortIncentive = styled.span`
  position: absolute;
  display: none;
`;
export const SortCaretWrapper = styled.span`
  padding-left: ${spacing.sp4};
  position: absolute;
`;
export const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${(props) => props.headerHeight};
  &:hover {
    ${SortIncentive} {
      display: block;
    }
  }
`;

type HeadRowType = {
  hasScrollBar: boolean;
  scrollBarWidth: number;
};

export const HeadRow = styled.div<HeadRowType>`
  height: 2.286rem;
  width: ${(props) =>
    props.hasScrollBar
      ? `calc(100% - ${props.scrollBarWidth}px - ${borderSize} )!important;` // -4px for border
      : '100% !important;'} 
  table-layout: fixed;
  cursor: pointer;
  color: ${(props) => getTheme(props).textPrimary};
  font-weight: bold;
`;

type TableRowType = {
  isSelected: boolean;
  selectedId: string;
  separationLineVariant: TableVariantType;
  backgroundVariant: TableVariantType;
};
export const TableRow = styled.div<TableRowType>`
  color: ${(props) => getTheme(props).textPrimary};
  border-top: 1px solid
    ${(props) => getTheme(props)[props.separationLineVariant]};
  :last-child {
    border-bottom: 1px solid
      ${(props) => getTheme(props)[props.separationLineVariant]};
  }
  cursor: default;
  box-sizing: border-box;

  // single selectable case
  ${(props) => {
    if (props.selectedId) {
      return css`
        &:hover,
        &:focus {
          background-color: ${(props) => getTheme(props).highlight};
          outline: none;
          cursor: pointer;
        }
      `;
    }
  }}

  ${(props) => {
    if (props.selectedId && props.isSelected) {
      return css`
        background-color: ${(props) => getTheme(props).highlight};
        border-right: ${borderSize} solid
          ${(props) => getTheme(props).selectedActive};
      `;
    } else {
      return css`
        border-right: ${borderSize} solid
          ${(props) => getTheme(props)[props.backgroundVariant]};
      `;
    }
  }}
`;

type TableRowMultiSelectableType = {
  isSelected: boolean;
  separationLineVariant: TableVariantType;
  backgroundVariant: TableVariantType;
};
export const TableRowMultiSelectable = styled.div<TableRowMultiSelectableType>`
  color: ${(props) => getTheme(props).textPrimary};
  border-top: 1px solid
    ${(props) => getTheme(props)[props.separationLineVariant]};
  :last-child {
    border-bottom: 1px solid
      ${(props) => getTheme(props)[props.separationLineVariant]};
  }

  box-sizing: border-box;

  &:hover,
  &:focus {
    background-color: ${(props) => getTheme(props).highlight};
    outline: none;
    cursor: pointer;
  }

  ${(props) => {
    if (props.isSelected) {
      return css`
        background-color: ${(props) => getTheme(props).highlight};
        border-right: ${borderSize} solid
          ${(props) => getTheme(props).selectedActive};
      `;
    } else {
      return css`
        border-right: ${borderSize} solid
          ${(props) => getTheme(props)[props.backgroundVariant]};
      `;
    }
  }}
`;

export const TableBody = styled.div`
  display: block;
  flex-grow: 1;
  height: 100%;
`;
export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const TooltipContent = styled.div`
  color: ${(props) => getTheme(props).textSecondary};
  font-weight: bold;
  min-width: 60px;
`;
export const UnknownIcon = styled.i`
  // Increase the height so that the users don't need to hover precisely on the hyphen.
  height: 70%;
`;
export const NoResult = styled.div`
  color: ${(props) => getTheme(props).textSecondary};
  padding-top: ${spacing.sp8};
  border-top: 1px solid ${(props) => getTheme(props).backgroundLevel3};
`;
