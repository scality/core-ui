import { forwardRef, MutableRefObject, useEffect, useRef } from 'react';
import { Hooks, TableToggleAllRowsSelectedProps } from 'react-table';
import styled from 'styled-components';

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50px;
`;

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  TableToggleAllRowsSelectedProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef<HTMLInputElement>();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    (resolvedRef as MutableRefObject<HTMLInputElement>).current.indeterminate =
      indeterminate;
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
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => {
          return (
            <CheckBoxContainer>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </CheckBoxContainer>
          );
        },
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
