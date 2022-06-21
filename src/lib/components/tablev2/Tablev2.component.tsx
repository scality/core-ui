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
  Row,
  HeaderGroup,
  TableBodyPropGetter,
  TableBodyProps,
  CoreUIColumn,
  Column,
} from 'react-table';

import { SingleSelectableContent } from './SingleSelectableContent';
import { TableSearch as Search } from './Search';
import { SearchWithQueryParams } from './SearchWithQueryParams';
import { compareHealth } from './TableUtils';
import { TableWrapper } from './Tablestyle';
import { MultiSelectableContent } from './MultiSelectableContent';
import { useCheckbox } from './useCheckbox';

export type TableProps<DATA_ROW extends Record<string, unknown> = Record<string, unknown>> = {
  columns: Array<CoreUIColumn<DATA_ROW>>;
  defaultSortingKey: string;
  // We don't display the default sort key in the URL, so we need to specify here
  data: DATA_ROW[];
  children: JSX.Element | JSX.Element[];
  getRowId?: (originalRow: DATA_ROW, relativeIndex: number, parent?: Row<DATA_ROW>) => string;
  sortTypes?: Record<string, SortByFn<DATA_ROW>>;
  globalFilter?: string;
  onBottom?: (rowLength: number) => void;
  onBottomOffset?: number;
};

type setHiddenColumnFuncType = (oldHidden: string[]) => string[];
// FIXME To rewrite with Generics
type TableContextType<DATA_ROW extends Record<string, unknown> = Record<string, unknown>> = {
  headerGroups: HeaderGroup<DATA_ROW>[];
  rows: Row<DATA_ROW>[];
  prepareRow: (row: Row<DATA_ROW>) => void;
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<DATA_ROW>,
  ) => TableBodyProps;
  selectedRowIds: Record<string, boolean>;
  selectedFlatRows: Row<DATA_ROW>[];
  preGlobalFilteredRows: Row<DATA_ROW>[];
  setGlobalFilter: (filterValue: string) => void;
  globalFilter: any;
  setFilter: (columnId: string, updater: any) => void;
  onBottom?: (rowLength: number) => void;
  onBottomOffset?: number;
  setHiddenColumns: (param: string[] | setHiddenColumnFuncType) => void;
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

function Table<DATA_ROW extends Record<string, unknown> = Record<string, unknown>>({
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
}: TableProps<DATA_ROW>) {
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
  } = useTable<DATA_ROW>(
    {
      columns: columns as Column<DATA_ROW>[],
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
      //@ts-ignore TODO investigate why this type is not matching
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

  const contextValue: TableContextType<DATA_ROW> = {
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
  };
  return (
    <TableContext.Provider
      //@ts-ignore
      value={contextValue}
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
