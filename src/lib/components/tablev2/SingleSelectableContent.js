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
  TooltipContent,
  UnknownIcon,
} from './Tablestyle';
import { useTableContext } from './Tablev2.component';
import { convertRemToPixels } from './TableUtil';
import { Row } from 'react-table'; // may not import the type correctly
import Tooltip from '../tooltip/Tooltip.component.js';
import ConstrainedText from '../constrainedtext/Constrainedtext.component';

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
  backgroundVariant:
    | 'backgroundLevel1'
    | 'backgroundLevel2'
    | 'backgroundLevel3'
    | 'backgroundLevel4',
  selectedId?: string,
  onRowSelected?: (row: Row) => void,
};

export default function SingleSelectableContent({
  rowHeight,
  separationLineVariant,
  backgroundVariant,
  selectedId,
  onRowSelected,
}: SingleSelectableContentProps) {
  if (!['h32', 'h40', 'h48', 'h64'].includes(rowHeight)) {
    console.error(
      `Invalid rowHeight props, expected h32, h40, h48, or h64 but received ${rowHeight}`,
    );
  }
  if (
    ![
      'backgroundLevel1',
      'backgroundLevel2',
      'backgroundLevel3',
      'backgroundLevel4',
    ].includes(separationLineVariant)
  ) {
    console.error(
      `Invalid separationLineVariant props, expected backgroundLevel1, backgroundLevel2, backgroundLevel3 or backgroundLevel4 but received ${separationLineVariant}`,
    );
  }
  if (selectedId && !onRowSelected) {
    console.error('Please specify the onRowSelected function.');
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
            onClick: () => {
              if (onRowSelected) return onRowSelected(row);
            },
          })}
          row={row}
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
            if (cell.value === undefined) {
              return (
                <div {...cellProps} className="td">
                  <Tooltip
                    placement={index === 0 ? 'bottom' : 'top'}
                    overlay={<TooltipContent>unknown</TooltipContent>}
                  >
                    <UnknownIcon className="fas fa-minus"></UnknownIcon>
                  </Tooltip>
                </div>
              );
            }

            return (
              <div {...cellProps} className="td">
                {
                  // if cell.column.cell is defined that means we have a custom cell renderer
                  // otherwise it should be just a string and we can use the constrainted text component
                  !cell.column.cell && typeof cell.value === 'string' ? (
                    <ConstrainedText
                      text={cell.value}
                      tooltipPlacement={index === 0 ? 'bottom' : 'top'}
                    />
                  ) : (
                    cell.render('Cell')
                  )
                }
              </div>
            );
          })}
        </TableRow>
      );
    },
    [
      rows,
      prepareRow,
      separationLineVariant,
      backgroundVariant,
      selectedId,
      onRowSelected,
    ],
  );

  return (
    <>
      <div className="thead" role="rowgroup">
        {headerGroups.map((headerGroup) => (
          <HeadRow {...headerGroup.getHeaderGroupProps()}>
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
                  </div>
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
