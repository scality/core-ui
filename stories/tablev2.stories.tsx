import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import {
  Column,
  EmptyCell,
  Table,
} from '../src/lib/components/tablev2/Tablev2.component';
import { Wrapper, Title } from './common';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { CellProps, Row } from 'react-table';
import { Box, Button } from '../src/lib/next';
import styled from 'styled-components';

const Flex = styled(Box)`
  display: flex;
`;

const info = {
  title: 'Components/V2/Table',
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

export const SimpleContentTable = ({}) => {
  const columns: Column<Entry>[] = [
    {
      Header: 'First Name',
      accessor: 'firstName',
      cellStyle: {
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
        textAlign: 'left',
      },
      // disable the sorting on this column
      disableSortBy: true,
    },
    {
      Header: 'Age',
      accessor: 'age',
      cellStyle: {
        width: '50px',
        textAlign: 'left',
      },
    },
    {
      Header: 'Health',
      accessor: 'health',
      sortType: 'health',
      cellStyle: {
        textAlign: 'left',
      },
    },
  ];

  const getRowId = (row: Entry, relativeIndex: number) => {
    return row.lastName + ' ' + row.firstName;
  };

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
        <Table columns={columns} data={data} defaultSortingKey={'health'}>
          <div
            style={{
              margin: '16px 0',
            }}
          >
            <Table.SearchWithQueryParams
              displayedName={{
                singular: 'person',
                plural: 'persons',
              }}
            />
          </div>
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
            backgroundVariant="backgroundLevel1"
            children={(Rows) => {
              return <>{Rows}</>;
            }}
          ></Table.SingleSelectableContent>
        </Table>
      </>
    );
  };

  return (
    <Wrapper>
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
            backgroundVariant="backgroundLevel1"
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
            backgroundVariant="backgroundLevel1"
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
            backgroundVariant="backgroundLevel1"
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
        >
          <Table.MultiSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
            backgroundVariant="backgroundLevel1"
            onMultiSelectionChanged={(rows) => {
              console.log('Table.MultiSelectableContent selected row', rows);
            }}
          />
        </Table>
      </div>
    </Wrapper>
  );
};

export const asyncTable = ({}) => {
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
      },
      Cell: renderRowSubComponent,
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      cellStyle: {
        textAlign: 'left',
      },
    },
    {
      Header: 'Age',
      accessor: 'age',
      cellStyle: {
        width: '50px',
        textAlign: 'left',
      },
    },
    {
      Header: 'Health',
      accessor: 'health',
      sortType: 'health',
      cellStyle: {
        textAlign: 'left',
      },
    },
  ];

  return (
    <Wrapper>
      <Title>async cell Table</Title>
      <div
        style={{
          height: '300px',
          paddingTop: '20px',
        }}
      >
        <Table columns={columnAsync} data={data} defaultSortingKey={'health'}>
          <Table.SingleSelectableContent
            rowHeight="h40"
            separationLineVariant="backgroundLevel3"
            backgroundVariant="backgroundLevel1"
            selectedId={'Rodolph Yohann'}
            onRowSelected={action('Table Row Clicked')}
          />
        </Table>
      </div>
    </Wrapper>
  );
};
export const OnBottomCallback = ({}) => {
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
    <Wrapper>
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
            backgroundVariant="backgroundLevel1"
          />
        </Table>
      </div>
    </Wrapper>
  );
};

export const MultiTable = ({}) => {
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
  const columns2: Column<typeof data2[number]>[] = [
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
    <Wrapper>
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
                console.log('Table.MultiSelectableContent selected row', rows);
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
                console.log('Table.MultiSelectableContent selected row', rows);
              }}
            />
          </Table>
        </Box>
      </Flex>
    </Wrapper>
  );
};
