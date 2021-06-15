//@flow
import React, { useContext } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import {
  TableRow,
  HeadRow,
  TableBody,
  TableHeader,
  SortCaretWrapper,
  SortIncentive,
} from './Tablestyle';
import { TableContext } from './Tablev2.component';

export type MultiSelectionProps = {
  rowHeight: number,
  outerTableHeight: number, // in pixel, the sum of height outside the table, pass it to virtualized table to calculate the height of the table
  defaultSelection: key[],
  onMultiSelectionChanged?: (DataRow[]) => void,
};

export default function MultiSelectionContent({
  rowHeight,
  outerTableHeight,
  onMultiSelectionChanged,
}: MultiSelectionProps) {
  const {
    headerGroups,
    getTableBodyProps,
    prepareRow,
    rows,
    selectedRowIds,
    selectedFlatRows,
  } = useContext(TableContext);

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);

      return (
        <TableRow
          {...row.getRowProps({
            onClick: () => onMultiSelectionChanged(selectedFlatRows),
            /* Note:
            We need to pass the style property to the row component.
            Otherwise when we scroll down, the next rows are flashing because they are re-rendered in loop. */
            style: { ...style },
          })}
          row={row}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </div>
            );
          })}
        </TableRow>
      );
    },
    [prepareRow, rows],
  );

  return (
    <>
      <div className="thead">
        {headerGroups.map((headerGroup) => (
          <HeadRow {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map((column) => {
              const headerStyleProps = column.getHeaderProps(
                Object.assign(column.getSortByToggleProps(), {
                  style: column.cellStyle,
                }),
              );
              return (
                <TableHeader {...headerStyleProps}>
                  {column.render('Header')}
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
                </TableHeader>
              );
            })}
          </HeadRow>
        ))}
      </div>
      <TableBody
        {...getTableBodyProps()}
        outerTableHeight={outerTableHeight}
        className="tbody"
      >
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={rows.length} // how many items we are going to render
              itemSize={rowHeight} // height of each row in pixel
              width={width} // should include the width of the scrollbar
            >
              {RenderRow}
            </List>
          )}
        </AutoSizer>
      </TableBody>
    </>
  );
}
