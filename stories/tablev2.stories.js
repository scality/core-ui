//@flow
import React from 'react';
import { action } from '@storybook/addon-actions';
import Table from '../src/lib/components/tablev2/Tablev2.component';
import { Wrapper, Title } from './common';

export default {
  title: 'Components/V2/Table',
  component: Table,
};

export const SimpleContentTable = () => {
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

  const [value, setValue] = React.useState('');
  const onChange = (value) => {
    setValue(value);
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
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'health'}
          getRowId={getRowId}
        >
          <div style={{ margin: '16px 0' }}>
            <Table.Search
              value={value}
              onChange={onChange}
              displayedName="peoples"
            />
          </div>
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
