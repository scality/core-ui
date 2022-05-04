import React, { useCallback, memo } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, areEqual } from 'react-window';
import { Row } from 'react-table';

import {
  HeadRow,
  TableRow,
  TableBody,
  TableHeader,
  SortCaretWrapper,
  SortIncentive,
  TooltipContent,
  UnknownIcon,
  NoResult,
} from './Tablestyle';
import { useTableContext } from './Tablev2.component';
import { convertRemToPixels } from './TableUtil';

import Tooltip from '../tooltip/Tooltip.component';
import ConstrainedText from '../constrainedtext/Constrainedtext.component';
export const tableRowHeight = {
  // in rem unit
  h32: '2.286',
  h40: '2.858',
  h48: '3.428',
  h64: '4.572',
};
export type SingleSelectableContentProps = {
  rowHeight: 'h32' | 'h40' | 'h48' | 'h64';
  separationLineVariant:
    | 'backgroundLevel1'
    | 'backgroundLevel2'
    | 'backgroundLevel3'
    | 'backgroundLevel4';
  backgroundVariant:
    | 'backgroundLevel1'
    | 'backgroundLevel2'
    | 'backgroundLevel3'
    | 'backgroundLevel4';
  selectedId?: string;
  onRowSelected?: (row: Row) => void;
  locale?: 'en' | 'fr';
  customItemKey?: (index: Number, data: any) => string;
  isLoading?: boolean;
  children?: (rows: JSX.Element) => JSX.Element;
};
const translations = {
  en: {
    noResult: 'No results found',
  },
  fr: {
    noResult: `Aucun résultat`,
  },
};
export function SingleSelectableContent({
  rowHeight,
  separationLineVariant,
  backgroundVariant,
  selectedId,
  onRowSelected,
  locale = 'en',
  customItemKey,
  isLoading = false,
  children,
}: SingleSelectableContentProps) {
  const [hasScrollbar, setHasScrollbar] = React.useState(false);
  const [scrollBarWidth, setScrollBarWidth] = React.useState(0);

  if (!['h32', 'h40', 'h48', 'h64'].includes(rowHeight)) {
    console.error(
      `Invalid rowHeight props, expected h32, h40, h48, or h64 but received ${rowHeight}`,
    );
  }

  if (
    ![
      'backgroundLevel1',
      'backgroundLevel2',
      'backgroundLevel3',
      'backgroundLevel4',
    ].includes(separationLineVariant)
  ) {
    console.error(
      `Invalid separationLineVariant props, expected backgroundLevel1, backgroundLevel2, backgroundLevel3 or backgroundLevel4 but received ${separationLineVariant}`,
    );
  }

  if (selectedId && !onRowSelected) {
    console.error('Please specify the onRowSelected function.');
  }

  const {
    headerGroups,
    prepareRow,
    rows,
    onBottom,
    onBottomOffset,
  } = useTableContext();
  const RenderRow = memo(({ index, style }) => {
    const row = rows[index];
    prepareRow(row);
    return (
      <TableRow
        {...row.getRowProps({
          /* Note:
        We need to pass the style property to the row component.
        Otherwise when we scroll down, the next rows are flashing because they are re-rendered in loop. */
          style: { ...style },
          onClick: () => {
            if (onRowSelected) return onRowSelected(row);
          },
        })}
        row={row}
        separationLineVariant={separationLineVariant}
        backgroundVariant={backgroundVariant}
        selectedId={selectedId}
        className="tr"
      >
        {row.cells.map((cell) => {
          let cellProps = cell.getCellProps({
            style: {
              ...cell.column.cellStyle,
              // Vertically center the text in cells.
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            },
            role: 'gridcell',
          });

          if (cell.value === undefined) {
            return (
              <div {...cellProps} className="td">
                <Tooltip overlay={<TooltipContent>unknown</TooltipContent>}>
                  <UnknownIcon className="fas fa-minus"></UnknownIcon>
                </Tooltip>
              </div>
            );
          }

          return (
            <div {...cellProps} className="td">
              {cell.column.Cell.name === 'defaultRenderer' &&
              typeof cell.value === 'string' ? (
                <ConstrainedText text={cell.value} />
              ) : (
                cell.render('Cell')
              )}
            </div>
          );
        })}
      </TableRow>
    );
  }, areEqual);
  const handleScrollbarWidth = useCallback((node) => {
    if (node) {
      const scrollDiv = document.createElement('div');
      scrollDiv.setAttribute(
        'style',
        'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;',
      );
      // $FlowFixMe
      node.appendChild(scrollDiv);
      const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      // $FlowFixMe
      node.removeChild(scrollDiv);
      setScrollBarWidth(scrollbarWidth);
    }
  }, []);

  function itemKey(index, data) {
    if (typeof customItemKey === 'function') {
      return customItemKey(index, data);
    }

    return index;
  }

  const Rows = () => (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <List
            height={height}
            itemCount={rows.length} // how many items we are going to render
            itemSize={convertRemToPixels(tableRowHeight[rowHeight])} // height of each row in pixel
            width={width}
            itemKey={itemKey}
            itemData={rows}
            onItemsRendered={({
              visibleStartIndex,
              visibleStopIndex,
              overscanStopIndex,
            }) => {
              setHasScrollbar(
                visibleStartIndex - visibleStopIndex <= overscanStopIndex,
              );

              if (
                overscanStopIndex >= rows.length - 1 - onBottomOffset &&
                typeof onBottom === 'function'
              ) {
                onBottom(rows.length);
              }
            }}
          >
            {RenderRow}
          </List>
        );
      }}
    </AutoSizer>
  );

  return (
    <>
      <div className="thead" role="rowgroup">
        {headerGroups.map((headerGroup) => (
          <HeadRow
            {...headerGroup.getHeaderGroupProps()}
            hasScrollBar={hasScrollbar}
            scrollBarWidth={scrollBarWidth}
          >
            {headerGroup.headers.map((column) => {
              const headerStyleProps = column.getHeaderProps(
                Object.assign(column.getSortByToggleProps(), {
                  style: column.cellStyle,
                }),
              );
              return (
                <TableHeader {...headerStyleProps} role="columnheader">
                  <div>
                    {column.render('Header')}
                    {!column.disableSortBy ? (
                      <SortCaretWrapper>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="fas fa-sort-down" />
                          ) : (
                            <i className="fas fa-sort-up" />
                          )
                        ) : (
                          <SortIncentive>
                            <i className="fas fa-sort" />
                          </SortIncentive>
                        )}
                      </SortCaretWrapper>
                    ) : null}
                  </div>
                </TableHeader>
              );
            })}
          </HeadRow>
        ))}
      </div>
      <TableBody role="rowgroup" className="tbody" ref={handleScrollbarWidth}>
        {typeof children === 'function' ? ( // $FlowFixMe
          children(Rows)
        ) : rows.length ? (
          <Rows />
        ) : (
          <NoResult>{translations[locale].noResult}</NoResult>
        )}
      </TableBody>
    </>
  );
}
export default SingleSelectableContent;
