//@flow
import React, { useState } from "react";
import styled from "styled-components";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useRowSelect,
} from "react-table";
import makeData from "./makeData";
// A great library for fuzzy filtering/sorting items
import matchSorter from "match-sorter";
import Chips from "../chips/Chips.component";
import Select from "../select/Select.component";

type Props = {};

const ReactTableContainer = styled.div`
  padding: 1rem;
  font-family: "Lato";
  color: #ffffff;
  border-color: #2c3137;

  table {
    border-spacing: 0;
    width: 900px;
    .sc-select-container {
      width: 120px;
      height: 10px;
    }
    tr {
      :last-child {
        td {
          border-bottom: 0;
          font-weight: normal;
        }
      }
    }

    th {
      font-weight: bold;
      height: 56px;
    }

    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search`}
        style={{
          fontSize: "1.1rem",
          color: "#ffffff",
          border: "solid 1px #3b4045",
          width: "414px",
          height: "32px",
          borderRadius: "4px",
          backgroundColor: "#141416",
          fontFamily: "Lato",
          fontStyle: "italic",
          opacity: "0.5",
          lineHeight: "1.43",
          letterSpacing: "normal",
          paddingLeft: "10px",
        }}
      />
    </span>
  );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // use the select from core-ui
  const selectOptions = options.map((option, i) => ({
    label: `${option}`,
    value: option,
  }));
  const filterOption = selectOptions.find((sel) => sel.value === filterValue);

  // Render a multi-select box
  return (
    <Select
      name="default_select"
      options={selectOptions}
      onChange={(e) => {
        setFilter(e.value || undefined);
      }}
      placeholder="All"
      noOptionsMessage={() => "Not found"}
      value={filterOption}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

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
  }
);

function ReactTable(props: Props) {
  function Table({ columns, data }) {
    const filterTypes = React.useMemo(
      () => ({
        // Add a new fuzzyTextFilterFn filter type.
        fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
          return rows.filter((row) => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true;
          });
        },
      }),
      []
    );

    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
      }),
      []
    );

    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
      visibleColumns,
      preGlobalFilteredRows,
      setGlobalFilter,
    } = useTable(
      {
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes,
      },
      useFilters, // useFilters!
      useGlobalFilter, // useGlobalFilter!
      useSortBy,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: "selection",
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
      }
    );

    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <>
                          {"   "}
                          <i class="fas fa-sort-down"></i>
                        </>
                      ) : (
                        <>
                          {"   "}
                          <i class="fas fa-sort-up"></i>
                        </>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
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
                  if (
                    cell.column.Header === "Status" &&
                    cell.value === "single"
                  ) {
                    return (
                      <td {...cell.getCellProps()}>
                        <Chips text={cell.render("Cell")} variant="success" />
                      </td>
                    );
                  } else if (
                    cell.column.Header === "Status" &&
                    cell.value === "relationship"
                  ) {
                    return (
                      <td {...cell.getCellProps()}>
                        <Chips text={cell.render("Cell")} variant="warning" />
                      </td>
                    );
                  } else if (
                    cell.column.Header === "Status" &&
                    cell.value === "complicated"
                  ) {
                    return (
                      <td {...cell.getCellProps()}>
                        <Chips text={cell.render("Cell")} variant="danger" />
                      </td>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: "Age",
        accessor: "age",
        Filter: SliderColumnFilter,
        filter: "equals",
        disableSortBy: true,
      },
      {
        Header: "Visits",
        accessor: "visits",
        disableFilters: true,
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: SelectColumnFilter,
        filter: "includes",
        disableSortBy: true,
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
        disableSortBy: true,
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(20), []);
  const [selectedRows, setSelectedRows] = useState(0);
  return (
    <ReactTableContainer>
      <Table
        columns={columns}
        data={data}
        getTrProps={(state, rowInfo) => {
          return {
            className:
              rowInfo && rowInfo.original && rowInfo.original.status === "D"
                ? "status-refused"
                : "", // no effect
            style: {
              // works as expected
              color:
                rowInfo && rowInfo.original && rowInfo.original.status === "D"
                  ? "#121315"
                  : "#313123",
              opacity:
                rowInfo && rowInfo.original && rowInfo.original.status === "D"
                  ? 0.5
                  : 1.0,
            },
          };
        }}
      />
    </ReactTableContainer>
  );
}

export default ReactTable;
