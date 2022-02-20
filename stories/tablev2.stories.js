//@flow
import React from 'react';
import { action } from '@storybook/addon-actions';
import Table from '../src/lib/components/tablev2/Tablev2.component';
import { Wrapper, Title } from './common';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

export default {
  title: 'Components/V2/Table',
  component: Table,
};

const data = [
  {
    firstName: 'Sotiria',
    lastName: 'Agathangelou',
    age: undefined,
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

export const SimpleContentTable = () => {
  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
      cellStyle: { textAlign: 'left' },
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      cellStyle: { textAlign: 'left' },
    },
    {
      Header: 'Age',
      accessor: 'age',
      cellStyle: { width: '50px', textAlign: 'left' },
    },
    {
      Header: 'Health',
      accessor: 'health',
      sortType: 'health',
      cellStyle: { textAlign: 'left' },
    },
  ];

  const getRowId = (row, relativeIndex) => {
    return row.lastName + ' ' + row.firstName;
  };

  const TableWithQueryParams = () => {
    const location = useLocation();
    return (
      <>
        <span style={{ color: 'white' }}>{location.search}</span>
        <Table columns={columns} data={data} defaultSortingKey={'health'}>
          <div style={{ margin: '16px 0' }}>
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
              return (
                // $FlowFixMe
                <><Rows /></>
              );
            }}
          ></Table.SingleSelectableContent>
        </Table>
      </>
    );
  };

  return (
    <Wrapper>
      <Title>Non Selectable Table</Title>
      <div style={{ height: '300px', paddingTop: '20px' }}>
        <Table columns={columns} data={data} defaultSortingKey={'health'}>
          <Table.SingleSelectableContent
            rowHeight="h32"
            separationLineVariant="backgroundLevel3"
            backgroundVariant="backgroundLevel1"
          />
        </Table>
      </div>
      <Title>Single Selectable Table</Title>
      <div style={{ height: '300px', paddingTop: '20px' }}>
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
      <div style={{ height: '300px', paddingTop: '20px' }}>
        <Router>
          <TableWithQueryParams />
        </Router>
      </div>
      <Title>Empty table</Title>
      <div style={{ height: '300px', paddingTop: '20px' }}>
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
    </Wrapper>
  );
};

export const asyncTable = () => {
  function DataComponent({ data, loading, row, rowProps }) {
    return loading ? (
      <span>loading ...</span>
    ) : (
      <span> {`${row.values.firstName} ${data}`} </span>
    );
  }

  function RowAsync({ row, rowProps }) {
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

    return (
      <DataComponent
        row={row}
        rowProps={rowProps}
        loading={loading}
        data={data}
      />
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const renderRowSubComponent = React.useCallback(
    ({ row, rowProps }) => <RowAsync row={row} rowProps={rowProps} />,
    [],
  );

  const columnAsync = [
    {
      Header: 'First Name',
      accessor: 'firstName',
      cellStyle: { textAlign: 'left' },
      Cell: renderRowSubComponent,
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      cellStyle: { textAlign: 'left' },
    },
    {
      Header: 'Age',
      accessor: 'age',
      cellStyle: { width: '50px', textAlign: 'left' },
    },
    {
      Header: 'Health',
      accessor: 'health',
      sortType: 'health',
      cellStyle: { textAlign: 'left' },
    },
  ];

  return (
    <Wrapper>
      <Title>async cell Table</Title>
      <div style={{ height: '300px', paddingTop: '20px' }}>
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

export const onBottomCallback = () => {
  const columns = [
    {
      Header: 'value',
      accessor: 'value',
      cellStyle: { textAlign: 'left' },
    },
  ];

  const createData = (indexStart = 0) => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        index: indexStart + i,
        value: Math.floor(Math.random() * 1000),
      });
    }
    return data;
  };

  const [randomData, setRandomData] = React.useState(createData());

  const onBottom = () => {
    action('onBottom');
    setRandomData([...randomData, ...createData(randomData.length)]);
  };

  return (
    <Wrapper>
      <Title>async cell Table</Title>
      <div style={{ height: '300px', paddingTop: '20px' }}>
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
