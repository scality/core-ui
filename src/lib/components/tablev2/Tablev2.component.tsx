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
  SortByFn,
  Column,
  Row,
  HeaderGroup,
  TableBodyPropGetter,
  TableBodyProps,
  Cell,
} from 'react-table';

import { SingleSelectableContent } from './SingleSelectableContent';
import { TableSearch as Search } from './Search';
import { SearchWithQueryParams } from './SearchWithQueryParams';
import { compareHealth } from './TableUtils';
import { TableWrapper } from './Tablestyle';
import { MultiSelectableContent } from './MultiSelectableContent';
import { useCheckbox } from './useCheckbox';

export interface CoreUIColumn {
  cellStyle?: object;
  Cell?: (cellProps: Cell) => JSX.Element;
}
type ColumnTest = Column<CoreUIColumn>;

export type DataRow = Record<string, any>;

export type TableProps = {
  columns: Array<Column>;
  defaultSortingKey: string;
  // We don't display the default sort key in the URL, so we need to specify here
  data: DataRow[];
  children: JSX.Element | JSX.Element[];
  getRowId?: any;
  sortTypes?: Record<string, SortByFn<object>>;
  globalFilter?: string;
  onBottom?: (rowLength: number) => void;
  onBottomOffset?: number;
};

type TableContextType = {
  headerGroups: HeaderGroup<object>[];
  rows: Row<object>[];
  prepareRow: (row: Row<object>) => void;
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<object>,
  ) => TableBodyProps;
  selectedRowIds: Record<string, boolean>;
  selectedFlatRows: Row<object>[];
  preGlobalFilteredRows: Row<object>[];
  setGlobalFilter: (filterValue: any) => void;
  globalFilter: any;
  setFilter: (columnId: string, updater: any) => void;
  onBottom?: (rowLength: number) => void;
  onBottomOffset?: number;
  setHiddenColumns: (param: string[]) => void;
  isAllRowsSelected?: boolean;
};
const TableContext = React.createContext<TableContextType>(null);

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
    return (rows: Row<object>[], columnIds: string[], value) => {
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
    setHiddenColumns,
    isAllRowsSelected,
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
        hiddenColumns: ['selection'],
      },
      disableMultiSort: true,
      autoResetSortBy: false,
      sortTypes,
      globalFilter: stringifyFilter,
      autoResetHiddenColumns: false,
    },
    useBlockLayout,
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    useRowSelect,
    useCheckbox,
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
        setHiddenColumns,
        isAllRowsSelected,
      }}
    >
      <TableWrapper role="grid" className="table">
        {children}
      </TableWrapper>
    </TableContext.Provider>
  );
}

Table.SingleSelectableContent = SingleSelectableContent;
Table.MultiSelectableContent = MultiSelectableContent;
Table.Search = Search;
Table.SearchWithQueryParams = SearchWithQueryParams;
export { Table };
