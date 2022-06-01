import {
  forwardRef,
  useRef,
  useEffect,
  memo,
  useCallback,
  useState,
} from 'react';
import { Row } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, areEqual } from 'react-window';
import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';
import { Tooltip } from '../tooltip/Tooltip.component';
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
import { convertRemToPixels } from './TableUtil';
import { useTableContext } from './Tablev2.component';

// duplicate
export const tableRowHeight = {
  // in rem unit
  h32: '2.286',
  h40: '2.858',
  h48: '3.428',
  h64: '4.572',
};

// duplicate
function itemKey(index, data) {
  if (typeof customItemKey === 'function') {
    return customItemKey(index, data);
  }

  return index;
}

type VirtualizedRowsType = {
  rows: Row<object>[];
  rowHeight: 'h32' | 'h40' | 'h48' | 'h64';
  setHasScrollbar: React.Dispatch<React.SetStateAction<boolean>>;
  onBottom?: (rowLength: number) => void;
  onBottomOffset?: number;
  RenderRow: React.NamedExoticComponent<object>;
};

const VirtualizedRows = ({
  rows,
  rowHeight,
  setHasScrollbar,
  onBottom,
  onBottomOffset,
  RenderRow,
}: VirtualizedRowsType) => (
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
              onBottom &&
              onBottomOffset != null &&
              overscanStopIndex >= rows.length - 1 - onBottomOffset
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

const translations = {
  en: {
    noResult: 'No results found',
  },
  fr: {
    noResult: `Aucun résultat`,
  },
};

type RenderType = {
  index: number;
  style: Record<string, string | number>;
};

export type MultiSelectableContentProps = {
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
  onMultiSelectionChanged: (rows: Row<object>[]) => void;
  locale?: 'en' | 'fr';
  customItemKey?: (index: Number, data: any) => string;
  isLoading?: boolean;
  children?: (rows: JSX.Element) => JSX.Element;
};

export const MultiSelectableContent = ({
  rowHeight,
  separationLineVariant,
  backgroundVariant,
  onMultiSelectionChanged,
  locale = 'en',
  customItemKey,
  isLoading = false,
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

  const RenderRow = memo(({ index, style }: RenderType) => {
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
              {/* FIXME Patrick Need comment */}
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

  // console.log('headerGroups', headerGroups);
  // console.log('rows', rows);

  return (
    <>
      <div>
        {headerGroups.map((headerGroup) => (
          <HeadRow
            {...headerGroup.getHeaderGroupProps()}
            hasScrollBar={false}
            scrollBarWidth={0}
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
                    {column.id === 'selection' ? (
                      <div
                        onClick={() => {
                          console.log('isAllRowsSelected', isAllRowsSelected);
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
