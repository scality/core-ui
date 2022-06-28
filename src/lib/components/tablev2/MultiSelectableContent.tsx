import { useEffect, memo, CSSProperties, useRef } from 'react';
import { Row } from 'react-table';
import { areEqual, FixedSizeList } from 'react-window';

import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';
import { Tooltip } from '../tooltip/Tooltip.component';
import { useTableContext } from './Tablev2.component';
import {
  HeadRow,
  NoResult,
  SortCaret,
  TableBody,
  TableHeader,
  TableRowMultiSelectable,
  TooltipContent,
  UnknownIcon,
} from './Tablestyle';
import {
  TableHeightKeyType,
  TableLocalType,
  TableVariantType,
} from './TableUtils';
import { useTableScrollbar, VirtualizedRows } from './TableCommon';

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

type MultiSelectableContentProps<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
> = {
  onMultiSelectionChanged: (rows: Row<DATA_ROW>[]) => void;
  rowHeight?: TableHeightKeyType;
  separationLineVariant?: TableVariantType;
  backgroundVariant?: TableVariantType;
  locale?: TableLocalType;
  customItemKey?: (index: number, data: DATA_ROW) => string;
  hasScrollbar?: boolean;
  children?: (rows: JSX.Element) => JSX.Element;
};

/**
 * FIXME Need to spend time to change the type to something like this
 */

// type MultiSelectableContentProps<ENTRY extends Record<string, any>> = {
//   onMultiSelectionChanged: (rows: Row<ENTRY>[]) => void;
//   rowHeight?: TableHeightKeyType;
//   separationLineVariant?: TableVariantType;
//   backgroundVariant?: TableVariantType;
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
  rowHeight = 'h40',
  separationLineVariant = 'backgroundLevel3',
  backgroundVariant = 'backgroundLevel1',
  locale = 'en',
  customItemKey,
  children,
}: MultiSelectableContentProps<DATA_ROW>) => {
  const {
    headerGroups,
    prepareRow,
    rows,
    setHiddenColumns,
    selectedRowIds,
    onBottom,
    onBottomOffset,
    isAllRowsSelected,
  } = useTableContext<DATA_ROW>();

  useEffect(() => {
    setHiddenColumns((oldHiddenColumns) => {
      return oldHiddenColumns.filter((column) => column !== 'selection');
    });
  }, [setHiddenColumns]);

  const {
    hasScrollbar,
    setHasScrollbar,
    scrollBarWidth,
    handleScrollbarWidth,
  } = useTableScrollbar();

  const itemKey = (index, data) => {
    if (typeof customItemKey === 'function') {
      return customItemKey(index, data);
    }
    return index;
  };

  const headerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<FixedSizeList<Row<DATA_ROW>[]> | null>(null);
  const currentHeadRef = !!headerRef.current;
  const currentBodyRef = !!bodyRef.current;
  useEffect(() => {
    if (bodyRef.current && headerRef.current) {
      const listener = (event: Event) => {
        headerRef.current.scrollTo({
          left: (event.target as HTMLDivElement).scrollLeft,
          top: 0,
        });
      };
      /*
      We intentionally use _outerRef prop here despite the fact that it is 
      internal use only and not typed, as it is the only way for us to access to the scrollable element
      */
      //@ts-expect-error
      (bodyRef.current._outerRef as HTMLDivElement).addEventListener(
        'scroll',
        listener,
      );
      return () => {
        //@ts-expect-error
        bodyRef.current._outerRef.removeEventListener('scroll', listener);
      };
    }
  }, [currentHeadRef, currentBodyRef]);

  const RenderRow = memo(({ index, style }: RenderRowType) => {
    const row = rows[index];
    prepareRow(row);

    let rowProps = row.getRowProps({
      /**
       * Note:We need to pass the style property to the row component.
       * Otherwise when we scroll down, the next rows are flashing
       * because they are re-rendered in loop.
       */
      style: { ...style },
    });

    rowProps = {
      ...rowProps,
      ...{
        onClick: () => {
          let selectedRows = [];
          if (row.isSelected) {
            // we remove the item from the list
            if (onMultiSelectionChanged) {
              let keys = Object.keys(selectedRowIds);
              selectedRows = rows.filter(
                (row) => keys.includes(row.id) && rows[index].id !== row.id,
              );
              onMultiSelectionChanged(selectedRows);
            }
          } else {
            // we add the new item from the list
            let keys = Object.keys(selectedRowIds);
            selectedRows = rows.filter((row) => keys.includes(row.id));
            selectedRows = [...selectedRows, rows[index]];
            onMultiSelectionChanged(selectedRows);
          }
          row.toggleRowSelected(!row.isSelected);
        },
      },
    };

    return (
      <TableRowMultiSelectable
        {...rowProps}
        isSelected={row.isSelected}
        separationLineVariant={separationLineVariant}
        backgroundVariant={backgroundVariant}
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

          if (cell.column.id === 'selection') {
            return <div {...cellProps}>{cell.render('Cell')}</div>;
          }

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
              {/**
               * react-table use function called `defaultRenderer` as
               * default render.
               * We use the name of the function to differentiate default
               * implementation to our override in the column
               */}
              {(cell.column.Cell as { name: string | undefined }).name ===
                'defaultRenderer' && typeof cell.value === 'string' ? (
                <ConstrainedText text={cell.value} />
              ) : (
                cell.render('Cell')
              )}
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
            ref={headerRef}
          >
            {headerGroup.headers.map((column) => {
              const headerStyleProps = column.getHeaderProps(
                Object.assign(column.getSortByToggleProps(), {
                  style: { ...column?.cellStyle, position: 'relative' },
                }),
              );

              return (
                <TableHeader {...headerStyleProps} role="columnheader">
                  <div>
                    {column.id === 'selection' ? (
                      <div
                        onClick={() => {
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
        {typeof children === 'function' ? (
          children(
            <VirtualizedRows
              rows={rows}
              listRef={(node) => {
                bodyRef.current = node;
              }}
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
            listRef={(node) => {
              bodyRef.current = node;
            }}
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
};
