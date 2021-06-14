//@flow
import React, { useContext } from 'react';
import { useAsyncDebounce } from 'react-table';
import { TableContext } from './Tablev2.component';

// Define a default UI for filtering
export function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

export function GlobalFilter() {
  const { preGlobalFilteredRows, globalFilter, setGlobalFilter } = useContext(
    TableContext,
  );
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Total:
      {count}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`search`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  );
}

export function AddColumnFilter() {
  const { setFilter } = useContext(TableContext);
  const columnID = 'health';

  return (
    <input
      placeholder={'health'}
      onChange={(e) => setFilter(columnID, e.target.value)}
    />
  );
}
