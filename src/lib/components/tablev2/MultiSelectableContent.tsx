import { forwardRef, useRef, useEffect, memo } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, areEqual } from 'react-window';
import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';
import {
  HeadRow,
  SortCaretWrapper,
  SortIncentive,
  TableBody,
  TableHeader,
  TableRow,
  TableRowMultiSelectable,
} from './Tablestyle';
import { convertRemToPixels } from './TableUtil';
import { useTableContext } from './Tablev2.component';

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

export const MultiSelectableContent = () => {
  const { headerGroups, prepareRow, rows, setHiddenColumns, selectedRowIds } =
    useTableContext();

  useEffect(() => {
    setHiddenColumns([]);
  }, [setHiddenColumns]);

  console.log('selectedRowIds', selectedRowIds);

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
      <TableBody role="rowgroup" className="tbody">
        {rows.map((row, i) => {
          prepareRow(row);
          console.log('row', row);
          return (
            <TableRowMultiSelectable
              {...row.getRowProps()}
              onClick={() => {
                row.toggleRowSelected(!row.isSelected);
              }}
              isSelected={row.isSelected}
            >
              {row.cells.map((cell) => {
                return (
                  <div {...cell.getCellProps()}>{cell.render('Cell')}</div>
                );
              })}
            </TableRowMultiSelectable>
          );
        })}
      </TableBody>
    </>
  );
};
