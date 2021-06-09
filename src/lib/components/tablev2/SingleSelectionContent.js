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

export type SingleSelectionProps = {
  rowHeight: number,
  onRowSelected?: (dataRow) => void,
  children: (sortAndFilter: (DataRow[]) => DataRow[]) => Table.Row[],
};

export default function SingleSelectionContent({
  rowHeight,
  onRowSelected,
  defaultSelectedKey,
}: SingleSelectionProps) {
  const {
    headerGroups,
    getTableBodyProps,
    prepareRow,
    rows,
    defaultSelectedValue,
  } = useContext(TableContext);

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);

      return (
        <TableRow
          {...row.getRowProps({
            onClick: () => onRowSelected(row),
            /* Note:
            We need to pass the style property to the row component.
            Otherwise when we scroll down, the next rows are flashing because they are re-rendered in loop. */
            style: { ...style },
          })}
          row={row}
          defaultSelectedKey={defaultSelectedKey}
          defaultSelectedValue={defaultSelectedValue}
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
    [defaultSelectedKey, defaultSelectedValue, onRowSelected, prepareRow, rows],
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
      <TableBody {...getTableBodyProps()} className="tbody">
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
