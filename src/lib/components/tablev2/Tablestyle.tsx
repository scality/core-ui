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
// The caret's whole footprint: the glyph plus the gap that keeps it off the label.
const caretSpace = spacing.r20;

/** Hidden until the header is hovered — see `TableHeader`. */
export const SortIncentive = styled.span`
  display: none;
  align-items: center;
`;

/**
 * The caret carries its own width, in flow, so nothing else has to reserve room
 * on its behalf: one value describes the footprint, and a sortable header's
 * intrinsic width already includes it.
 *
 * Being a flex item is what keeps the glyph beside the label rather than
 * stranded at the column's far edge, and lets `order` move it to the label's
 * other side. `flex: none` stops a shrinking column squeezing it, so the label
 * stays the element that runs out of room.
 *
 * The width is unconditional because the glyph is not: `SortIncentive` appears
 * only on hover, and a reserve that came and went with it would shift the
 * header out from under the pointer.
 */
export const SortCaretWrapper = styled.span`
  flex: none;
  width: ${caretSpace};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

/** Ellipsize rather than let a long header outgrow its column. */
export const HeaderLabel = styled.span`
  min-width: 0;
  /* overflow and text-overflow do nothing on an inline box, and a span is
     inline by default. This used to be supplied for free by being a flex item
     (flex blockifies its children), so the ellipsis silently disappeared the
     moment the label was wrapped in anything. Stated outright so it no longer
     depends on the parent's display. */
  display: block;
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

    return css`
      justify-content: ${
        isEnd ? 'flex-end' : isCenter ? 'center' : 'flex-start'
      };

      ${
        $sortable &&
        isEnd &&
        css`
          /* An end-aligned label has to stay flush with the trailing edge to line
           up with the values below it, which leaves no room after it. */
          ${SortCaretWrapper} {
            order: -1;
          }
        `
      }

      ${
        $sortable &&
        isCenter &&
        css`
          /* Flex centres label-plus-caret, which leaves the label itself half a
           caret off centre. One caret width of leading padding corrects that
           exactly — padding shrinks the box the content is centred in, so half
           of it is absorbed. Capped as a share of the header so a column too
           narrow to afford the correction spends its width on the label
           instead: it drifts off centre rather than truncating sooner. */
          padding-inline-start: min(${caretSpace}, 15%);
        `
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
  /**
   * Whether the row can be selected at all — i.e. the content was given an
   * `onRowSelected`. Not "something is currently selected": gating the hover
   * affordance on that left a selectable table looking inert until its first
   * click, with no pointer cursor to invite one.
   */
  $selectable?: boolean;
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
    if (props.$selectable) {
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
    if (props.$isSelected) {
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
