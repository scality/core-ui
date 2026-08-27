import { useState } from 'react';
import { Table, TableProps } from './Tablev2.component';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

describe('TableV2 responsive columns', () => {
  // jsdom ships no ResizeObserver and getBoundingClientRect always reports 0,
  // so we stub both to drive the container width the Table measures.
  let mockWidth = 1000;
  const originalResizeObserver = global.ResizeObserver;
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  beforeAll(() => {
    class ResizeObserverMock {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    // @ts-expect-error assigning a stub to the global
    global.ResizeObserver = ResizeObserverMock;
    Element.prototype.getBoundingClientRect = function () {
      return { width: mockWidth, height: 600 } as DOMRect;
    };
  });

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver;
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  const responsiveColumns: TableProps['columns'] = [
    { Header: 'First Name', accessor: 'firstName' },
    { Header: 'Last Name', accessor: 'lastName' },
    { Header: 'Age', accessor: 'age', dropAt: 500 },
    { Header: 'Health', accessor: 'health', sortType: 'health' },
  ];

  const renderResponsiveTable = () =>
    render(
      <div>
        <Table columns={responsiveColumns} data={data}>
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </div>,
    );

  test('it keeps a droppable column visible when the table is wide enough', async () => {
    mockWidth = 1000;
    renderResponsiveTable();
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
  });

  test('it hides a droppable column when the table is too narrow', async () => {
    mockWidth = 400;
    renderResponsiveTable();

    await waitFor(() =>
      expect(screen.queryByText('Age')).not.toBeInTheDocument(),
    );
    // columns without a dropAt stay visible at any width
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
  });

  test('it hides a droppable column defined with a function accessor when narrow', async () => {
    mockWidth = 400;
    const columns: TableProps['columns'] = [
      { Header: 'First Name', accessor: 'firstName' },
      {
        Header: 'Full Name',
        id: 'fullName',
        accessor: (row) => `${row.firstName} ${row.lastName}`,
        dropAt: 500,
      },
    ];
    render(
      <div>
        <Table columns={columns} data={data}>
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </div>,
    );

    await waitFor(() =>
      expect(screen.queryByText('Full Name')).not.toBeInTheDocument(),
    );
    expect(screen.getByText('First Name')).toBeInTheDocument();
  });

  const renderRevealTable = () =>
    render(
      <div>
        <Table columns={responsiveColumns} data={data} revealDroppedColumns>
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </div>,
    );

  test('lets the user read a dropped column value from a per-row popover', async () => {
    mockWidth = 400;
    renderRevealTable();

    // Age (dropAt 500) is no longer shown inline at 400px wide...
    await waitFor(() =>
      expect(screen.queryByText('Age')).not.toBeInTheDocument(),
    );

    // ...but each row offers a trigger that reveals it.
    const triggers = await screen.findAllByRole('button', {
      name: /show 1 hidden column/i,
    });
    await userEvent.click(triggers[0]);

    const popover = screen.getByRole('dialog');
    expect(within(popover).getByText('Age')).toBeInTheDocument();
    expect(within(popover).getByText('90')).toBeInTheDocument();
  });

  test('does not offer the reveal trigger while every column fits', async () => {
    mockWidth = 1000;
    renderRevealTable();
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /hidden column/i }),
    ).not.toBeInTheDocument();
  });

  test('shows no reveal trigger when the feature is not opted into', async () => {
    mockWidth = 400;
    renderResponsiveTable();

    await waitFor(() =>
      expect(screen.queryByText('Age')).not.toBeInTheDocument(),
    );
    expect(
      screen.queryByRole('button', { name: /hidden column/i }),
    ).not.toBeInTheDocument();
  });

  test('starts offering the reveal trigger when the feature is enabled while a column is already dropped', async () => {
    mockWidth = 400;
    const TogglingTable = () => {
      const [reveal, setReveal] = useState(false);
      return (
        <div>
          <button type="button" onClick={() => setReveal(true)}>
            enable reveal
          </button>
          <Table
            columns={responsiveColumns}
            data={data}
            revealDroppedColumns={reveal}
          >
            <Table.SingleSelectableContent
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
            />
          </Table>
        </div>
      );
    };
    render(<TogglingTable />);

    // Age is dropped, but with the feature still off there is no reveal trigger.
    await waitFor(() =>
      expect(screen.queryByText('Age')).not.toBeInTheDocument(),
    );
    expect(
      screen.queryByRole('button', { name: /hidden column/i }),
    ).not.toBeInTheDocument();

    // Turning the feature on — while the same column stays dropped — reveals it.
    await userEvent.click(
      screen.getByRole('button', { name: /enable reveal/i }),
    );
    expect(
      await screen.findAllByRole('button', { name: /show 1 hidden column/i }),
    ).not.toHaveLength(0);
  });
});

describe('TableV2 row click vs in-cell controls', () => {
  const withButtonColumns: TableProps['columns'] = [
    { Header: 'First Name', accessor: 'firstName' },
    {
      Header: 'Action',
      accessor: 'lastName',
      disableSortBy: true,
      Cell: ({ row }) => (
        <button onClick={() => row.original.onAction()}>
          Detach {row.original.firstName}
        </button>
      ),
    },
  ];

  const renderWithAction = (onRowSelected, onAction) =>
    render(
      <div>
        <Table
          columns={withButtonColumns}
          data={data.map((entry) => ({ ...entry, onAction }))}
          defaultSortingKey={'firstName'}
        >
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
            onRowSelected={onRowSelected}
          />
        </Table>
      </div>,
    );

  it('leaves the row unselected when a button inside a cell is clicked', async () => {
    const onRowSelected = jest.fn();
    const onAction = jest.fn();
    renderWithAction(onRowSelected, onAction);

    await userEvent.click(screen.getByRole('button', { name: /Detach Ninette/ }));

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onRowSelected).not.toHaveBeenCalled();
  });

  it('still selects the row when the click lands on plain cell content', async () => {
    const onRowSelected = jest.fn();
    const onAction = jest.fn();
    renderWithAction(onRowSelected, onAction);

    await userEvent.click(screen.getByText('Ninette'));

    expect(onRowSelected).toHaveBeenCalledTimes(1);
    expect(onAction).not.toHaveBeenCalled();
  });

  it('leaves the row unselected when a button inside a cell is activated by keyboard', async () => {
    const onRowSelected = jest.fn();
    const onAction = jest.fn();
    renderWithAction(onRowSelected, onAction);

    const button = screen.getByRole('button', { name: /Detach Ninette/ });
    button.focus();
    await userEvent.keyboard('{Enter}');

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onRowSelected).not.toHaveBeenCalled();
  });

  it('still selects the row on Enter when the row itself has focus', async () => {
    const onRowSelected = jest.fn();
    const onAction = jest.fn();
    const { getAllByRole } = renderWithAction(onRowSelected, onAction);

    const row = getAllByRole('row')[1];
    row.focus();
    await userEvent.keyboard('{Enter}');

    expect(onRowSelected).toHaveBeenCalledTimes(1);
    expect(onAction).not.toHaveBeenCalled();
  });
});

describe('TableV2 truncated header labels', () => {
  // jsdom reports 0 for both, so the widths have to be forced. `title` is only
  // offered once the label really is cut off — this is the difference between a
  // useful affordance and a tooltip on every header in the table.
  const stubLabelWidths = (scrollWidth: number, clientWidth: number) => {
    const proto = window.HTMLSpanElement.prototype;
    const original = {
      scrollWidth: Object.getOwnPropertyDescriptor(proto, 'scrollWidth'),
      clientWidth: Object.getOwnPropertyDescriptor(proto, 'clientWidth'),
    };
    Object.defineProperty(proto, 'scrollWidth', {
      configurable: true,
      get: () => scrollWidth,
    });
    Object.defineProperty(proto, 'clientWidth', {
      configurable: true,
      get: () => clientWidth,
    });
    return () => {
      if (original.scrollWidth) {
        Object.defineProperty(proto, 'scrollWidth', original.scrollWidth);
      } else {
        delete (proto as Record<string, unknown>).scrollWidth;
      }
      if (original.clientWidth) {
        Object.defineProperty(proto, 'clientWidth', original.clientWidth);
      } else {
        delete (proto as Record<string, unknown>).clientWidth;
      }
    };
  };

  const renderTable = () =>
    render(
      <div>
        <Table columns={columns} data={data} defaultSortingKey={'firstName'}>
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </div>,
    );

  it('offers the full label when the header is ellipsized', async () => {
    const restore = stubLabelWidths(400, 80);
    try {
      renderTable();
      await waitFor(() =>
        expect(screen.getByTitle('First Name')).toBeInTheDocument(),
      );
    } finally {
      restore();
    }
  });

  it('offers no label when the header fits', async () => {
    const restore = stubLabelWidths(80, 80);
    try {
      renderTable();
      await waitFor(() => screen.getAllByRole('columnheader'));
      expect(screen.queryByTitle('First Name')).not.toBeInTheDocument();
    } finally {
      restore();
    }
  });

  it('offers no label when the header is not a string', async () => {
    const restore = stubLabelWidths(400, 80);
    try {
      render(
        <div>
          <Table
            columns={[
              { Header: <span>Rendered</span>, accessor: 'firstName' },
              ...columns.slice(1),
            ]}
            data={data}
            defaultSortingKey={'firstName'}
          >
            <Table.SingleSelectableContent
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
            />
          </Table>
        </div>,
      );
      await waitFor(() => screen.getAllByRole('columnheader'));
      expect(screen.queryByTitle('Rendered')).not.toBeInTheDocument();
      expect(screen.getByText('Rendered')).toBeInTheDocument();
    } finally {
      restore();
    }
  });
});
