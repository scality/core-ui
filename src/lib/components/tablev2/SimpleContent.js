//@flow
import React, { useContext } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import {
  HeadRow,
  TableBody,
  TableHeader,
  SortCaretWrapper,
  SortIncentive,
} from './Tablestyle';
import { TableContext } from './Tablev2.component';

export type SimpleContentProps = {
  rowHeight: number,
  outerTableHeight: number, // in pixel, the sum of height outside the table, pass it to virtualized table to calculate the height of the table
};

export default function SimpleContent({
  rowHeight,
  outerTableHeight,
}: SimpleContentProps) {
  const scrollBarSize = 8;
  const { headerGroups, getTableBodyProps, prepareRow, rows } = useContext(
    TableContext,
  );

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);

      return (
        <div
          {...row.getRowProps({
            /* Note:
            We need to pass the style property to the row component.
            Otherwise when we scroll down, the next rows are flashing because they are re-rendered in loop. */
            style: { ...style },
          })}
          row={row}
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
            });

            return (
              <div {...cellProps} className="td">
                {cell.render('Cell')}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows],
  );

  return (
    <>
      <div className="thead">
        {headerGroups.map((headerGroup) => (
          <HeadRow
            {...headerGroup.getHeaderGroupProps()}
            style={{
              display: 'flex',
            }}
            className="tr"
          >
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
        className="tbody"
        outerTableHeight={outerTableHeight}
      >
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={rows.length} // how many items we are going to render
              itemSize={rowHeight} // height of each row in pixel
              width={width + scrollBarSize} // should include the width of the scrollbar
            >
              {RenderRow}
            </List>
          )}
        </AutoSizer>
      </TableBody>
    </>
  );
}
