import { Table, TableProps } from './Tablev2.component';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('./TableUtils', () => ({
  ...jest.requireActual('./TableUtils'),
  // since convertRemToPixels rely on getComputedStyle(document.documentElement) which is not available in jest
  // we mock it
  convertRemToPixels: () => 12,
}));

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => {
  return children({
    height: 600,
    width: 600,
  });
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
const columns: TableProps['columns'] = [
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
      <div>
        <Table columns={columns} data={data} defaultSortingKey={'health'}>
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </div>
    );
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    // we check that the table is displaying all the data
    const rows = getAllByRole('row');
    expect(rows[4]).toHaveTextContent(/Ninette/i);
    expect(rows[1]).toHaveTextContent(/yohann/i);
    expect(rows.length).toBe(5);
  });
  test('it should sort by defaultSortingKey', async () => {
    const { getAllByRole } = render(
      <div>
        <Table columns={columns} data={data} defaultSortingKey={'firstName'}>
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </div>
    );
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    // we check that the table is displaying all the data
    const rows = getAllByRole('row');
    expect(rows[1]).toHaveTextContent(/ninette/i);
    expect(rows[4]).toHaveTextContent(/Yohann/i);
    expect(rows.length).toBe(5);
  });
  test('it should filterGlobally', async () => {
    const { getAllByRole } = render(
      <div>
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'firstName'}
          globalFilter="an"
        >
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </div>
    );
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    // we check that the table is displaying all the data
    const rows = getAllByRole('row');
    expect(rows[1]).toHaveTextContent(/an/i); //first name yoh-an-n

    expect(rows[2]).toHaveTextContent(/an/i); //last name agath-an-gelou

    expect(rows[3]).toHaveTextContent(/an/i); //first name stef-an-ia

    expect(rows.length).toBe(4);
  });

  test('it should not produce false positive when searching for JSON brace character', async () => {
    const { getAllByRole } = render(
      <div>
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'firstName'}
          globalFilter="{"
        >
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </div>
    );
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    const rows = getAllByRole('row');
    // only the header row should remain, no data rows
    expect(rows.length).toBe(1);
  });

  test('it should not produce false positive when searching for a column key name', async () => {
    const { getAllByRole } = render(
      <div>
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'firstName'}
          globalFilter="firstName"
        >
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </div>
    );
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    const rows = getAllByRole('row');
    // only the header row should remain, no data rows
    expect(rows.length).toBe(1);
  });

  test('it should not produce false positive when searching for ISO date millisecond component', async () => {
    const dateData = [
      { name: 'Alpha', createdAt: new Date('2023-01-01T00:00:00.000Z') },
      { name: 'Beta', createdAt: new Date('2023-06-15T12:30:45.123Z') },
    ];
    const dateColumns: TableProps['columns'] = [
      { Header: 'Name', accessor: 'name' },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: ({ value }: { value: Date }) => value.toLocaleDateString(),
      },
    ];

    const { getAllByRole } = render(
      <div>
        <Table
          columns={dateColumns}
          data={dateData}
          globalFilter=".000"
        >
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </div>
    );
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    const rows = getAllByRole('row');
    // only the header row should remain, no data rows
    expect(rows.length).toBe(1);
  });

  test('it should still match rows when search term appears in a column value', async () => {
    const { getAllByRole } = render(
      <div>
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'firstName'}
          globalFilter="Yohann"
        >
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </div>
    );
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    const rows = getAllByRole('row');
    expect(rows.length).toBe(2); // header + 1 matching data row
    expect(rows[1]).toHaveTextContent(/Yohann/i);
  });
});
