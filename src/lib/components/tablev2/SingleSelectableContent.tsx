import React, { useCallback, memo, CSSProperties } from 'react';
import { areEqual } from 'react-window';
import { Row } from 'react-table';

import { Tooltip } from '../tooltip/Tooltip.component';
import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';
import { useTableContext } from './Tablev2.component';
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
import {
  TableHeightKeyType,
  TableLocalType,
  TableVariantType,
  VirtualizedRows,
} from './TableUtils';

export type SingleSelectableContentProps = {
  rowHeight: TableHeightKeyType;
  separationLineVariant: TableVariantType;
  backgroundVariant: TableVariantType;
  onRowSelected?: (row: Row) => void;
  selectedId?: string;
  locale?: TableLocalType;
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

type RenderRowType = {
  index: number;
  style: CSSProperties;
};

export function SingleSelectableContent({
  rowHeight = 'h40',
  separationLineVariant = 'backgroundLevel3',
  backgroundVariant = 'backgroundLevel1',
  locale = 'en',
  selectedId,
  onRowSelected,
  customItemKey,
  children,
}: SingleSelectableContentProps) {
  const [hasScrollbar, setHasScrollbar] = React.useState(false);
  const [scrollBarWidth, setScrollBarWidth] = React.useState(0);

  if (selectedId && !onRowSelected) {
    console.error('Please specify the onRowSelected function.');
  }

  const { headerGroups, prepareRow, rows, onBottom, onBottomOffset } =
    useTableContext();
  const RenderRow = memo(({ index, style }: RenderRowType) => {
    const row = rows[index];
    prepareRow(row);
    let rowProps = row.getRowProps({
      /**
       * Note: We need to pass the style property to the row component.
       * Otherwise when we scroll down, the next rows are flashing
       * because they are re-rendered in loop.
       */
      style: { ...style },
    });

    rowProps = {
      ...rowProps,
      ...{
        onClick: () => {
          if (onRowSelected) return onRowSelected(row);
        },
      },
    };

    return (
      <TableRow
        {...rowProps}
        isSelected={row.isSelected}
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
              {(cell.column.Cell as { name: string | undefined }).name ===
                'defaultRenderer' && typeof cell.value === 'string' ? (
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
      node.appendChild(scrollDiv);
      const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
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
        {typeof children === 'function' ? (
          children(
            <VirtualizedRows
              rows={rows}
              itemKey={itemKey}
              rowHeight={rowHeight}
              setHasScrollbar={setHasScrollbar}
              onBottom={onBottom}
              onBottomOffset={onBottomOffset}
              RenderRow={RenderRow}
            />,
          )
        ) : rows.length ? (
          <VirtualizedRows
            rows={rows}
            itemKey={itemKey}
            rowHeight={rowHeight}
            setHasScrollbar={setHasScrollbar}
            onBottom={onBottom}
            onBottomOffset={onBottomOffset}
            RenderRow={RenderRow}
          />
        ) : (
          <NoResult>{translations[locale].noResult}</NoResult>
        )}
      </TableBody>
    </>
  );
}
