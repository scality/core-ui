import React, { useState } from 'react';
import { action } from 'storybook/actions';
import {
  Column,
  EmptyCell,
  Table,
} from '../src/lib/components/tablev2/Tablev2.component';
import { Title } from './common';
import {
  BrowserRouter,
  BrowserRouter as Router,
  useLocation,
} from 'react-router-dom';
import { CellProps, Row } from 'react-table';
import { Box, Button } from '../src/lib/next';
import styled from 'styled-components';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { Modal } from '../src/lib/components/modal/Modal.component';
import { Stack } from '../src/lib/spacing';

const Flex = styled(Box)`
  display: flex;
`;

const info = {
  title: 'Components/Data Display/Table',
  component: Table,
};

export default info;

const data: Entry[] = [
  {
    id: 1,
    firstName: 'Sotiria-long-long-long-long-long',
    lastName: 'Agathangelou',
    age: undefined,
    health: 'healthy',
  },
  {
    id: 2,
    firstName: 'Stefania',
    lastName: 'Evgenios',
    age: 27,
    health: 'warning',
  },
  {
    id: 3,
    firstName: 'Yohann',
    lastName: 'Rodolph',
    age: 27,
    health: 'critical',
  },
  {
    id: 4,
    firstName: 'Ninette',
    lastName: 'Caroline',
    age: 31,
    health: 'healthy',
  },
];

type Entry = {
  id: number;
  firstName: string;
  lastName: string;
  age?: number;
  health: string;
};

// The default columns, and the reference for how a column declares its layout.
// All three alignments are here on purpose -- text reads left, a number right, a
// status centred -- and the two right-hand ones are also the sortable headers that
// are not left-aligned, where an end-aligned and a centred label have to keep
// their track.
const columns: Column<Entry>[] = [
  {
    Header: 'First Name',
    accessor: 'firstName',
    cellStyle: {
      width: 'unset',
      flex: 2,
      textAlign: 'left',
    },
    Cell: ({ value }) => {
      if (value) return <>{value}</>;
      return <EmptyCell />;
    },
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    cellStyle: {
      width: 'unset',
      flex: 2,
      textAlign: 'left',
    },
    // disable the sorting on this column
    disableSortBy: true,
  },
  {
    Header: 'Age',
    accessor: 'age',
    cellStyle: {
      width: 'unset',
      flex: 1,
      textAlign: 'right',
    },
  },
  {
    Header: 'Health',
    accessor: 'health',
    sortType: 'health',
    cellStyle: {
      width: 'unset',
      flex: 1,
      textAlign: 'center',
    },
  },
  // An action column: no header, one control per row. Without a control in a cell
  // there is nothing for a row-wide handler to steal, so this is what lets the
  // stories below demonstrate that an in-cell click stays its own.
  {
    Header: '',
    id: 'actions',
    // No values to order, so no caret.
    disableSortBy: true,
    // A fixed track, not a grow factor: the button is `white-space: nowrap` and
    // bleeds into the next column as soon as a grow share drops under its own
    // width. 8.5rem is 119px against a measured 113.84px button, so ~5px of slack
    // for a font that renders wider; it overflows below 8.13rem.
    cellStyle: {
      width: '8.5rem',
      flex: 'none',
      textAlign: 'right',
      // Cross axis, not `justifyContent`: a body cell's own vertical centring is
      // applied after `cellStyle` and takes the main axis.
      alignItems: 'flex-end',
    },
    Cell: () => (
      <Button
        size="inline"
        variant="outline"
        label="View details"
        icon={<Icon name="Eye" />}
        onClick={action('View details clicked')}
      />
    ),
  },
];
const getRowId = (row: Entry, relativeIndex: number) => {
  return row.lastName + ' ' + row.firstName;
};
export const SimpleContentTable = {
  render: ({}) => {
    const TableWithQueryParams = ({}) => {
      const location = useLocation();
      return (
        <>
          <span
            style={{
              color: 'white',
            }}
          >
            {location.search}
          </span>
          <Table
            columns={columns}
            data={data}
            defaultSortingKey={'health'}
            entityName={{
              en: {
                singular: 'user',
                plural: 'users',
              },
            }}
          >
            <div
              style={{
                margin: '16px 0',
              }}
            >
              <Table.SearchWithQueryParams />
            </div>
            <Table.SingleSelectableContent
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
            ></Table.SingleSelectableContent>
          </Table>
        </>
      );
    };

    return (
      <>
        <Title>Non Selectable Table</Title>
        <div
          style={{
            height: '300px',
            paddingTop: '20px',
          }}
        >
          <Table columns={columns} data={data} defaultSortingKey={'health'}>
            <Table.SingleSelectableContent
              rowHeight="h32"
              separationLineVariant="backgroundLevel3"
            />
          </Table>
        </div>
        <Title>Single Selectable Table</Title>
        <div
          style={{
            height: '300px',
            paddingTop: '20px',
          }}
        >
          <Table
            columns={columns}
            data={data}
            defaultSortingKey={'health'}
            getRowId={getRowId}
          >
            <Table.SingleSelectableContent
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
              selectedId={'Rodolph Yohann'}
              onRowSelected={action('Table Row Clicked')}
            />
          </Table>
        </div>
        <Title>Table with Search</Title>
        <div
          style={{
            height: '300px',
            paddingTop: '20px',
          }}
        >
          <Router>
            <TableWithQueryParams />
          </Router>
        </div>
        <Title>Empty table</Title>
        <div
          style={{
            height: '300px',
            paddingTop: '20px',
          }}
        >
          <Table
            columns={columns}
            data={[]}
            defaultSortingKey={'health'}
            getRowId={getRowId}
          >
            <Table.SingleSelectableContent
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
              onRowSelected={action('Table Row Clicked')}
            />
          </Table>
        </div>
        <Title>MultiSelect</Title>
        <div
          style={{
            height: '300px',
            paddingTop: '20px',
          }}
        >
          <Table
            columns={columns}
            data={data}
            defaultSortingKey={'health'}
            getRowId={getRowId}
            status="loading"
          >
            <Table.MultiSelectableContent
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
              onMultiSelectionChanged={(rows) => {
                console.log('Table.MultiSelectableContent selected row', rows);
              }}
            />
          </Table>
        </div>
      </>
    );
  },
};

export const asyncTable = {
  render: ({}) => {
    function DataComponent({
      data,
      loading,
      row,
    }: {
      row: Row<Entry>;
      loading: boolean;
      data: string;
    }) {
      return loading ? (
        <span>loading ...</span>
      ) : (
        <span> {`${row.values.firstName} ${data}`} </span>
      );
    }

    function RowAsync({ row }: { row: Row<Entry> }) {
      const [loading, setLoading] = React.useState(true);
      const [data, setData] = React.useState('');
      React.useEffect(() => {
        const timer = setTimeout(() => {
          setData('loaded async');
          setLoading(false);
        }, 1000);
        return () => {
          clearTimeout(timer);
        };
      }, []);
      return <DataComponent row={row} loading={loading} data={data} />;
    }

    const renderRowSubComponent = React.useCallback(
      ({ row, ...rest }: CellProps<Entry>) => {
        return <RowAsync row={row} />;
      },
      [],
    );
    const columnAsync: Column<Entry>[] = [
      {
        Header: 'First Name',
        accessor: 'firstName',
        cellStyle: {
          textAlign: 'left',
          width: 'unset',
          flex: 1,
        },
        Cell: renderRowSubComponent,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        cellStyle: {
          textAlign: 'left',
          width: 'unset',
          flex: 1,
        },
      },
      {
        Header: 'Age',
        accessor: 'age',
        cellStyle: {
          textAlign: 'left',
          width: 'unset',
          flex: 0.5,
        },
      },
      {
        Header: 'Health',
        accessor: 'health',
        sortType: 'health',
        cellStyle: {
          textAlign: 'left',
          width: 'unset',
          flex: 1,
        },
      },
    ];

    return (
      <>
        <Title>async cell Table</Title>
        <div
          style={{
            height: '300px',
            paddingTop: '20px',
          }}
        >
          <BrowserRouter>
            <Table
              columns={columnAsync}
              data={data}
              defaultSortingKey={'health'}
            >
              <Table.SearchWithQueryParams></Table.SearchWithQueryParams>
              <Table.SingleSelectableContent
                rowHeight="h40"
                separationLineVariant="backgroundLevel3"
                selectedId={'Rodolph Yohann'}
                onRowSelected={action('Table Row Clicked')}
              />
            </Table>
          </BrowserRouter>
        </div>
      </>
    );
  },
};
export const OnBottomCallback = {
  render: ({}) => {
    const columns: Column<{ index: number; value: number }>[] = [
      {
        Header: 'value',
        accessor: 'value',
        cellStyle: {
          textAlign: 'left',
        },
      },
    ];

    const createData = (indexStart = 0) => {
      const data: { index: number; value: number }[] = [];

      for (let i = 0; i < 100; i++) {
        data.push({
          index: indexStart + i,
          value: Math.floor(Math.random() * 1000),
        });
      }

      return data;
    };

    const [randomData, setRandomData] = useState(createData());

    const onBottom = () => {
      action('onBottom');
      setRandomData([...randomData, ...createData(randomData.length)]);
    };

    return (
      <>
        <Title>async cell Table</Title>
        <div
          style={{
            height: '300px',
            paddingTop: '20px',
          }}
        >
          <Table
            columns={columns}
            data={randomData}
            onBottom={onBottom}
            onBottomOffset={5}
            defaultSortingKey={'value'}
          >
            <Table.SingleSelectableContent
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
            />
          </Table>
        </div>
      </>
    );
  },
};

export const MultiTable = {
  render: ({}) => {
    const [data1, setData1] = useState([
      {
        name: 'test',
        volume: 1,
        capacity: '1Gi',
      },
      {
        name: 'test',
        volume: 1,
        capacity: '1Gi',
      },
      {
        name: 'test',
        volume: 1,
        capacity: '1Gi',
      },
    ]);

    const [data2, setData2] = useState([
      {
        name: 'test',
        volume: 1,
        capacity: '1Gi',
      },
      {
        name: 'test',
        volume: 1,
        capacity: '1Gi',
      },
      {
        name: 'test',
        volume: 1,
        capacity: '1Gi',
      },
    ]);
    const columns2: Column<(typeof data2)[number]>[] = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Volume',
        accessor: 'volume',
      },
      {
        Header: 'Capacity',
        accessor: 'capacity',
      },
    ];

    const demo = () => {
      setData1([
        {
          name: 'test',
          volume: 1,
          capacity: '1Gi',
        },
        {
          name: 'test',
          volume: 1,
          capacity: '1Gi',
        },
      ]);

      setData2([
        {
          name: 'test',
          volume: 1,
          capacity: '2Gi',
        },
        {
          name: 'test',
          volume: 1,
          capacity: '1Gi',
        },
      ]);
    };

    return (
      <>
        <Title>Several Multiselect</Title>
        <Flex justifyContent="center" gap="2rem">
          <Box width="500px" height="200px">
            <Table
              columns={columns2}
              data={data1}
              defaultSortingKey="name"
              initiallySelectedRowsIds={new Set([0, 2])}
            >
              <Table.MultiSelectableContent
                onMultiSelectionChanged={(rows) => {
                  console.log(
                    'Table.MultiSelectableContent selected row',
                    rows,
                  );
                }}
              />
            </Table>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap="1rem"
          >
            <Button
              variant="secondary"
              label=">"
              onClick={() => {
                demo();
              }}
            />
            <Button
              variant="secondary"
              label="<"
              onClick={() => {
                demo();
              }}
            />
          </Box>
          <Box width="500px" height="200px">
            <Table columns={columns2} data={data2} defaultSortingKey={'health'}>
              <Table.MultiSelectableContent
                onMultiSelectionChanged={(rows) => {
                  console.log(
                    'Table.MultiSelectableContent selected row',
                    rows,
                  );
                }}
              />
            </Table>
          </Box>
        </Flex>
      </>
    );
  },
};

export const EmptyTable = {
  render: (args) => {
    const { background } = args;
    return (
      <Box width="500px" height="200px">
        <Table columns={columns} data={[]} defaultSortingKey={'firstName'}>
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant={background}
            onRowSelected={action('Table Row Clicked')}
          />
        </Table>
      </Box>
    );
  },
  argTypes: {
    background: {
      control: {
        type: 'select',
        description: 'Background color',
        defaultValue: 'backgroundLevel3',
      },
      options: [
        'backgroundLevel1',
        'backgroundLevel2',
        'backgroundLevel3',
        'backgroundLevel4',
      ],
    },
  },
};

export const LoadingTable = {
  render: ({}) => {
    return (
      <Box width="500px" height="200px">
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'health'}
          getRowId={getRowId}
          status="loading"
        >
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </Box>
    );
  },
};

export const ErrorTable = {
  render: ({}) => {
    return (
      <Box width="50rem" height="200px">
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'health'}
          getRowId={getRowId}
          status="error"
          entityName={{
            en: { singular: 'user', plural: 'users' },
            fr: { singular: 'utilisateur', plural: 'utilisateurs' },
          }}
        >
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel4"
            locale="en"
          />
        </Table>
      </Box>
    );
  },
};

export const TableWithSyncButton = {
  render: ({}) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSync = () => {
      action('Sync button clicked')();
      setIsLoading(true);

      // Simulate loading for 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    return (
      <Box width="500px" height="250px">
        <Title>Table with Sync Button</Title>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>Total: {data.length} items</Box>
          <Table.Sync
            onSync={handleSync}
            loading={isLoading}
            tooltipOverlay="Synchronize table data"
          />
        </Box>
        <Table columns={columns} data={data}>
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </Box>
    );
  },
};

export const TableWithViewAction = {
  render: () => {
    const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

    const columnsWithAction: Column<Entry>[] = [
      {
        Header: 'First Name',
        accessor: 'firstName',
        cellStyle: { width: 'unset', flex: 2, textAlign: 'left' },
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        cellStyle: { width: 'unset', flex: 2, textAlign: 'left' },
      },
      {
        Header: 'Health',
        accessor: 'health',
        cellStyle: { width: 'unset', flex: 1, textAlign: 'left' },
      },
      {
        Header: '',
        id: 'actions',
        // Same shape as the default columns' action column, and for the same
        // reason: on `flex: 1` the button hung 7px past its own column, and the
        // `display`/`justifyContent` it used to carry were both dead -- the cell's
        // own flex centring is applied after `cellStyle` and takes them.
        cellStyle: {
          width: '8.5rem',
          flex: 'none',
          textAlign: 'right',
          alignItems: 'flex-end',
        },
        Cell: ({ row }: CellProps<Entry>) => (
          <Button
            size="inline"
            variant="outline"
            label="View details"
            icon={<Icon name="Eye" />}
            onClick={() => setSelectedEntry(row.original)}
          />
        ),
      },
    ];

    return (
      <>
        <Box width="700px" height="260px">
          <Table
            columns={columnsWithAction}
            data={data}
            defaultSortingKey={'firstName'}
          >
            <Table.SingleSelectableContent
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
            />
          </Table>
        </Box>
        <Modal
          isOpen={selectedEntry !== null}
          close={() => setSelectedEntry(null)}
          title={`View Entry details`}
          role="dialog"
          footer={
            <Stack gap="r8" style={{ justifyContent: 'flex-end' }}>
              <Button
                variant="primary"
                label="Close"
                onClick={() => setSelectedEntry(null)}
              />
            </Stack>
          }
        >
          {selectedEntry && (
            <Stack direction="vertical" gap="r8">
              <div>
                <strong>First name</strong>: {selectedEntry.firstName}
              </div>
              <div>
                <strong>Last name</strong>: {selectedEntry.lastName}
              </div>
              <div>
                <strong>Age</strong>: {selectedEntry.age ?? '—'}
              </div>
              <div>
                <strong>Health</strong>: {selectedEntry.health}
              </div>
            </Stack>
          )}
        </Modal>
      </>
    );
  },
};

export const AutoScrollToSelected = {
  render: () => {
    const largeData: Entry[] = Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      firstName: `FirstName${index + 1}`,
      lastName: `LastName${index + 1}`,
      health: ['healthy', 'warning', 'critical'][index % 3],
    }));

    const [selectedId, setSelectedId] = useState<string>(
      'LastName80 FirstName80',
    );

    const handleRowSelected = (row: Row<Entry>) => {
      const rowId = `${row.original.lastName} ${row.original.firstName}`;
      setSelectedId(rowId);
    };

    const handleSelectRandom = () => {
      const randomIndex = Math.floor(Math.random() * largeData.length);
      const randomRow = largeData[randomIndex];
      setSelectedId(`${randomRow.lastName} ${randomRow.firstName}`);
    };

    return (
      <>
        <Title>Auto Scroll to Selected Row</Title>
        <Box mb={2}>
          <Button
            variant="secondary"
            label="Select Random Row"
            onClick={handleSelectRandom}
          />
          <Box mt={1}>Currently selected: {selectedId || 'None'}</Box>
        </Box>
        <div style={{ height: '400px' }}>
          <Table
            columns={columns}
            data={largeData}
            defaultSortingKey="firstName"
            getRowId={getRowId}
          >
            <Table.SingleSelectableContent
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
              selectedId={selectedId}
              onRowSelected={handleRowSelected}
              autoScrollToSelected
            />
          </Table>
        </div>
      </>
    );
  },
};

const responsiveColumns: Column<Entry>[] = [
  {
    Header: 'First Name',
    accessor: 'firstName',
    cellStyle: { width: 'unset', flex: 2, textAlign: 'left' },
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    cellStyle: { width: 'unset', flex: 2, textAlign: 'left' },
    dropAt: 700,
  },
  {
    Header: 'Age',
    accessor: 'age',
    cellStyle: { width: 'unset', flex: 1, textAlign: 'left' },
    dropAt: 550,
  },
  {
    // Long enough to outgrow its column as the frame narrows, on the tightest
    // track here and one that never drops, so the header ellipsis shows up early
    // and stays reachable.
    Header: 'Replication Health',
    accessor: 'health',
    sortType: 'health',
    cellStyle: { width: 'unset', flex: 1, textAlign: 'left' },
  },
];

export const ResponsiveColumnDrop = {
  render: () => {
    const [selected, setSelected] = useState<string | undefined>(undefined);

    return (
      <>
        <Title>Responsive column drop</Title>
        <div
          style={{
            height: '320px',
            width: '900px',
            minWidth: '320px',
            maxWidth: '100%',
            resize: 'horizontal',
            overflow: 'hidden',
            padding: '20px',
            border: '1px dashed currentColor',
            boxSizing: 'border-box',
          }}
        >
          <Table
            columns={responsiveColumns}
            data={data}
            defaultSortingKey={'health'}
            getRowId={getRowId}
          >
            <Table.SingleSelectableContent
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
              selectedId={selected}
              onRowSelected={(row) => setSelected(row.id)}
            />
          </Table>
        </div>
      </>
    );
  },
};

export const ResponsiveColumnDropWithReveal = {
  render: () => {
    const [selected, setSelected] = useState<string | undefined>(undefined);

    return (
      <>
        <Title>Responsive column drop with reveal</Title>
        <div
          style={{
            height: '320px',
            width: '900px',
            minWidth: '320px',
            maxWidth: '100%',
            resize: 'horizontal',
            overflow: 'hidden',
            padding: '20px',
            border: '1px dashed currentColor',
            boxSizing: 'border-box',
          }}
        >
          <Table
            columns={responsiveColumns}
            data={data}
            defaultSortingKey={'health'}
            getRowId={getRowId}
            revealDroppedColumns
          >
            <Table.SingleSelectableContent
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
              selectedId={selected}
              onRowSelected={(row) => setSelected(row.id)}
            />
          </Table>
        </div>
      </>
    );
  },
};
