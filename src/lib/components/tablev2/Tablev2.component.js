//@flow
import React from 'react';
import { useTable } from 'react-table';

export type Props = {
  columns: {
    Header: string,
    accessor: string,
    sortFunction?: (a: string, b: string) => number,
    collapsible?: boolean,
  }[],
  separationLineVariant?:
    | 'backgroundLevel1'
    | 'backgroundLevel2'
    | 'backgroundLevel3'
    | 'backgroundLevel4',
  data: Array<Object>,
};

function Table({ columns, data }: Props) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
