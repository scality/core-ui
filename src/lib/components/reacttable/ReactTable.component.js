//@flow
import React from "react";
import styled from "styled-components";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import makeData from "./makeData";
// A great library for fuzzy filtering/sorting items
import matchSorter from "match-sorter";
import Chips from "../chips/Chips.component";

type Props = {};

const ReactTableContainer = styled.div`
  padding: 1rem;
  font-family: "Lato";
  color: #ffffff;
  border-color: #2c3137;

  table {
    border-spacing: 0;
    width: 900px;

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

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

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
      useGlobalFilter // useGlobalFilter!
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
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
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
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },

      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Visits",
        accessor: "visits",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(20), []);

  return (
    <ReactTableContainer>
      <Table columns={columns} data={data} />
    </ReactTableContainer>
  );
}

export default ReactTable;
