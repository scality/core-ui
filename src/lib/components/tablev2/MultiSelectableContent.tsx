import { useEffect, memo, CSSProperties } from 'react';
import { Row } from 'react-table';
import { areEqual } from 'react-window';
import { useTableContext } from './Tablev2.component';
import {
  HeadRow,
  SortCaret,
  TableBody,
  TableHeader,
  TableRowMultiSelectable,
} from './Tablestyle';
import {
  TableHeightKeyType,
  TableLocalType,
  TableVariantType,
} from './TableUtils';
import { RenderRowType, TableRows, useTableScrollbar } from './TableCommon';
import useSyncedScroll from './useSyncedScroll';
import { Box } from '../box/Box';
import { Loader } from '../loader/Loader.component';
import { spacing } from '../../spacing';

type MultiSelectableContentProps<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
> = {
  onMultiSelectionChanged?: (rows: Row<DATA_ROW>[]) => void;
  onSingleRowSelected?: (row: Row<DATA_ROW>) => void;
  onToggleAll?: (selected: boolean) => void;
  rowHeight?: TableHeightKeyType;
  separationLineVariant?: TableVariantType;

  locale?: TableLocalType;
  customItemKey?: (index: number, data: DATA_ROW) => string;
  hasScrollbar?: boolean;
  isLoadingMoreItems?: boolean;
  children?: (rows: JSX.Element) => JSX.Element;
};

/**
 * FIXME Need to spend time to change the type to something like this
 */

// type MultiSelectableContentProps<ENTRY extends Record<string, any>> = {
//   onMultiSelectionChanged: (rows: Row<ENTRY>[]) => void;
//   rowHeight?: TableHeightKeyType;
//   separationLineVariant?: TableVariantType;
//   customItemKey?: (index: Number, data: ENTRY) => string;
// } & ({
//   locale: TableLocalType;
// } | {
//   children: (rows: JSX.Element) => JSX.Element;
//   });

export const MultiSelectableContent = <
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>({
  onMultiSelectionChanged,
  onSingleRowSelected,
  onToggleAll,
  rowHeight = 'h40',
  separationLineVariant = 'backgroundLevel3',

  locale = 'en',
  customItemKey,
  isLoadingMoreItems,
  children,
}: MultiSelectableContentProps<DATA_ROW>) => {
  const {
    headerGroups,
    prepareRow,
    rows,
    setRowHeight,
    setHiddenColumns,
    selectedRowIds,
    isAllRowsSelected,
    toggleAllRowsSelected,
  } = useTableContext<DATA_ROW>();

  useEffect(() => {
    setRowHeight(rowHeight);
  }, [rowHeight, setRowHeight]);

  useEffect(() => {
    setHiddenColumns((oldHiddenColumns) => {
      return oldHiddenColumns.filter((column) => column !== 'selection');
    });
  }, [setHiddenColumns]);

  const handleMultipleSelectedRows = (
    selectedRowIds,
    rows,
    currentRow,
    currentRowIndex,
  ) => {
    const keys = Object.keys(selectedRowIds);

    if (onMultiSelectionChanged) {
      if (currentRow.isSelected) {
        // we remove the item from the list
        onMultiSelectionChanged(
          rows.filter(
            (row) =>
              keys.includes(row.id) && rows[currentRowIndex].id !== row.id,
          ),
        );
      } else {
        // we add the new item from the list
        onMultiSelectionChanged([
          ...rows.filter((row) => keys.includes(row.id)),
          rows[currentRowIndex],
        ]);
      }
    }
    currentRow.toggleRowSelected(!currentRow.isSelected);
  };

  const { hasScrollbar, scrollBarWidth, handleScrollbarWidth } =
    useTableScrollbar();

  const { headerRef } = useSyncedScroll<DATA_ROW>();

  const RenderRow = memo(({ index, style }: RenderRowType) => {
    const row = rows[index];
    prepareRow(row);

    const rowProps = {
      ...row.getRowProps({
        /**
         * Note:We need to pass the style property to the row component.
         * Otherwise when we scroll down, the next rows are flashing
         * because they are re-rendered in loop.
         */
        style: { ...style },
      }),
      onClick: onSingleRowSelected
        ? () => {
            onSingleRowSelected(row);
            toggleAllRowsSelected(false);
            row.toggleRowSelected(true);
          }
        : () => handleMultipleSelectedRows(selectedRowIds, rows, row, index),
    };

    return (
      <TableRowMultiSelectable
        {...rowProps}
        isSelected={row.isSelected}
        separationLineVariant={separationLineVariant}
        className="tr"
      >
        {row.cells.map((cell) => {
          const cellProps = cell.getCellProps({
            style: {
              ...cell.column.cellStyle,
              // Vertically center the text in cells.
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            },
            role: 'gridcell',
          });

          if (cell.column.id === 'selection') {
            return (
              <div
                {...cellProps}
                onClick={
                  onSingleRowSelected
                    ? (event) => {
                        event.stopPropagation();
                        handleMultipleSelectedRows(
                          selectedRowIds,
                          rows,
                          row,
                          index,
                        );
                      }
                    : undefined
                }
              >
                {cell.render('Cell')}
              </div>
            );
          }

          return (
            <div {...cellProps} className="td">
              {cell.render('Cell')}
            </div>
          );
        })}
      </TableRowMultiSelectable>
    );
  }, areEqual);

  return (
    <>
      <div>
        {headerGroups.map((headerGroup) => (
          <HeadRow
            {...headerGroup.getHeaderGroupProps()}
            hasScrollBar={hasScrollbar}
            scrollBarWidth={scrollBarWidth}
            rowHeight={rowHeight}
            separationLineVariant={separationLineVariant}
            ref={headerRef}
          >
            {headerGroup.headers.map((column) => {
              const headerStyleProps = column.getHeaderProps(
                Object.assign(column.getSortByToggleProps(), {
                  style: { ...column?.cellStyle, position: 'relative' },
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
                    {column.id === 'selection' ? (
                      <div
                        onClick={(event) => {
                          const eventTarget = event.target as HTMLInputElement;
                          if (onToggleAll) {
                            onToggleAll(eventTarget.checked);
                          }
                          if (onMultiSelectionChanged) {
                            if (isAllRowsSelected) {
                              onMultiSelectionChanged([]);
                            } else {
                              onMultiSelectionChanged(rows);
                            }
                          }
                        }}
                      >
                        {column.render('Header')}
                      </div>
                    ) : (
                      column.render('Header')
                    )}
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
};
