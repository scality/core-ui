import styled, { css } from 'styled-components';

import { spacing } from '../../style/theme';
import {
  TableHeightKeyType,
  tableRowHeight,
  TableVariantType,
} from './TableUtils';
import { HeaderGroup } from 'react-table';
import { Icon } from '../icon/Icon.component';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';

const borderSize = '4px';
export const SortIncentive = styled.span`
  position: absolute;
  display: none;
`;
export const SortCaretWrapper = styled.span`
  padding-left: ${spacing.sp4};
  position: absolute;
`;
export const TableHeader = styled.div<{
  headerHeight?: number | string;
  tabIndex: number | undefined;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${(props) => props.headerHeight};
  cursor: ${(props) =>
    props.tabIndex !== undefined && props.tabIndex >= 0
      ? 'pointer'
      : 'default'};
  &:hover {
    ${SortIncentive} {
      display: block;
    }
  }
  &:focus-visible {
    ${FocusVisibleStyle}
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
      ? `calc(100% - ${props.scrollBarWidth}px - ${borderSize} )!important` // -4px for border
      : `calc(100% - ${borderSize} ) !important`};
  height: ${(props) => tableRowHeight[props.rowHeight]}rem;
  table-layout: fixed;
  color: ${(props) => props.theme.textPrimary};
  font-weight: bold;
  overflow: hidden;
`;

type TableRowType = {
  isSelected: boolean;
  selectedId?: string;
  separationLineVariant: TableVariantType;
  backgroundVariant: TableVariantType;
};
export const TableRow = styled.div<TableRowType>`
  color: ${(props) => props.theme.textPrimary};
  border-top: 1px solid ${(props) => props.theme[props.separationLineVariant]};
  :last-child {
    border-bottom: 1px solid
      ${(props) => props.theme[props.separationLineVariant]};
  }
  cursor: default;
  box-sizing: border-box;

  // single selectable case
  ${(props) => {
    if (props.selectedId) {
      return css`
        &:hover,
        &:focus {
          background-color: ${(props) => props.theme.highlight};
          outline: none;
          cursor: pointer;
        }
        &:focus-visible {
          ${FocusVisibleStyle}
        }
      `;
    }
  }}

  ${(props) => {
    if (props.selectedId && props.isSelected) {
      return css`
        background-color: ${props.theme.highlight};
        border-right: ${borderSize} solid ${props.theme.selectedActive};
      `;
    } else {
      const color = props.theme[props.backgroundVariant];
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
  color: ${(props) => props.theme.textPrimary};
  border-top: 1px solid ${(props) => props.theme[props.separationLineVariant]};
  :last-child {
    border-bottom: 1px solid
      ${(props) => props.theme[props.separationLineVariant]};
  }

  box-sizing: border-box;

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.highlight};
    outline: none;
    cursor: pointer;
  }

  ${(props) => {
    if (props.isSelected) {
      return css`
        background-color: ${(props) => props.theme.highlight};
        border-right: ${borderSize} solid ${props.theme.selectedActive};
      `;
    } else {
      const color = props.theme[props.backgroundVariant];
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
  color: ${(props) => props.theme.textSecondary};
  font-weight: bold;
  min-width: 60px;
`;

export const NoResult = styled.div`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.textSecondary};
  padding-top: ${spacing.sp8};
  border-top: 1px solid ${(props) => props.theme.backgroundLevel3};
`;

export const SortCaret = <
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>({
  column,
}: {
  column: HeaderGroup<DATA_ROW>;
}) => {
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
