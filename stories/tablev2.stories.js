//@flow
import React from 'react';
import Table from '../src/lib/components/tablev2/Tablev2.component';
import { Wrapper } from './common';

export default {
  title: 'Components/V2/Table',
  component: Table,
};

export const SimpleContentTable = () => {
  const data = [
    {
      firstName: 'Sotiria',
      lastName: 'Vangelis',
      age: 30,
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

  return (
    <Wrapper>
      <Table
        columns={columns}
        data={data}
        defaultSortingKey={'health'}
        rowIDKey={'lastName'}
      >
        <Table.SimpleContent
          rowHeight={60}
          outerTableHeight={30}
          separationLineVariant="backgroundLevel3"
        />
      </Table>
    </Wrapper>
  );
};
