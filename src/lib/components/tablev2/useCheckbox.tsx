import { forwardRef, useEffect, useRef } from 'react';
import { Hooks } from 'react-table';
import styled from 'styled-components';

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50px;
`;

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

export const useCheckbox = (hooks: Hooks<object>) => {
  hooks.visibleColumns.push((columns) => {
    return [
      // Let's make a column for selection
      {
        id: 'selection',
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        // Header: ({ getToggleAllRowsSelectedProps }) => {
        Header: (props) => {
          return (
            <CheckBoxContainer>
              <IndeterminateCheckbox
                {...props.getToggleAllRowsSelectedProps()}
              />
            </CheckBoxContainer>
          );
        },
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => {
          return (
            <CheckBoxContainer>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </CheckBoxContainer>
          );
        },
        cellStyle: { width: '50px' },
        disableSortBy: true,
      },
      ...columns,
    ];
  });
};

useCheckbox.pluginName = 'useCheckbox';
