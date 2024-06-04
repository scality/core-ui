import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import {
  Column,
  Table,
  TableProps,
} from '../../src/lib/components/tablev2/Tablev2.component';
import { BrowserRouter as Router } from 'react-router-dom';
import { CellProps, Row } from 'react-table';
import { Box, Button } from '../../src/lib/next';
import { Stack, Wrap } from '../../src/lib';
import { SingleSelectableContentProps } from '../../src/lib/components/tablev2/SingleSelectableContent';
import { useArgs } from '@storybook/preview-api';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  height: 150px;
`;

/* ---------------------------------- DATA ---------------------------------- */

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
      textAlign: 'left',
      flex: 1,
    },
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    cellStyle: {
      flex: 1,

      textAlign: 'left',
    },
    // disable the sorting on this column
    disableSortBy: true,
  },
  {
    Header: 'Age',
    accessor: 'age',
    cellStyle: {
      flex: 0.5,
      textAlign: 'left',
    },
  },
  {
    Header: 'Health',
    accessor: 'health',
    sortType: 'health',
    cellStyle: {
      flex: 0.5,
      textAlign: 'left',
    },
  },
];
const getRowId = (row: Entry, relativeIndex: number) => {
  return row.lastName + ' ' + row.firstName;
};

/* ---------------------------------- STORY --------------------------------- */

type SingleTable = TableProps & SingleSelectableContentProps;
type Story = StoryObj<SingleTable>;

const meta: Meta<SingleTable> = {
  title: 'Components/Data Display/Table',
  decorators: [
    (Story) => (
      <Router>
        <Box height={'300px'}>
          <Story />
        </Box>
      </Router>
    ),
  ],
  component: Table,
  render: ({ columns, data, ...rest }) => {
    // const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
    const [{ selectedId }, updateArgs] = useArgs();

    return (
      <Table
        columns={columns}
        data={data}
        defaultSortingKey={'health'}
        {...rest}
      >
        <Table.SingleSelectableContent
          rowHeight="h40"
          separationLineVariant={rest.separationLineVariant}
          selectedId={selectedId}
          onRowSelected={(row) => {
            action('Table Row Clicked')(row);
            updateArgs({ selectedId: row.id });
          }}
        />
      </Table>
    );
  },
  args: {
    // @ts-ignore
    columns: columns,
    data: data,
    defaultSortingKey: 'health',
  },
  argTypes: {
    separationLineVariant: {
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

export default meta;

export const Playground = {};

/* ---------------------------- SingleSelectTable --------------------------- */

export const SimpleTable: Story = {
  render: () => {
    return (
      <Table columns={columns} data={data} defaultSortingKey={'health'}>
        <Table.SingleSelectableContent
          rowHeight="h40"
          separationLineVariant="backgroundLevel3"
        />
      </Table>
    );
  },
};

export const SingleSelectTable: Story = {
  args: {
    // @ts-ignore
    getRowId: getRowId,
  },
};

export const TableStatus = {
  render: (args) => {
    return (
      <Wrap justifyContent="center" gap="2rem" flexDirection={'column'}>
        <StyledBox>
          <Table
            columns={columns}
            data={data}
            defaultSortingKey={'health'}
            status="loading"
          >
            <Table.SingleSelectableContent
              locale={args.locale}
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
            />
          </Table>
        </StyledBox>
        <StyledBox>
          <Table
            columns={columns}
            data={data}
            defaultSortingKey={'health'}
            status="error"
          >
            <Table.SingleSelectableContent
              locale={args.locale}
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
            />
          </Table>
        </StyledBox>
        <StyledBox>
          <Table columns={columns} data={[]} defaultSortingKey={'health'}>
            <Table.SingleSelectableContent
              locale={args.locale}
              rowHeight="h40"
              separationLineVariant="backgroundLevel3"
            />
          </Table>
        </StyledBox>
      </Wrap>
    );
  },
};

export const TableWithSearch: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Table columns={columns} data={data} defaultSortingKey={'health'}>
        <Table.Search
          value={value}
          onChange={(value) => {
            setValue(value);
            data.filter((data) => JSON.stringify(data).includes(value));
          }}
        />

        <Table.SingleSelectableContent
          rowHeight="h40"
          separationLineVariant="backgroundLevel3"
        />
      </Table>
    );
  },
};

export const TableWithSearchQueryParams: Story = {
  render: () => {
    return (
      <Table columns={columns} data={data} defaultSortingKey={'health'}>
        <Table.SearchWithQueryParams
          onChange={(value) => {
            data.filter((data) => JSON.stringify(data).includes(value));
          }}
        />

        <Table.SingleSelectableContent
          rowHeight="h40"
          separationLineVariant="backgroundLevel3"
        />
      </Table>
    );
  },
};

export const TableWithEntityName: Story = {
  render: (args) => {
    const [{ selectedId }, updateArgs] = useArgs();
    return (
      <Table
        columns={columns}
        data={data}
        defaultSortingKey={'health'}
        entityName={{
          en: { singular: 'user', plural: 'users' },
          fr: { singular: 'utilisateur', plural: 'utilisateurs' },
        }}
      >
        <Table.SearchWithQueryParams locale={args.locale} />
        <Table.SingleSelectableContent
          locale={args.locale}
          rowHeight="h40"
          separationLineVariant="backgroundLevel3"
          selectedId={selectedId}
          onRowSelected={(row) => {
            action('Table Row Clicked')(row);
            updateArgs({ selectedId: row.id });
          }}
        />
      </Table>
    );
  },
  argTypes: {
    locale: {
      options: ['en', 'fr'],
      control: 'radio',
    },
  },
};

export const AsyncTable: Story = {
  render: () => {
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
        <span> {`${row.values.health} ${data}`} </span>
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
        Cell: renderRowSubComponent,
      },
    ];

    return (
      <Table columns={columnAsync} data={data} defaultSortingKey={'health'}>
        <Table.SearchWithQueryParams></Table.SearchWithQueryParams>
        <Table.SingleSelectableContent
          rowHeight="h40"
          separationLineVariant="backgroundLevel3"
          selectedId={'Rodolph Yohann'}
          onRowSelected={action('Table Row Clicked')}
        />
      </Table>
    );
  },
};

export const OnBottomCallback: Story = {
  render: () => {
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
    );
  },
};

export const WithSeparationLine: Story = {
  render: () => {
    return (
      <Table columns={columns} data={data} defaultSortingKey={'health'}>
        <Table.SingleSelectableContent
          rowHeight="h40"
          separationLineVariant="backgroundLevel2"
        />
      </Table>
    );
  },
};

/* ---------------------------- MultiSelect Table --------------------------- */

export const MultiSelectTable = {
  render: () => {
    return (
      <Table columns={columns} data={data} defaultSortingKey={'health'}>
        <Table.MultiSelectableContent
          rowHeight="h40"
          separationLineVariant="backgroundLevel3"
          onMultiSelectionChanged={action(
            'Table.MultiSelectableContent selected row',
          )}
        />
      </Table>
    );
  },
};

/* ---------------------------- Multi Table --------------------------- */

export const MultiTable: Story = {
  render: () => {
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
        cellStyle: {
          textAlign: 'left',
          width: 'unset',
          flex: 1,
        },
      },
      {
        Header: 'Volume',
        accessor: 'volume',
        cellStyle: {
          textAlign: 'left',
          width: 'unset',
          flex: 1,
        },
      },
      {
        Header: 'Capacity',
        accessor: 'capacity',
        cellStyle: {
          textAlign: 'left',
          width: 'unset',
          flex: 1,
        },
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
      <Wrap justifyContent="center" gap="2rem" height={'200px'}>
        <Table
          columns={columns2}
          data={data1}
          defaultSortingKey="name"
          initiallySelectedRowsIds={new Set([0, 2])}
        >
          <Table.MultiSelectableContent
            onMultiSelectionChanged={action(
              'Table.MultiSelectableContent selected row',
            )}
          />
        </Table>

        <Stack direction="vertical" style={{ justifyContent: 'center' }}>
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
        </Stack>

        <Table columns={columns2} data={data2} defaultSortingKey={'health'}>
          <Table.MultiSelectableContent
            onMultiSelectionChanged={action(
              'Table.MultiSelectableContent selected row',
            )}
          />
        </Table>
      </Wrap>
    );
  },
};
