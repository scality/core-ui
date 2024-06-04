import styled, { css } from 'styled-components';
import {
  TableHeightKeyType,
  tableRowHeight,
  TableVariantType,
} from './TableUtils';
import { HeaderGroup } from 'react-table';
import { Icon } from '../icon/Icon.component';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';
import { spacing } from '../../spacing';
import { Box } from '../box/Box';

const borderSize = '4px';
export const SortIncentive = styled.span`
  position: absolute;
  display: none;
`;
export const SortCaretWrapper = styled.span`
  padding-left: ${spacing.r4};
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
  separationLineVariant: TableVariantType;
};

export const HeadRow = styled.div<HeadRowType>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: ${spacing.r16};
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
  border-bottom: 1px solid
    ${(props) => props.theme[props.separationLineVariant]};
  padding-right: ${borderSize};
  padding-left: ${spacing.r16};
`;

type TableRowType = {
  isSelected: boolean;
  selectedId?: string;
  separationLineVariant: TableVariantType;
};
export const TableRow = styled.div<TableRowType>`
  color: ${(props) => props.theme.textPrimary};
  gap: ${spacing.r16};
  border-bottom: 1px solid
    ${(props) => props.theme[props.separationLineVariant]};
  cursor: default;
  box-sizing: border-box;
  padding-left: ${spacing.r16};
  padding-right: ${borderSize};

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
    }
  }}
`;

type TableRowMultiSelectableType = {
  isSelected: boolean;
  separationLineVariant: TableVariantType;
};
export const TableRowMultiSelectable = styled.div<TableRowMultiSelectableType>`
  color: ${(props) => props.theme.textPrimary};
  border-bottom: 1px solid
    ${(props) => props.theme[props.separationLineVariant]};
  box-sizing: border-box;
  ${(props) => {
    if (props.isSelected) {
      return css`
        background-color: ${(props) => props.theme.highlight};
        border-right: ${borderSize} solid ${props.theme.selectedActive};
      `;
    }
  }}
  padding-right: ${borderSize};
  padding-left: ${spacing.r16};
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.highlight};
    outline: none;
    cursor: pointer;
  }
`;

export const TableBody = styled.div`
  box-sizing: border-box;
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

export const NoResult = styled(Box)<{ rowHeight: TableHeightKeyType }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textSecondary};
  height: ${(props) => tableRowHeight[props.rowHeight]}rem;
  gap: ${spacing.r8};
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
