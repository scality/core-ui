import { forwardRef, useEffect, useRef } from 'react';

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  console.log('rest', rest);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

export const useCheckbox = (hooks) => {
  hooks.visibleColumns.push((columns) => [
    // Let's make a column for selection
    {
      id: 'selection',
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header: ({ getToggleAllRowsSelectedProps }) => (
        <div style={{ width: '50px' }}>
          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        </div>
      ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }) => {
        return (
          <div style={{ width: '50px' }}>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        );
      },
    },
    ...columns,
  ]);
};

useCheckbox.pluginName = 'useCheckbox';
