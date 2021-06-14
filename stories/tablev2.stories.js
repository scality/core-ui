//@flow
import React from 'react';
import Table from '../src/lib/components/tablev2/Tablev2.component';
import { Styles } from '../src/lib/components/tablev2/Tablestyle';
import { Wrapper } from './common';
import {
  GlobalFilter,
  AddColumnFilter,
} from '../src/lib/components/tablev2/TableFilters';

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

  return (
    <Wrapper>
      <Styles>
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'health'}
          rowHeight={30}
          rowIDKey={'lastName'}
        >
          <Table.SimpleContent rowHeight={80} />
        </Table>
      </Styles>
    </Wrapper>
  );
};

export const SingleSelection = () => {
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
    },
  ];

  return (
    <Wrapper>
      <Styles>
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'health'}
          rowHeight={30}
          isCollapsible={false}
          isMultiRowSelection={false}
          rowIDKey={'lastName'}
        >
          <GlobalFilter />
          <AddColumnFilter />
          <Table.SingleSelectionContent
            rowHeight={80}
            defaultSelectedKey={'firstName'}
            defaultSelectedValue={'Yohann'}
          />
        </Table>
      </Styles>
    </Wrapper>
  );
};
export const MultiSelection = () => {
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
    { firstName: 'Yohann', lastName: 'Rodolph', age: 27, health: 'critical' },
    { firstName: 'Ninette', lastName: 'Caroline', age: 31, health: 'healthy' },
  ];

  const columns = [
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
    },
  ];

  return (
    <Wrapper>
      <Styles>
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'health'}
          isCollapsible={false}
          isMultiRowSelection={true}
          rowIDKey={'lastName'}
        >
          <Table.MultiSelectionContent rowHeight={80} />
        </Table>
      </Styles>
    </Wrapper>
  );
};

export const collapsible = () => {
  const data = [
    {
      isExpanded: true,
      instance: 'PlatformGlobalHealth',
      name: 'PlatformDegraded',
      description: 'The Platform is degraded',
      activesince: '2012-04-08 06:18:44',
      subRows: [
        {
          isExpanded: true,
          instance: 'Datacenter-1',
          name: 'PlatformServiceDegraded',
          description: 'The Platform services are degraded',
          activesince: '2012-04-08 06:18:44',
          subRows: [
            {
              isExpanded: true,
              instance: 'Observability',
              name: 'ObservailityServicesDegraded',
              description: 'The observability services are degraded',
              activesince: '2021-04-08 06:15:44',
              subRows: [
                {
                  isExpanded: true,
                  instance: 'Loki Service',
                  name: 'LokiServiceDegraded',
                  description:
                    'Service.app.kubernetes.io/name=loki is degraded',
                },
              ],
            },
          ],
        },
        {
          instance: 'Datacenter-2',
          name: 'PlatformServicesDegraded',
          description: 'The Platform services are degraded',
          activesince: '2021-05-06 22:22:22',
          subRows: [{ instance: 'Noura', lastName: 'Ernst', description: 27 }],
        },
      ],
    },
  ];

  const columns = [
    {
      Header: 'Instance',
      accessor: 'instance',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Active Since',
      accessor: 'activesince',
    },
  ];

  return (
    <Wrapper>
      <Styles>
        <Table
          columns={columns}
          data={data}
          defaultSortingKey={'health'}
          isCollapsible={true}
          isMultiRowSelection={false}
          rowIDKey={'instance'}
        >
          <Table.SingleSelectionContent
            rowHeight={60}
            defaultSelectedKey={'firstName'}
            defaultSelectedValue={'Yohann'}
          />
        </Table>
      </Styles>
    </Wrapper>
  );
};
