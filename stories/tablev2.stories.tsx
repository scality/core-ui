import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
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
      textAlign: 'left',
    },
  },
  {
    Header: 'Health',
    accessor: 'health',
    sortType: 'health',
    cellStyle: {
      width: 'unset',
      flex: 1,
      textAlign: 'left',
    },
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
