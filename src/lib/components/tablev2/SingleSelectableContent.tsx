import { memo, useEffect, useMemo, useRef } from 'react';
import { areEqual, FixedSizeList, ListChildComponentProps } from 'react-window';
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
import { TableRows, useTableScrollbar } from './TableCommon';
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
  children?: (rows: JSX.Element) => JSX.Element;
  autoScrollToSelected?: boolean;
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
  autoScrollToSelected = false,
}: SingleSelectableContentProps<DATA_ROW>) {
  if (selectedId && !onRowSelected) {
    console.error('Please specify the onRowSelected function.');
  }

  const { headerRef } = useSyncedScroll<DATA_ROW>();
  const listRef = useRef<FixedSizeList<Row<DATA_ROW>[]>>(null);
  const { headerGroups, prepareRow, rows, setRowHeight } =
    useTableContext<DATA_ROW>();

  useEffect(() => {
    setRowHeight(rowHeight);
  }, [rowHeight, setRowHeight]);

  useEffect(() => {
    if (!autoScrollToSelected || !selectedId || !listRef.current) return;

    const selectedIndex = rows.findIndex((row) => row.id === selectedId);
    if (selectedIndex < 0) return;

    const timer = setTimeout(() => {
      if (!listRef.current) return;
      listRef.current.scrollToItem(selectedIndex, 'center');
    }, 100);

    return () => clearTimeout(timer);
  }, [autoScrollToSelected, selectedId, rows]);

  /**
   * `prepareRow` and `onRowSelected` change identity on every render. We read them through refs
   * so the row renderer below can keep a stable identity (see RenderRow).
   */
  const prepareRowRef = useRef(prepareRow);
  prepareRowRef.current = prepareRow;
  const onRowSelectedRef = useRef(onRowSelected);
  onRowSelectedRef.current = onRowSelected;

  /**
   * RenderRow MUST keep a stable identity across re-renders. It used to be redefined inline on
   * every render, so react-window saw a new component type each time and remounted (not just
   * re-rendered) every row — and therefore every cell — whenever the table re-rendered for any
   * reason. That made async cell content reload and flash. We now read the row from react-window's
   * `data` (itemData) prop and the volatile callbacks from refs, so the component only needs to be
   * recreated when something that affects the rendered output (selectedId / separationLineVariant)
   * actually changes.
   */
  const RenderRow = useMemo(
    () =>
      memo(({ index, style, data }: ListChildComponentProps<Row<DATA_ROW>[]>) => {
        const row = data[index];
        prepareRowRef.current(row);
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
              const onRowSelected = onRowSelectedRef.current;
              if (onRowSelected) return onRowSelected(row);
            },
            tabIndex: onRowSelectedRef.current ? 0 : undefined,
            onKeyDown: (event) => {
              const onRowSelected = onRowSelectedRef.current;
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
      }, areEqual),
    [selectedId, separationLineVariant],
  );

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
          listRef={listRef}
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
