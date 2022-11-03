import styled, { css } from 'styled-components';
import { getTheme } from '../../utils';
import { spacing } from '../../style/theme';
import {
  TableHeightKeyType,
  tableRowHeight,
  TableVariantType,
} from './TableUtils';
import { HeaderGroup } from 'react-table';
import { Icon } from '../icon/Icon.component';

const borderSize = '4px';
export const SortIncentive = styled.span`
  position: absolute;
  display: none;
`;
export const SortCaretWrapper = styled.span`
  padding-left: ${spacing.sp4};
  position: absolute;
`;
export const TableHeader = styled.div<{ headerHeight?: number | string }>`
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
  rowHeight: TableHeightKeyType;
};

export const HeadRow = styled.div<HeadRowType>`
  display: flex;
  align-items: center;
  height: 2.286rem;
  width: ${(props) =>
    props.hasScrollBar
      ? `calc(100% - ${props.scrollBarWidth}px - ${borderSize} )!important;` // -4px for border
      : `calc(100% - ${borderSize} ) !important;`}
  height: ${(props) => tableRowHeight[props.rowHeight]}rem;
  table-layout: fixed;
  cursor: pointer;
  color: ${(props) => getTheme(props).textPrimary};
  font-weight: bold;
  overflow: hidden;
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
        background-color: ${getTheme(props).highlight};
        border-right: ${borderSize} solid ${getTheme(props).selectedActive};
      `;
    } else {
      const color = getTheme(props)[props.backgroundVariant];
      return css`
        border-right: ${borderSize} solid ${color};
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
        border-right: ${borderSize} solid ${getTheme(props).selectedActive};
      `;
    } else {
      const color = getTheme(props)[props.backgroundVariant];
      return css`
        border-right: ${borderSize} solid ${color};
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
  width: 100%;
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
  display: flex;
  justify-content: center;
  color: ${(props) => getTheme(props).textSecondary};
  padding-top: ${spacing.sp8};
  border-top: 1px solid ${(props) => getTheme(props).backgroundLevel3};
`;

export const SortCaret = ({ column }: { column: HeaderGroup }) => {
  return !column.disableSortBy ? (
    <SortCaretWrapper>
      {column.isSorted ? (
        column.isSortedDesc ? (
          <Icon name="Sort-down" />
        ) : (
          <Icon name="Sort-up" />
        )
      ) : (
        <SortIncentive>
          <Icon name="Sort" />
        </SortIncentive>
      )}
    </SortCaretWrapper>
  ) : null;
};
