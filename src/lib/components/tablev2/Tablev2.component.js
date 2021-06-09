//@flow
import React, { useContext } from 'react';
import { useTable, useSortBy, useBlockLayout } from 'react-table';
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
type SingleSelectionProps = {
  rowHeight: number,
  onRowSelected?: (dataRow) => void,
  children: (sortAndFilter: (DataRow[]) => DataRow[]) => Table.Row[],
};
export type TableProps = {
  columns: {
    Header: string,
    accessor: string,
    sortFunction?: (a, b) => number,
    collapsible?: boolean,
  }[],
  defaultSortingKey: string, //we don't display the default sort key in the URL, so we need to specify here
  defaultSelectedKey?: string,
  data: Array<Object>,
  separationLineVariant?:
    | 'backgroundLevel1'
    | 'backgroundLevel2'
    | 'backgroundLevel3'
    | 'backgroundLevel4',
  rowHeight: number,
};

function SingleSelectionContent({
  rowHeight,
  onRowSelected,
  children,
}: SingleSelectionProps) {
  const {
    headerGroups,
    getTableBodyProps,
    prepareRow,
    rows,
    defaultSelectedKey,
    defaultSelectedValue,
  } = useContext(TableContext);

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
    [defaultSelectedKey, defaultSelectedValue, prepareRow, rows],
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

const TableContext = React.createContext<null>(null);

function Table({
  columns,
  data,
  defaultSortingKey,
  defaultSelectedKey,
}: TableProps) {
  //map the sortFunction in the columns to this sortTypes
  const sortTypes = {};
  // the default selection should be retrieved from URL which should be a part of the logic in Table
  // hardcode for the moment
  let defaultSelectedValue = 'Yohann';

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: defaultSortingKey,
            desc: false,
          },
        ],
      },
      disableMultiSort: true,
      autoResetSortBy: false,
      sortTypes,
    },
    useSortBy,
    useBlockLayout,
  );

  // Render the UI for your table
  return (
    <TableContext.Provider
      value={{
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        defaultSelectedKey,
        defaultSelectedValue,
      }}
    >
      {/* we need to use <div/> because of the virtualized table  */}
      <div {...getTableProps()} className="table">
        <SingleSelectionContent
          rowHeight={80}
          defaultSelectedKey={defaultSelectedKey}
          defaultSelectedValue={defaultSelectedValue}
        />
      </div>
    </TableContext.Provider>
  );
}

export default Table;
