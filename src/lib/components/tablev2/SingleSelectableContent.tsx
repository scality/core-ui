import React, { memo, useEffect } from 'react';
import { areEqual } from 'react-window';
import { Row } from 'react-table';
import { useTableContext } from './Tablev2.component';
import {
  HeadRow,
  TableRow,
  TableBody,
  TableHeader,
  SortCaret,
} from './Tablestyle';
import {
  TableHeightKeyType,
  TableLocalType,
  TableVariantType,
} from './TableUtils';
import { RenderRowType, TableRows, useTableScrollbar } from './TableCommon';
import useSyncedScroll from './useSyncedScroll';
import { Loader } from '../loader/Loader.component';
import { Box } from '../box/Box';
import { spacing } from '../../spacing';

export type SingleSelectableContentProps<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
> = {
  rowHeight: TableHeightKeyType;
  separationLineVariant: TableVariantType;

  onRowSelected?: (row: Row<DATA_ROW>) => void;
  selectedId?: string;
  locale?: TableLocalType;
  customItemKey?: (index: number, data: DATA_ROW) => string;
  hasScrollbar?: boolean;
  isLoadingMoreItems?: boolean;
  children?: (rows: React.JSX.Element) => React.JSX.Element;
};

export function SingleSelectableContent<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>({
  rowHeight = 'h40',
  separationLineVariant = 'backgroundLevel3',

  locale = 'en',
  selectedId,
  isLoadingMoreItems,
  onRowSelected,
  customItemKey,
  children,
}: SingleSelectableContentProps<DATA_ROW>) {
  if (selectedId && !onRowSelected) {
    console.error('Please specify the onRowSelected function.');
  }

  const { headerRef } = useSyncedScroll<DATA_ROW>();
  const { headerGroups, prepareRow, rows, setRowHeight } =
    useTableContext<DATA_ROW>();

  useEffect(() => {
    setRowHeight(rowHeight);
  }, [rowHeight, setRowHeight]);

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
        tabIndex: onRowSelected ? 0 : undefined,
        onKeyDown: (event) => {
          if (
            onRowSelected &&
            (event.key === ' ' ||
              event.key === 'Enter' ||
              event.key === 'Spacebar')
          ) {
            event.preventDefault();
            onRowSelected(row);
          }
        },
      },
    };

    return (
      <TableRow
        {...rowProps}
        isSelected={selectedId === row.id}
        aria-selected={selectedId === row.id ? 'true' : 'false'}
        separationLineVariant={separationLineVariant}
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

          return (
            <div {...cellProps} className="td">
              {cell.render('Cell')}
            </div>
          );
        })}
      </TableRow>
    );
  }, areEqual);

  const { hasScrollbar, scrollBarWidth, handleScrollbarWidth } =
    useTableScrollbar();

  return (
    <>
      <div className="thead" role="rowgroup">
        {headerGroups.map((headerGroup) => (
          <HeadRow
            {...headerGroup.getHeaderGroupProps()}
            ref={headerRef}
            separationLineVariant={separationLineVariant}
            hasScrollBar={hasScrollbar}
            scrollBarWidth={scrollBarWidth}
            rowHeight={rowHeight}
            style={{ overflow: 'hidden' }}
          >
            {headerGroup.headers.map((column) => {
              const headerStyleProps = column.getHeaderProps(
                Object.assign(column.getSortByToggleProps(), {
                  style: { ...column.cellStyle, position: 'relative' },
                }),
              );
              return (
                <TableHeader
                  {...headerStyleProps}
                  role="columnheader"
                  tabIndex={!column.disableSortBy ? 0 : undefined}
                  onKeyDown={(event) => {
                    if (
                      !column.disableSortBy &&
                      (event.key === ' ' ||
                        event.key === 'Enter' ||
                        event.key === 'Spacebar')
                    ) {
                      event.preventDefault();
                      // @ts-expect-error - getSortByToggleProps is joined to getHeaderProps
                      headerStyleProps.onClick(event);
                    }
                  }}
                >
                  <div>
                    {column.render('Header')}
                    <SortCaret column={column} />
                  </div>
                </TableHeader>
              );
            })}
          </HeadRow>
        ))}
      </div>
      <TableBody role="rowgroup" className="tbody" ref={handleScrollbarWidth}>
        <TableRows
          locale={locale}
          children={children}
          customItemKey={customItemKey}
          RenderRow={RenderRow}
        />
      </TableBody>
      {isLoadingMoreItems && (
        <Box
          display="flex"
          justifyContent="center"
          marginTop={spacing.r16}
          marginBottom={spacing.r16}
        >
          <Loader size="large" />
        </Box>
      )}
    </>
  );
}
