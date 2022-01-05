import Table from './Tablev2.component';
import React from 'react';
import { render } from '@testing-library/react';

jest.mock('./TableUtil', () => ({
  ...jest.requireActual('./TableUtil'),
  // since convertRemToPixels rely on getComputedStyle(document.documentElement) which is not available in jest
  // we mock it
  convertRemToPixels: () => 12,
}));

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => {
  return children({ height: 600, width: 600 });
});

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
    const { getAllByRole } = render(
      <div style={{ height: '400px' }}>
        <Table columns={columns} data={data} defaultSortingKey={'health'}>
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
            backgroundVariant="backgroundLevel1"
          />
        </Table>
      </div>,
    );

    // we check that the table is displaying all the data
    const rows = getAllByRole('row');
    expect(rows[4]).toHaveTextContent(/Ninette/i);
    expect(rows[1]).toHaveTextContent(/yohann/i);
    expect(rows.length).toBe(5);
  });

  test('it should sort by defaultSortingKey', async () => {
    const { getAllByRole } = render(
      <div style={{ height: '400px' }}>
        <Table columns={columns} data={data} defaultSortingKey={'firstName'}>
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
            backgroundVariant="backgroundLevel1"
          />
        </Table>
      </div>,
    );

    // we check that the table is displaying all the data
    const rows = getAllByRole('row');
    expect(rows[1]).toHaveTextContent(/ninette/i);
    expect(rows[4]).toHaveTextContent(/Yohann/i);
    expect(rows.length).toBe(5);
  });

  test('it should filterGlobally', async () => {
    const { getAllByRole } = render(
      <div style={{ height: '400px' }}>
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'firstName'}
          globalFilter="an"
        >
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
            backgroundVariant="backgroundLevel1"
          />
        </Table>
      </div>,
    );

    // we check that the table is displaying all the data
    const rows = getAllByRole('row');
    expect(rows[1]).toHaveTextContent(/an/i); //first name yoh-an-n
    expect(rows[2]).toHaveTextContent(/an/i); //last name agath-an-gelou
    expect(rows[3]).toHaveTextContent(/an/i); //first name stef-an-ia
    expect(rows.length).toBe(4);
  });
});
