import { Modal } from '../src/lib/components/modal/Modal.component';
import { action } from '@storybook/addon-actions';
import { Wrapper } from './common';
import { Table } from '../src/lib/components/tablev2/Tablev2.component';
import { IconHelp } from '../src/lib/components/IconHelper';
import { Stack } from '../src/lib/spacing';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { useArgs } from '@storybook/preview-api';

export default {
  title: 'Components/Feedback/Modal',
  component: Modal,
  decorators: [
    (story) => <Wrapper style={{ minHeight: '10vh' }}>{story()}</Wrapper>,
  ],
};

export const SimpleModal = {
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();
    return (
      <>
        <Button
          onClick={() => updateArgs({ isOpen: true })}
          label={'Show Modal'}
        />
        <Modal
          close={() => updateArgs({ isOpen: false })}
          isOpen={isOpen}
          footer={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                label="No"
                size="default"
                variant="outline"
                onClick={() => updateArgs({ isOpen: false })}
              />
              <Button
                variant="secondary"
                label="Yes"
                size="inline"
                onClick={action('Yes clicked')}
              />
            </div>
          }
          {...args}
        />
      </>
    );
  },
  args: {
    title: 'Hello',
    children: <span>Do you want a cookie?</span>,
  },
};

export const CustomizeTitle = {
  ...SimpleModal,
  args: {
    close: null,
    title: 'Hello there',
    children: <span>Do you want a cookie?</span>,
    subTitle: (
      <Stack>
        <>Step 1/2</>
        <IconHelp
          tooltipMessage={
            <ul>
              <li>Hello, this is the tooltip of the modal</li>
            </ul>
          }
        />
      </Stack>
    ),
  },
};

const Demo = (myargs, args) => () => {
  const [{ isOpen }, updateArgs] = myargs;
  return (
    <>
      <Button
        onClick={() => updateArgs({ isOpen: true })}
        label={'Show Modal'}
      />
      <Modal
        close={() => updateArgs({ isOpen: false })}
        isOpen={isOpen}
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              label="No"
              size="default"
              variant="outline"
              onClick={() => updateArgs({ isOpen: false })}
            />
            <Button
              variant="secondary"
              label="Yes"
              size="inline"
              onClick={() => updateArgs({ isOpen: false })}
            />
          </div>
        }
        {...args}
      />
    </>
  );
};

export const WithinTable = {
  render: (args) => {
    const myArgs = useArgs();

    const columns = [
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
        Header: 'Actions',
        accessor: 'health',
        Cell: Demo(myArgs, args),
        // disable the sorting on this column
        disableSortBy: true,
      },
    ];
    const data = [
      {
        firstName: 'Sotiria',
        lastName: 'Agathangelou',
        health: 'healthy',
      },
    ];
    return (
      <div
        style={{
          height: '300px',
          paddingTop: '20px',
        }}
      >
        {/* @ts-expect-error */}
        <Table columns={columns} data={data} defaultSortingKey={'firstName'}>
          <Table.SingleSelectableContent
            rowHeight="h32"
            separationLineVariant="backgroundLevel3"
          />
        </Table>
      </div>
    );
  },
  args: {
    title: 'Hello',
    children: <span>Do you want a cookie?</span>,
  },
};
