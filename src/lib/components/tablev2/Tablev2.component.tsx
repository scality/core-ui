/// <reference path="react-table-config.ts" />
import * as React from 'react';
import { useEffect } from 'react';
import {
  Column as TableColumn,
  CellProps as TableCellProps,
  CoreUIColumn,
  HeaderGroup,
  IdType,
  Row,
  SortByFn,
  TableBodyPropGetter,
  TableBodyProps,
  useBlockLayout,
  useExpanded,
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useTable,
  defaultColumn,
} from 'react-table';
import { useMemoCompare } from '../../hooks';
import { Box } from '../box/Box';
import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';
import { Tooltip } from '../tooltip/Tooltip.component';

import { MultiSelectableContent } from './MultiSelectableContent';
import { TableSearch as Search } from './Search';
import { SearchWithQueryParams } from './SearchWithQueryParams';
import { SingleSelectableContent } from './SingleSelectableContent';
import { TableWrapper, TooltipContent } from './Tablestyle';
import { compareHealth, TableHeightKeyType } from './TableUtils';
import { useCheckbox } from './useCheckbox';
import { Icon } from '../icon/Icon.component';

type UpdateTableData<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
> = {
  updateTableData?: <DATA_ROW_KEY extends keyof DATA_ROW>(
    rowId: string,
    columnName: DATA_ROW_KEY,
    value: DATA_ROW[DATA_ROW_KEY],
  ) => void;
};
export type Column<D extends Record<string, unknown>> = CoreUIColumn<D>;
export type CellProps<D extends Record<string, unknown>, V = unknown> =
  TableCellProps<D, V> & UpdateTableData<D>;

export type TableProps<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
> = {
  columns: Array<Column<DATA_ROW>>;
  defaultSortingKey?: string;
  // We don't display the default sort key in the URL, so we need to specify here
  data: DATA_ROW[];
  children: JSX.Element | JSX.Element[];
  getRowId?: (
    originalRow: DATA_ROW,
    relativeIndex: number,
    parent?: Row<DATA_ROW>,
  ) => string;
  sortTypes?: Record<string, SortByFn<DATA_ROW>>;
  globalFilter?: string;
  onBottom?: (rowLength: number) => void;
  onBottomOffset?: number;
  allFilters?: { id: string; value: string }[];
  initiallySelectedRowsIds?: Set<string | number>;
  //To call it from the Cell renderer to update the original data
} & UpdateTableData<DATA_ROW>;

type setHiddenColumnFuncType = (oldHidden: string[]) => string[];

type TableContextType<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
> = {
  headerGroups: HeaderGroup<DATA_ROW>[];
  rows: Row<DATA_ROW>[];
  prepareRow: (row: Row<DATA_ROW>) => void;
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<DATA_ROW>,
  ) => TableBodyProps;
  rowHeight: TableHeightKeyType;
  setRowHeight: (rowHeight: TableHeightKeyType) => void;
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
  toggleAllRowsSelected: (value?: boolean) => void;
};
const TableContext = React.createContext<TableContextType | null>(null);

export const useTableContext = <
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>() => {
  const tableProps = React.useContext(TableContext);

  if (!tableProps) {
    throw new Error(
      'The useTableContext hook can only be used within the <TableContext.Provider/>',
    );
  }

  return tableProps as TableContextType<DATA_ROW>; //Todo figure out a way to transfer the type to the context provider
};

export const EmptyCell = ({
  tooltipContent,
  mr = 4,
}: {
  tooltipContent?: string | JSX.Element;
  mr?: number;
}) => {
  return (
    <Box mr={mr}>
      <Tooltip
        overlay={<TooltipContent>{tooltipContent || 'unknown'}</TooltipContent>}
      >
        <Icon name="Minus" />
      </Tooltip>
    </Box>
  );
};

const DefaultRenderer = ({ value }) => {
  const { rowHeight } = useTableContext();

  if (!value && value !== 0) {
    return <EmptyCell />;
  }

  if (typeof value === 'string') {
    const lineClamp =
      rowHeight === 'h32'
        ? 1
        : rowHeight === 'h40' || rowHeight === 'h48'
        ? 2
        : 3;
    return (
      <Box mr={4}>
        <ConstrainedText text={value} lineClamp={lineClamp} />
      </Box>
    );
  }

  return value;
};
function Table<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>({
  columns,
  data,
  defaultSortingKey,
  getRowId,
  children,
  sortTypes,
  globalFilter,
  allFilters,
  onBottom,
  onBottomOffset = 10,
  initiallySelectedRowsIds,
  updateTableData,
}: TableProps<DATA_ROW>) {
  sortTypes = {
    health: (row1, row2) => {
      return compareHealth(row2.values.health, row1.values.health) || 0;
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

  const formattedInitiallySelectedRows = React.useMemo(() => {
    if (initiallySelectedRowsIds) {
      return Array.from(initiallySelectedRowsIds).reduce(
        (accumulatedValue, currentValue) => ({
          ...accumulatedValue,
          [currentValue]: true,
        }),
        {},
      );
    }
    return {};
  }, []) as Record<IdType<DATA_ROW>, boolean>;

  const [rowHeight, setRowHeight] = React.useState<TableHeightKeyType>('h40');

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
    setAllFilters,
    setHiddenColumns,
    isAllRowsSelected,
    toggleAllRowsSelected,
  } = useTable<DATA_ROW>(
    {
      defaultColumn: {
        ...(defaultColumn as TableColumn<DATA_ROW>),
        Cell: DefaultRenderer,
      },
      columns: columns as TableColumn<DATA_ROW>[],
      data,
      getRowId,
      initialState: {
        sortBy: defaultSortingKey
          ? [
              {
                id: defaultSortingKey,
                desc: false,
              },
            ]
          : [],
        selectedRowIds: formattedInitiallySelectedRows,
        hiddenColumns: ['selection'],
      },
      disableMultiSort: true,
      autoResetSortBy: false,
      sortTypes,
      //@ts-ignore TODO investigate why this type is not matching
      globalFilter: stringifyFilter,
      autoResetHiddenColumns: false,
      updateTableData,
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

  const filters = useMemoCompare(
    allFilters,
    (previous, next) =>
      !previous || JSON.stringify(previous) === JSON.stringify(next),
  );

  useEffect(() => {
    if (!filters) {
      setAllFilters([]);
    } else {
      const validFilters = filters.filter(
        (filter) => filter.id && filter.value !== undefined,
      );
      setAllFilters(validFilters.length > 0 ? validFilters : []);
    }
  }, [filters, setAllFilters]);

  const contextValue: TableContextType<DATA_ROW> = {
    headerGroups,
    rows,
    prepareRow,
    getTableBodyProps,
    selectedRowIds,
    selectedFlatRows,
    preGlobalFilteredRows,
    setGlobalFilter,
    rowHeight,
    setRowHeight,
    globalFilter,
    setFilter,
    onBottom,
    onBottomOffset,
    setHiddenColumns,
    isAllRowsSelected,
    toggleAllRowsSelected,
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
