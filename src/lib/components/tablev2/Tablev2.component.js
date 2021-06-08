//@flow
import React from 'react';
import { useTable, useSortBy } from 'react-table';
type Row = {};
export type TableProps = {
  columns: {
    Header: string,
    accessor: string,
    sortFunction?: (a, b) => number,
    collapsible?: boolean,
  }[],
  defaultSortingKey: string, //we don't display the default sort key in the URL, so we need to specify here
  data: Array<Object>,
  separationLineVariant?:
    | 'backgroundLevel1'
    | 'backgroundLevel2'
    | 'backgroundLevel3'
    | 'backgroundLevel4',
};

function Table({ columns, data, defaultSortingKey }: TableProps) {
  //map the sortFunction in the columns
  const sortTypes = {};

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
    <table {...getTableProps()}>
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
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
