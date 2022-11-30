//@ts-nocheck --- Check why our react-table typing overrides are not taken in account
import { memo, CSSProperties, useEffect } from 'react';
import { areEqual } from 'react-window';
import { Row } from 'react-table';
import { useTableContext } from './Tablev2.component';
import {
  HeadRow,
  TableRow,
  TableBody,
  TableHeader,
  NoResult,
  SortCaret,
} from './Tablestyle';
import {
  TableHeightKeyType,
  TableLocalType,
  TableVariantType,
} from './TableUtils';
import { useTableScrollbar, VirtualizedRows } from './TableCommon';
import useSyncedScroll from './useSyncedScroll';

export type SingleSelectableContentProps<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
> = {
  rowHeight: TableHeightKeyType;
  separationLineVariant: TableVariantType;
  backgroundVariant: TableVariantType;
  onRowSelected?: (row: Row<DATA_ROW>) => void;
  selectedId?: string;
  locale?: TableLocalType;
  customItemKey?: (index: Number, data: DATA_ROW) => string;
  isLoading?: boolean;
  hasScrollbar?: boolean;
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

export function SingleSelectableContent<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>({
  rowHeight = 'h40',
  separationLineVariant = 'backgroundLevel3',
  backgroundVariant = 'backgroundLevel1',
  locale = 'en',
  selectedId,
  onRowSelected,
  customItemKey,
  children,
}: SingleSelectableContentProps<DATA_ROW>) {
  if (selectedId && !onRowSelected) {
    console.error('Please specify the onRowSelected function.');
  }

  const { bodyRef, headerRef } = useSyncedScroll<DATA_ROW>();
  const {
    headerGroups,
    prepareRow,
    rows,
    onBottom,
    onBottomOffset,
    setRowHeight,
  } = useTableContext<DATA_ROW>();

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
      },
    };

    return (
      <TableRow
        {...rowProps}
        isSelected={selectedId === row.id}
        aria-selected={selectedId === row.id ? 'true' : 'false'}
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

          return (
            <div {...cellProps} className="td">
              {cell.render('Cell')}
            </div>
          );
        })}
      </TableRow>
    );
  }, areEqual);

  const {
    hasScrollbar,
    setHasScrollbar,
    scrollBarWidth,
    handleScrollbarWidth,
  } = useTableScrollbar();

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
            ref={headerRef}
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
                <TableHeader {...headerStyleProps} role="columnheader">
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
        {typeof children === 'function' ? (
          children(
            <VirtualizedRows
              rows={rows}
              listRef={bodyRef}
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
            listRef={bodyRef}
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
