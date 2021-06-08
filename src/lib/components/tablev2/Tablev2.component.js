//@flow
import React, { useContext } from 'react';
import { useTable, useSortBy } from 'react-table';
import { TableRow } from './Tablestyle';
type SingleSelectionProps = {
  defaultSelectedKey?: string,
  defaultSelectedValue?: string,
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
};

function SingleSelectionContent({
  defaultSelectedKey,
  defaultSelectedValue,
  onRowSelected,
  children,
}: SingleSelectionProps) {
  const { headerGroups, getTableBodyProps, prepareRow, rows } = useContext(
    TableContext,
  );

  return (
    <>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getSortByToggleProps()}>
                {column.render('Header')}
                {/* Add a sort direction indicator */}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <i className="fas fa-sort-down" />
                    ) : (
                      <i className="fas fa-sort-up" />
                    )
                  ) : (
                    <i className="fas fa-sort" />
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow
              {...row.getRowProps()}
              row={row}
              defaultSelectedKey={defaultSelectedKey}
              defaultSelectedValue={defaultSelectedValue}
            >
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </TableRow>
          );
        })}
      </tbody>
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
      }}
    >
      <table {...getTableProps()}>
        <SingleSelectionContent
          defaultSelectedKey={defaultSelectedKey}
          defaultSelectedValue={defaultSelectedValue}
        />
      </table>
    </TableContext.Provider>
  );
}

export default Table;
