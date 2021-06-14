//@flow
import React from 'react';
import {
  useTable,
  useSortBy,
  useBlockLayout,
  useRowSelect,
  useExpanded,
  useFilters,
  useGlobalFilter,
} from 'react-table';
import { DefaultColumnFilter } from './TableFilters.js';
export type TableProps = {
  columns: {
    Header: string,
    accessor: string,
    sortFunction?: (a, b) => number,
  }[],
  defaultSortingKey: string, //we don't display the default sort key in the URL, so we need to specify here
  data: [],
  separationLineVariant?:
    | 'backgroundLevel1'
    | 'backgroundLevel2'
    | 'backgroundLevel3'
    | 'backgroundLevel4',
  rowHeight: number,
  isMultiRowSelection?: boolean,
  isCollapsible?: boolean,
  rowIDKey: string, // define which column represent the unique id of the table
  children: any,
};

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  },
);

export const TableContext = React.createContext<null>(null);

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
  //map the sortFunction in the columns to this sortTypes
  //there are some default ones
  const sortTypes = {};
  const getRowId = (row, relativeIndex) => {
    return row[rowIDKey];
  };

  const expandedIDs = {};
  function deepSearchRowIDs(tree) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i].subRows && tree[i].subRows.length > 0) {
        deepSearchRowIDs(tree[i].subRows);
      }
      if (tree[i].isExpanded) {
        expandedIDs[getRowId(tree[i])] = true;
      }
    }
    return expandedIDs;
  }

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  );

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
      defaultColumn,
      getRowId,
      initialState: {
        sortBy: [
          {
            id: defaultSortingKey,
            desc: false,
          },
        ],
        // If a row's id is set to true in this object, that row will have an expanded state. For example, { '3': true }
        expanded: deepSearchRowIDs(data),
        // data.reduce(
        //   (agg, item) => ({ ...agg, [getRowId(item)]: item.isExpanded }),
        //   {}
        // )
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
    (hooks) => {
      isMultiRowSelection &&
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
    },
    (hooks) => {
      isCollapsible &&
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            // Build our expander column
            id: 'expander', // Make sure it has an ID
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
              <span {...getToggleAllRowsExpandedProps()}>
                {isAllRowsExpanded ? (
                  <i className="fas fa-arrow-circle-down"></i>
                ) : (
                  <i className="fas fa-arrow-circle-right"></i>
                )}
              </span>
            ),
            Cell: ({ row }) => {
              // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
              // to build the toggle for expanding a row
              return row.canExpand ? (
                <span
                  {...row.getToggleRowExpandedProps({
                    style: {
                      // We can even use the row.depth property
                      // and paddingLeft to indicate the depth
                      // of the row
                      paddingLeft: `${row.depth * 2}rem`,
                    },
                  })}
                >
                  {row.isExpanded ? (
                    <i className="fas fa-arrow-circle-down"></i>
                  ) : (
                    <i className="fas fa-arrow-circle-right"></i>
                  )}
                </span>
              ) : null;
            },
          },
          ...columns,
        ]);
    },
  );
  console.log('columns', columns);
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

export default Table;
