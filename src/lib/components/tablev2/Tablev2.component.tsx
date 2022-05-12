// @ts-nocheck
import * as React from 'react';
import { useEffect } from 'react';
import {
  useTable,
  useSortBy,
  useBlockLayout,
  useRowSelect,
  useExpanded,
  useFilters,
  useGlobalFilter,
} from 'react-table';

import { SingleSelectableContent } from './SingleSelectableContent';
import { TableSearch as Search } from './Search';
import { SearchWithQueryParams } from './SearchWithQueryParams';
import { compareHealth } from './TableUtil';
import { TableWrapper } from './Tablestyle';
export type DataRow = Record<string, any>;
export type SortType =
  | string
  | ((rowA: DataRow, rowB: DataRow, columnId: string, desc: boolean) => number);
export type TableProps = {
  columns: {
    Header: string;
    accessor: string;
    sortType?: SortType;
    cellStyle?: Partial<CSSStyleDeclaration>;
    Cell?: React.ReactNode | ((props: any) => React.ReactNode);
    disableSortBy?: boolean;
  }[];
  defaultSortingKey: string;
  //we don't display the default sort key in the URL, so we need to specify here
  data: DataRow[];
  children: React.ReactNode;
  getRowId?: any;
  sortTypes?: Record<string, SortType>;
  globalFilter?: string;
  onBottom?: (rowLength: number) => void;
  onBottomOffset?: number;
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
  sortTypes,
  globalFilter,
  onBottom,
  onBottomOffset = 10,
  ...rest
}: TableProps) {
  sortTypes = {
    health: (row1, row2) => {
      return compareHealth(row2.values.health, row1.values.health);
    },
    ...sortTypes,
  };
  const stringifyFilter = React.useMemo(() => {
    return (rows, columnId, value) => {
      const filteredRows = rows.filter((row) => {
        // we stringify the object to make sure we can match the value
        return JSON.stringify(row.values)
          .toLowerCase()
          .includes((value || '').toLowerCase());
      });
      return filteredRows;
    };
  }, []);
  const {
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    getTableBodyProps,
    state: { selectedRowIds },
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
      globalFilter: stringifyFilter,
    },
    useBlockLayout,
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    useRowSelect,
  );
  useEffect(() => {
    if (globalFilter !== undefined && globalFilter !== null) {
      setGlobalFilter(globalFilter);
    }
  }, [globalFilter, setGlobalFilter, data]);
  return (
    <TableContext.Provider
      value={{
        headerGroups,
        rows,
        prepareRow,
        getTableBodyProps,
        selectedRowIds,
        selectedFlatRows,
        preGlobalFilteredRows,
        setGlobalFilter,
        globalFilter,
        setFilter,
        onBottom,
        onBottomOffset,
      }}
    >
      <TableWrapper role="grid" className="table">
        {children}
      </TableWrapper>
    </TableContext.Provider>
  );
}

Table.SingleSelectableContent = SingleSelectableContent;
Table.Search = Search;
Table.SearchWithQueryParams = SearchWithQueryParams;
export { Table };
