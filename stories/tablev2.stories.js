//@flow
import React from 'react';
import TableV2 from '../src/lib/components/tablev2/Tablev2.component';
import { Styles } from '../src/lib/components/tablev2/Tablestyle';
import { Wrapper } from './common';

export default {
  title: 'Components/V2/Table',
  component: TableV2,
};

export const Default = () => {
  const data = [
    { firstName: 'Sotiria', lastName: 'Vangelis', age: 30 },
    { firstName: 'Stefania', lastName: 'Evgenios', age: 27 },
    { firstName: 'Yohann', lastName: 'Rodolph', age: 27 },
    { firstName: 'Ninette', lastName: 'Caroline', age: 31 },
  ];

  const columns = React.useMemo(
    () => [
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
        Header: 'Visits',
        accessor: 'visits',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
      },
    ],
    [],
  );
  return (
    <Wrapper>
      <Styles>
        <TableV2 columns={columns} data={data} />
      </Styles>
    </Wrapper>
  );
};
