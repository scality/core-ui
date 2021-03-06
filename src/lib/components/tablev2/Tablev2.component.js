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
  getRowId,
} from 'react-table';
import SingleSelectableContent from './SingleSelectableContent';
import { compareHealth } from './TableUtil.js';
import { TableWrapper } from './Tablestyle';
export type DataRow = {
  [key: string]: any,
};
export type TableProps = {
  columns: {
    Header: string,
    accessor: string,
    sortType?:
      | string
      | ((
          rowA: DataRow,
          rowB: DataRow,
          columnId: string,
          desc: boolean,
        ) => number),
    cellStyle?: $Shape<CSSStyleDeclaration>,
    Cell?: React.Node,
  }[],
  defaultSortingKey: string, //we don't display the default sort key in the URL, so we need to specify here
  data: DataRow[],
  children: React.Node,
  getRowId?: getRowId,
};

const TableContext = React.createContext<any>(null);

export const useTableContext = () => {
  const tableProps = React.useContext(TableContext);
  if (!tableProps) {
    throw new Error(
      'The useTableContext hook can only be used within the <TableContext.Provider/>',
    );
  }
  return tableProps;
};

function Table({
  columns,
  data,
  defaultSortingKey,
  getRowId,
  children,
  ...rest
}: TableProps) {
  const sortTypes = {
    health: (row1, row2) => {
      return compareHealth(row2.values.health, row1.values.health);
    },
  };

  const {
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

  return (
    <TableContext.Provider
      value={{
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
      <TableWrapper role="grid" className="table">
        {children}
      </TableWrapper>
    </TableContext.Provider>
  );
}

Table.SingleSelectableContent = SingleSelectableContent;
export default Table;
