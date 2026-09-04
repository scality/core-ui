import { Table, TableProps } from './Tablev2.component';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { coreUIAvailableThemes } from '../../style/theme';

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
  { firstName: 'Sotiria', lastName: 'Agathangelou', age: 90 },
  { firstName: 'Stefania', lastName: 'Evgenios', age: 27 },
  { firstName: 'Yohann', lastName: 'Rodolph', age: 27 },
  { firstName: 'Ninette', lastName: 'Caroline', age: 31 },
];

const columns: TableProps['columns'] = [
  { Header: 'First Name', accessor: 'firstName' },
  { Header: 'Last Name', accessor: 'lastName' },
  { Header: 'Age', accessor: 'age' },
];

const renderMultiSelectTable = (
  props: {
    onMultiSelectionChanged?: jest.Mock;
    onSingleRowSelected?: jest.Mock;
  } = {},
) =>
  render(
    <ThemeProvider theme={coreUIAvailableThemes.artescaLight}>
      <Table columns={columns} data={data} defaultSortingKey="firstName">
        <Table.MultiSelectableContent
          rowHeight="h40"
          separationLineVariant="backgroundLevel3"
          {...props}
        />
      </Table>
    </ThemeProvider>,
  );

describe('MultiSelectableContent', () => {
  it('reports only checkbox-selected rows in onMultiSelectionChanged', async () => {
    const onMultiSelectionChanged = jest.fn();
    renderMultiSelectTable({ onMultiSelectionChanged });

    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    const rows = screen.getAllByRole('row');
    const targetRow = rows[1];
    const checkbox = within(targetRow).getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(onMultiSelectionChanged).toHaveBeenCalled();
    const lastCallRows = onMultiSelectionChanged.mock.calls.at(-1)![0];
    expect(lastCallRows).toHaveLength(1);
    expect(lastCallRows[0].original).toEqual(data[3]); // Ninette (firstName-sorted index 0)
  });

  it('does not include a previously single-clicked row in subsequent multi-selection', async () => {
    const onSingleRowSelected = jest.fn();
    const onMultiSelectionChanged = jest.fn();
    renderMultiSelectTable({ onSingleRowSelected, onMultiSelectionChanged });

    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    // Skip the header (rows[0]) — data rows are rows[1..4] sorted by firstName:
    // Ninette, Sotiria, Stefania, Yohann.

    // Simulate clicking the row body (not the checkbox) to trigger the
    // "view details" path. Click a data cell within the row.
    fireEvent.click(screen.getByText('Ninette'));

    expect(onSingleRowSelected).toHaveBeenCalledTimes(1);
    expect(onSingleRowSelected.mock.calls[0][0].original).toEqual(data[3]);

    // Re-fetch the rows because RenderRow is memoized inside the parent and
    // remounts on every parent render. The viewed row's checkbox must stay
    // unchecked — this is the contract that prevents stale rows from leaking
    // into multi-selection.
    const viewedRow = screen.getAllByRole('row')[1];
    expect(within(viewedRow).getByRole('checkbox')).not.toBeChecked();

    // Now check a different row's checkbox.
    const checkboxRow = screen.getAllByRole('row')[3]; // Stefania
    fireEvent.click(within(checkboxRow).getByRole('checkbox'));

    expect(onMultiSelectionChanged).toHaveBeenCalled();
    const lastCallRows = onMultiSelectionChanged.mock.calls.at(-1)![0];
    expect(lastCallRows).toHaveLength(1);
    expect(lastCallRows[0].original).toEqual(data[1]); // Stefania
  });

  it('keeps the active row checkbox unchecked across subsequent checkbox clicks', async () => {
    const onSingleRowSelected = jest.fn();
    const onMultiSelectionChanged = jest.fn();
    renderMultiSelectTable({ onSingleRowSelected, onMultiSelectionChanged });

    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    fireEvent.click(screen.getByText('Ninette'));

    const otherCheckboxRow = screen.getAllByRole('row')[3];
    fireEvent.click(within(otherCheckboxRow).getByRole('checkbox'));

    // The active row's checkbox stays unchecked even after another row's
    // checkbox click — visual highlight on the active row is driven by the
    // `isSelected` prop on the styled-component (covered in storybook).
    const activeRow = screen.getAllByRole('row')[1];
    expect(within(activeRow).getByRole('checkbox')).not.toBeChecked();
    expect(within(screen.getAllByRole('row')[3]).getByRole('checkbox')).toBeChecked();
  });
});

describe('MultiSelectableContent row click vs in-cell controls', () => {
  const columnsWithButton: TableProps['columns'] = [
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

  const renderWithAction = (
    onAction: jest.Mock,
    props: {
      onMultiSelectionChanged?: jest.Mock;
      onSingleRowSelected?: jest.Mock;
    } = {},
  ) =>
    render(
      <ThemeProvider theme={coreUIAvailableThemes.artescaLight}>
        <Table
          columns={columnsWithButton}
          data={data.map((entry) => ({ ...entry, onAction }))}
          defaultSortingKey="firstName"
        >
          <Table.MultiSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
            {...props}
          />
        </Table>
      </ThemeProvider>,
    );

  it('does not single-select the row when a button inside a cell is clicked', async () => {
    const onAction = jest.fn();
    const onSingleRowSelected = jest.fn();
    renderWithAction(onAction, { onSingleRowSelected });

    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));
    fireEvent.click(screen.getByRole('button', { name: /Detach Ninette/ }));

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onSingleRowSelected).not.toHaveBeenCalled();
  });

  it('does not multi-select the row when a button inside a cell is clicked', async () => {
    const onAction = jest.fn();
    const onMultiSelectionChanged = jest.fn();
    renderWithAction(onAction, { onMultiSelectionChanged });

    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));
    onMultiSelectionChanged.mockClear();
    fireEvent.click(screen.getByRole('button', { name: /Detach Ninette/ }));

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onMultiSelectionChanged).not.toHaveBeenCalled();
  });

  it('still single-selects the row when the click lands on plain cell content', async () => {
    const onAction = jest.fn();
    const onSingleRowSelected = jest.fn();
    renderWithAction(onAction, { onSingleRowSelected });

    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));
    fireEvent.click(screen.getByText('Ninette'));

    expect(onSingleRowSelected).toHaveBeenCalledTimes(1);
    expect(onAction).not.toHaveBeenCalled();
  });
});
