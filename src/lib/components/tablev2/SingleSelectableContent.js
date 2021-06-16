//@flow
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import {
  HeadRow,
  TableRow,
  TableBody,
  TableHeader,
  SortCaretWrapper,
  SortIncentive,
} from './Tablestyle';
import { useTableContext } from './Tablev2.component';
import { convertRemToPixels } from './TableUtil';

export const tableRowHeight = {
  // in rem unit
  h32: '2.286',
  h40: '2.858',
  h48: '3.428',
  h64: '4.572',
};

export type SingleSelectableContentProps = {
  rowHeight: 'h32' | 'h40' | 'h48' | 'h64',
  separationLineVariant:
    | 'backgroundLevel1'
    | 'backgroundLevel2'
    | 'backgroundLevel3'
    | 'backgroundLevel4',
};

export default function SingleSelectableContent({
  rowHeight,
  separationLineVariant,
}: SingleSelectableContentProps) {
  if (['h32', 'h40', 'h48', 'h64'].indexOf(rowHeight) === -1) {
    console.error('Invalid table row height defined.');
  }
  if (
    [
      'backgroundLevel1',
      'backgroundLevel2',
      'backgroundLevel3',
      'backgroundLevel4',
    ].indexOf(separationLineVariant) === -1
  ) {
    console.error('Invalid table seperation line color defined.');
  }

  const { headerGroups, prepareRow, rows } = useTableContext();

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <TableRow
          {...row.getRowProps({
            /* Note:
            We need to pass the style property to the row component.
            Otherwise when we scroll down, the next rows are flashing because they are re-rendered in loop. */
            style: { ...style },
          })}
          row={row}
          separationLineVariant={separationLineVariant}
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
    },
    [prepareRow, rows, separationLineVariant],
  );

  return (
    <>
      <div className="thead" role="rowgroup">
        {headerGroups.map((headerGroup) => (
          <HeadRow {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map((column) => {
              const headerStyleProps = column.getHeaderProps(
                Object.assign(column.getSortByToggleProps(), {
                  style: column.cellStyle,
                }),
              );
              return (
                <TableHeader {...headerStyleProps} role="columnheader">
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
      <TableBody role="rowgroup" className="tbody">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={rows.length} // how many items we are going to render
              itemSize={convertRemToPixels(tableRowHeight[rowHeight])} // height of each row in pixel
              width={width}
            >
              {RenderRow}
            </List>
          )}
        </AutoSizer>
      </TableBody>
    </>
  );
}
