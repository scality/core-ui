import Table, { useTableContext } from './Tablev2.component';
import React from 'react';
import { render } from '@testing-library/react';

// this is the equivalent of table.SingleSelectableContentProps
// but since the autoSizer from react-virtualized-auto-sizer is not working correctly in jest environment
// we need to use this 'mock' to make the test working
// this come directly from the basic example of react-table
// https://react-table.tanstack.com/docs/examples/basic
function TableChild() {
  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTableContext();

  return (
    <>
      <div>
        {headerGroups.map((headerGroup) => (
          <span {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <span {...column.getHeaderProps()}>
                {column.render('Header')}
              </span>
            ))}
          </span>
        ))}
      </div>
      <div {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <span {...row.getRowProps()} data-testid="row">
              {row.cells.map((cell) => {
                return (
                  <span {...cell.getCellProps()}>{cell.render('Cell')}</span>
                );
              })}
            </span>
          );
        })}
      </div>
    </>
  );
}

const data = [
  {
    firstName: 'Sotiria',
    lastName: 'Agathangelou',
    age: 90,
    health: 'healthy',
  },
  {
    firstName: 'Stefania',
    lastName: 'Evgenios',
    age: 27,
    health: 'warning',
  },
  {
    firstName: 'Yohann',
    lastName: 'Rodolph',
    age: 27,
    health: 'critical',
  },
  {
    firstName: 'Ninette',
    lastName: 'Caroline',
    age: 31,
    health: 'healthy',
  },
];

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Health',
    accessor: 'health',
    sortType: 'health',
  },
];

describe('TableV2', () => {
  test('it should display all the data', async () => {
    const { getAllByTestId } = render(
      <div style={{ height: '400px' }}>
        <Table columns={columns} data={data} defaultSortingKey={'health'}>
          <TableChild />
        </Table>
      </div>,
    );

    // we check that the table is displaying all the data
    const rows = getAllByTestId('row');
    expect(rows[3]).toHaveTextContent(/Ninette/i);
    expect(rows[0]).toHaveTextContent(/yohann/i);
    expect(rows.length).toBe(4);
  });

  test('it should sort by defaultSortingKey', async () => {
    const { getAllByTestId } = render(
      <div style={{ height: '400px' }}>
        <Table columns={columns} data={data} defaultSortingKey={'firstName'}>
          <TableChild />
        </Table>
      </div>,
    );

    // we check that the table is displaying all the data
    const rows = getAllByTestId('row');
    expect(rows[0]).toHaveTextContent(/ninette/i);
    expect(rows[3]).toHaveTextContent(/Yohann/i);
    expect(rows.length).toBe(4);
  });

  test('it should filterGlobally', async () => {
    const { getAllByTestId } = render(
      <div style={{ height: '400px' }}>
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'firstName'}
          globalFilter={'an'}
        >
          <TableChild />
        </Table>
      </div>,
    );

    // we check that the table is displaying all the data
    const rows = getAllByTestId('row');
    expect(rows[0]).toHaveTextContent(/an/i); //first name yoh-an-n
    expect(rows[1]).toHaveTextContent(/an/i); //last name agath-an-gelou
    expect(rows[2]).toHaveTextContent(/an/i); //first name stef-an-ia
    expect(rows.length).toBe(3);
  });
});
