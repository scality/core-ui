import styled, { css } from 'styled-components';
import type { CSSProperties } from 'react';
import {
  TableHeightKeyType,
  tableRowHeight,
  TableVariantType,
} from './TableUtils';
import { HeaderGroup } from 'react-table';
import { Icon } from '../icon/Icon.component';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';
import { spacing } from '../../spacing';

const borderSize = '4px';
const caretGlyphSize = spacing.r16;
const caretGutter = spacing.r4;
// The room HeaderContent reserves so the glyph never overflows its header.
const caretSpace = spacing.r20;

export const SortIncentive = styled.span`
  position: absolute;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
`;

/** The painted glyph, out of flow inside the zero-width anchor below. */
export const SortCaretGlyph = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  width: ${caretGlyphSize};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

/**
 * A zero-width flex item. Being a real flex item is what keeps the glyph next to
 * the label (and lets `order` move it to the label's other side) — anchoring it
 * to `HeaderContent`'s edge instead would strand it at the far side of a wide
 * column. Being zero-width is what keeps it out of the sizing equation: a caret
 * with real width lifts every sortable header's min-content 20px above the
 * matching body cell's, and the two rows then stop agreeing on column widths as
 * soon as that floor binds. `HeaderContent` reserves the room with padding.
 */
export const SortCaretWrapper = styled.span`
  position: relative;
  flex: none;
  width: 0;
  align-self: stretch;
`;

/** Ellipsize rather than let a long header outgrow its column. */
export const HeaderLabel = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HeaderContent = styled.div<{
  $align?: CSSProperties['textAlign'];
  $sortable?: boolean;
}>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;

  ${({ $align, $sortable }) => {
    const isEnd = $align === 'right' || $align === 'end';
    const isCenter = $align === 'center';
    const justify = isEnd ? 'flex-end' : isCenter ? 'center' : 'flex-start';

    if (!$sortable) {
      return css`
        justify-content: ${justify};
      `;
    }

    // End-aligned columns are the one case where the caret goes on the label's
    // start side: the label has to stay flush with the trailing edge or it no
    // longer lines up with the values below it, which leaves no room after it.
    if (isEnd) {
      return css`
        justify-content: flex-end;
        padding-inline-start: ${caretSpace};
        ${SortCaretWrapper} {
          order: -1;
        }
        ${SortCaretGlyph} {
          inset-inline-end: ${caretGutter};
        }
      `;
    }

    // Centred columns reserve both sides so the label stays centred.
    return css`
      justify-content: ${justify};
      ${isCenter
        ? css`
            padding-inline: ${caretSpace};
          `
        : css`
            padding-inline-end: ${caretSpace};
          `}
      ${SortCaretGlyph} {
        inset-inline-start: ${caretGutter};
      }
    `;
  }}
`;
export const TableHeader = styled.div<{
  $headerHeight?: number | string;
  tabIndex: number | undefined;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* The header must never be the reason a column is wider than its cells. */
  min-width: 0;
  height: ${(props) => props.$headerHeight};
  cursor: ${(props) =>
    props.tabIndex !== undefined && props.tabIndex >= 0
      ? 'pointer'
      : 'default'};
  &:hover {
    ${SortIncentive} {
      display: flex;
    }
  }
  &:focus-visible {
    ${FocusVisibleStyle}
  }
`;

type HeadRowType = {
  $hasScrollBar?: boolean;
  $scrollBarWidth: number;
  $rowHeight: TableHeightKeyType;
  $separationLineVariant: TableVariantType;
};

export const HeadRow = styled.div<HeadRowType>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: ${spacing.r16};
  height: 2.286rem;
  width: ${(props) =>
    props.$hasScrollBar
      ? `calc(100% - ${props.$scrollBarWidth}px - ${borderSize} )!important` // -4px for border
      : `calc(100% - ${borderSize} ) !important`};
  height: ${(props) => tableRowHeight[props.$rowHeight]}rem;
  table-layout: fixed;
  color: ${(props) => props.theme.textPrimary};
  font-weight: bold;
  overflow: hidden;
  border-bottom: 1px solid
    ${(props) => props.theme[props.$separationLineVariant]};
  padding-left: ${spacing.r16};
`;

type TableRowType = {
  $isSelected: boolean;
  $selectedId?: string;
  $separationLineVariant: TableVariantType;
};
export const TableRow = styled.div<TableRowType>`
  color: ${(props) => props.theme.textPrimary};
  gap: ${spacing.r16};
  border-bottom: 1px solid
    ${(props) => props.theme[props.$separationLineVariant]};
  cursor: default;
  box-sizing: border-box;
  padding-left: ${spacing.r16};
  padding-right: ${borderSize};

  // single selectable case
  ${(props) => {
    if (props.$selectedId) {
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
    if (props.$selectedId && props.$isSelected) {
      return css`
        background-color: ${props.theme.highlight};
        box-shadow: inset -${borderSize} 0 0 ${props.theme.selectedActive};
      `;
    }
  }}
`;

type TableRowMultiSelectableType = {
  $isSelected: boolean;
  $separationLineVariant: TableVariantType;
};
export const TableRowMultiSelectable = styled.div<TableRowMultiSelectableType>`
  color: ${(props) => props.theme.textPrimary};
  /* Must match HeadRow's gap. Every column track has a grow factor and no basis,
     so a gap the header reserves and the body does not is free space the body
     redistributes — shifting every boundary by grow-share × total gap, at any
     width. That is the header-not-over-its-value defect. */
  gap: ${spacing.r16};
  border-bottom: 1px solid
    ${(props) => props.theme[props.$separationLineVariant]};
  box-sizing: border-box;
  ${(props) => {
    if (props.$isSelected) {
      return css`
        background-color: ${(props) => props.theme.highlight};
        box-shadow: inset -${borderSize} 0 0 ${props.theme.selectedActive};
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

export const SortCaret = <
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>({
  column,
}: {
  column: HeaderGroup<DATA_ROW>;
}) => {
  return !column.disableSortBy ? (
    <SortCaretWrapper>
      <SortCaretGlyph>
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
      </SortCaretGlyph>
    </SortCaretWrapper>
  ) : null;
};
