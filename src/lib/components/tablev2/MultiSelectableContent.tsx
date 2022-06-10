import { useEffect, memo, useCallback, useState, CSSProperties } from 'react';
import { Row } from 'react-table';
import { areEqual } from 'react-window';

import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';
import { Tooltip } from '../tooltip/Tooltip.component';
import { useTableContext } from './Tablev2.component';
import {
  HeadRow,
  NoResult,
  SortCaretWrapper,
  SortIncentive,
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
  VirtualizedRows,
} from './TableUtils';

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

type MultiSelectableContentProps = {
  onMultiSelectionChanged: (rows: Row<object>[]) => void;
  rowHeight?: TableHeightKeyType;
  separationLineVariant?: TableVariantType;
  backgroundVariant?: TableVariantType;
  locale?: TableLocalType;
  customItemKey?: (index: Number, data: any) => string;
  children?: (rows: JSX.Element) => JSX.Element;
};

export const MultiSelectableContent = ({
  onMultiSelectionChanged,
  rowHeight = 'h40',
  separationLineVariant = 'backgroundLevel3',
  backgroundVariant = 'backgroundLevel1',
  locale = 'en',
  customItemKey,
  children,
}: MultiSelectableContentProps) => {
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  const {
    headerGroups,
    prepareRow,
    rows,
    setHiddenColumns,
    selectedRowIds,
    onBottom,
    onBottomOffset,
    isAllRowsSelected,
  } = useTableContext();

  useEffect(() => {
    setHiddenColumns([]);
  }, [setHiddenColumns]);

  const itemKey = (index, data) => {
    if (typeof customItemKey === 'function') {
      return customItemKey(index, data);
    }
    return index;
  };

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
          >
            {headerGroup.headers.map((column) => {
              const headerStyleProps = column.getHeaderProps(
                Object.assign(column.getSortByToggleProps(), {
                  style: column?.cellStyle,
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
};
