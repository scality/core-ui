/// <reference path="react-table-config.ts" />

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import {
  useDroppedColumns,
  DROPPED_COLUMNS_COLUMN_ID,
} from './useDroppedColumns';
import { Icon } from '../icon/Icon.component';
import { TableSync } from './TableSync';
import { useContainerWidth } from '../responsive/useContainerWidth';

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
export type CellProps<
  D extends Record<string, unknown>,
  V = unknown,
> = TableCellProps<D, V> & UpdateTableData<D>;

export type TableProps<
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
> = {
  /**
   * Column definitions for the table.
   *
   * IMPORTANT: memoize this (e.g. `useMemo`) and keep each column's `Cell`
   * renderer stable across renders. react-table renders cells as
   * `<column.Cell />`, so a new `Cell` function identity on every parent
   * render is a new component type — React unmounts and remounts the whole
   * cell subtree each render. For cells with async content or icons that
   * causes flicker/refetch. Define columns outside the render or wrap them in
   * `useMemo`, and hoist inline `Cell` components rather than redefining them
   * inline. The same applies to `data`.
   */
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
  status?: 'idle' | 'loading' | 'error' | 'success';
  entityName?: {
    en: { singular: string; plural: string };
    fr?: { singular: string; plural: string };
  };
  initiallySelectedRowsIds?: Set<string | number>;
  /**
   * When `true`, a trailing column is shown while one or more `dropAt` columns
   * are responsively hidden. Its per-row trigger opens a popover listing the
   * dropped columns' `Header: value` pairs, so the data stays reachable on
   * narrow viewports. Opt-in; defaults to `false` (no behaviour change).
   */
  revealDroppedColumns?: boolean;
  /**
   * When `true` (default), the virtualized body shows a bottom scroll fade that
   * hints at more rows and auto-hides once the user reaches the end. Set to
   * `false` to opt out when the fade is unnecessary or looks out of place
   * (e.g. tables that never overflow, or those inside an already-faded
   * container).
   */
  scrollFade?: boolean;
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
  status?: 'idle' | 'loading' | 'error' | 'success';
  entityName?: {
    en: { singular: string; plural: string };
    fr?: { singular: string; plural: string };
  };
  syncScrollListener: ((event: Event) => void) | null;
  setSyncScrollListener: (listener: (event: Event) => void) => void;
  setHasScrollbar: React.Dispatch<React.SetStateAction<boolean>>;
  hasScrollbar?: boolean;
  /** Ids of the columns currently hidden by the responsive `dropAt` effect. */
  droppedColumnIds: Set<string>;
  /** Whether the virtualized body renders the bottom scroll fade. */
  scrollFade: boolean;
};
const TableContext = createContext<TableContextType | null>(null);

export const useTableContext = <
  DATA_ROW extends Record<string, unknown> = Record<string, unknown>,
>() => {
  const tableProps = useContext(TableContext);

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
        <Icon name="Minus" ariaLabel="Unknown"  />
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
  status,
  entityName,
  revealDroppedColumns = false,
  scrollFade = true,
}: TableProps<DATA_ROW>) {
  sortTypes = {
    health: (row1, row2) => {
      return compareHealth(row2.values.health, row1.values.health) || 0;
    },
    ...sortTypes,
  };

  const stringifyFilter = useMemo(() => {
    return (rows: Row<object>[], columnIds: string[], value) => {
      const searchTerm = (value || '').toLowerCase();
      const filteredRows = rows.filter((row) => {
        return columnIds.some((columnId) =>
          String(row.values[columnId]).toLowerCase().includes(searchTerm),
        );
      });
      return filteredRows;
    };
  }, []);

  const formattedInitiallySelectedRows = useMemo(() => {
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

  const [rowHeight, setRowHeight] = useState<TableHeightKeyType>('h40');

  const [syncScrollListener, setSyncScrollListener] = useState<
    ((event: Event) => void) | null
  >(null);

  const [hasScrollbar, setHasScrollbar] = useState<boolean>(false);

  const {
    headerGroups,
    rows,
    prepareRow,
    allColumns,
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
        hiddenColumns: revealDroppedColumns
          ? ['selection', DROPPED_COLUMNS_COLUMN_ID]
          : ['selection'],
      },
      disableMultiSort: true,
      autoResetSortBy: false,
      sortTypes,
      //@ts-ignore TODO investigate why this type is not matching
      globalFilter: stringifyFilter,
      autoResetHiddenColumns: false,
      // Threaded onto the react-table instance so `useDroppedColumns` only
      // injects its synthetic column when the feature is opted into.
      revealDroppedColumns,
      updateTableData,
    },
    useBlockLayout,
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    useRowSelect,
    useCheckbox,
    useDroppedColumns,
  );

  const hasResponsiveColumns = useMemo(
    () => columns.some((column) => column.dropAt != null),
    [columns],
  );
  const { ref: responsiveRef, width: containerWidth } =
    useContainerWidth<HTMLDivElement>();

  // Ids this effect has itself hidden for responsiveness, so it can release
  // exactly those when the container grows back — without clobbering columns a
  // consumer hid manually via the context-exposed `setHiddenColumns`.
  const responsivelyDroppedRef = useRef<Set<string>>(new Set());

  // State mirror of the dropped ids so the optional `revealDroppedColumns`
  // popover cell (which reads this through context) re-renders when it changes.
  const [droppedColumnIds, setDroppedColumnIds] = useState<Set<string>>(
    new Set(),
  );

  // Last `revealDroppedColumns` value the effect reconciled against, so a
  // runtime toggle re-runs the reveal-column logic even when the dropped set is
  // unchanged.
  const previousRevealRef = useRef(revealDroppedColumns);

  useEffect(() => {
    if (!hasResponsiveColumns) {
      return;
    }
    // Read ids from the table's resolved columns (react-table generates an id
    // for function accessors), not the raw config where `id`/`accessor` may be
    // absent or a function.
    const shouldDrop = new Set(
      allColumns
        .filter(
          (column) =>
            column.dropAt != null &&
            containerWidth != null &&
            containerWidth < column.dropAt,
        )
        .map((column) => column.id),
    );
    const previouslyDropped = responsivelyDroppedRef.current;
    const dropSetChanged =
      shouldDrop.size !== previouslyDropped.size ||
      [...shouldDrop].some((id) => !previouslyDropped.has(id));
    // Reconcile when the dropped set changed OR the reveal feature was toggled;
    // the latter must still update the reveal column's visibility even though
    // the same columns stay dropped.
    const revealChanged = previousRevealRef.current !== revealDroppedColumns;
    if (!dropSetChanged && !revealChanged) {
      return;
    }
    setHiddenColumns((previousHidden) => {
      const next = previousHidden.filter(
        (id) => !previouslyDropped.has(id) || shouldDrop.has(id),
      );
      shouldDrop.forEach((id) => {
        if (!next.includes(id)) next.push(id);
      });
      // Show the trailing "reveal" column only while at least one responsive
      // column is hidden and the feature is opted into; otherwise hide it.
      const shouldReveal = revealDroppedColumns && shouldDrop.size > 0;
      const withoutReveal = next.filter(
        (id) => id !== DROPPED_COLUMNS_COLUMN_ID,
      );
      return shouldReveal
        ? withoutReveal
        : [...withoutReveal, DROPPED_COLUMNS_COLUMN_ID];
    });
    previousRevealRef.current = revealDroppedColumns;
    if (dropSetChanged) {
      setDroppedColumnIds(shouldDrop);
      responsivelyDroppedRef.current = shouldDrop;
    }
  }, [
    hasResponsiveColumns,
    allColumns,
    containerWidth,
    setHiddenColumns,
    revealDroppedColumns,
  ]);

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
    status,
    entityName,
    syncScrollListener,
    setSyncScrollListener,
    setHasScrollbar,
    hasScrollbar,
    droppedColumnIds,
    scrollFade,
  };
  return (
    <TableContext.Provider
      //@ts-ignore
      value={contextValue}
    >
      <TableWrapper
        role="grid"
        className="table"
        ref={hasResponsiveColumns ? responsiveRef : undefined}
      >
        {children}
      </TableWrapper>
    </TableContext.Provider>
  );
}

Table.SingleSelectableContent = SingleSelectableContent;
Table.MultiSelectableContent = MultiSelectableContent;
Table.Search = Search;
Table.SearchWithQueryParams = SearchWithQueryParams;
Table.Sync = TableSync;
export { Table };
