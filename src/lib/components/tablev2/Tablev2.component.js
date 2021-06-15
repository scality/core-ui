//@flow
import * as React from 'react';
import {
  useTable,
  useSortBy,
  useBlockLayout,
  useRowSelect,
  useExpanded,
  useFilters,
  useGlobalFilter,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  selectedRowIds,
  selectedFlatRows,
  preGlobalFilteredRows,
  setGlobalFilter,
  globalFilter,
  setFilter,
} from 'react-table';
import SimpleContent from './SimpleContent';
import { compareHealth } from './TableUtil.js';

export type TableProps = {
  columns: {
    Header: string,
    accessor: string,
    sortType?:
      | string
      | ((rowA: any, rowB: any, columnId: string, desc: boolean) => number),
    cellStyle?: { [key: string]: any },
    Cell?: (cellProps: any) => any,
  }[],
  defaultSortingKey: string, //we don't display the default sort key in the URL, so we need to specify here
  data: { [key: string]: any }[],
  rowIDKey: string, // define which column represent the unique id of the table
  children: React.Node,
  isMultiRowSelection?: boolean,
  isCollapsible?: boolean,
};

export type TableContextValue = {
  getTableProps: getTableProps,
  getTableBodyProps: getTableBodyProps,
  headerGroups: headerGroups,
  rows: rows,
  prepareRow: prepareRow,
  selectedRowIds: selectedRowIds,
  selectedFlatRows: selectedFlatRows,
  preGlobalFilteredRows: preGlobalFilteredRows,
  setGlobalFilter: setGlobalFilter,
  globalFilter: globalFilter,
  setFilter: setFilter,
};
export const TableContext = React.createContext<TableContextValue>({});

function Table({
  columns,
  data,
  defaultSortingKey,
  isCollapsible = false,
  isMultiRowSelection = false,
  rowIDKey,
  children,
  ...rest
}: TableProps) {
  const sortTypes = {
    health: (row1, row2) => {
      return compareHealth(row2.values.health, row1.values.health);
    },
  };

  const getRowId = (row, relativeIndex) => {
    return row[rowIDKey];
  };

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      getRowId,
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
    useBlockLayout,
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    useRowSelect,
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
        selectedRowIds,
        selectedFlatRows,
        preGlobalFilteredRows,
        setGlobalFilter,
        globalFilter,
        setFilter,
      }}
    >
      {/* we need to use <div/> because of the virtualized table*/}
      <div {...getTableProps()} className="table">
        {children}
      </div>
    </TableContext.Provider>
  );
}

Table.SimpleContent = SimpleContent;
export default Table;
