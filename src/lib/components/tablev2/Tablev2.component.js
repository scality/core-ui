//@flow
import React from 'react';
import { useTable, useSortBy, useBlockLayout, useRowSelect } from 'react-table';
import SingleSelectionContent from './SingleSelectionContent';
import MultiSelectionContent from './MultiSelectionContent';
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
  rowHeight: number,
  isMultiRowSelection?: false,
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
  isMultiRowSelection = false,
}: TableProps) {
  //map the sortFunction in the columns to this sortTypes
  const sortTypes = {};
  // we need to translate the row selection information in URL to the tr id
  // this is the information we should get from URL
  let defaultSelectedValue = 'Yohann';

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
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
    useBlockLayout,
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
        defaultSelectedValue,
        selectedRowIds,
        selectedFlatRows,
      }}
    >
      {/* we need to use <div/> because of the virtualized table*/}
      <div {...getTableProps()} className="table">
        <SingleSelectionContent
          rowHeight={80}
          defaultSelectedKey={'firstName'}
          defaultSelectedValue={defaultSelectedValue}
        />
        {/* <MultiSelectionContent rowHeight={80} /> */}
      </div>
    </TableContext.Provider>
  );
}

export default Table;
