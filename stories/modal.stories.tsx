import React, { useState } from 'react';
import { Modal } from '../src/lib/components/modal/Modal.component';
import { action } from '@storybook/addon-actions';
import { Wrapper } from './common';
import { Table } from '../src/lib/components/tablev2/Tablev2.component';
import { IconHelp } from '../src/lib/components/IconHelper';
import { Stack } from '../src/lib/spacing';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { useArgs } from '@storybook/preview-api';

export default {
  title: 'Components/Notification/Modal',
  component: Modal,
  decorators: [
    (story) => <Wrapper style={{ minHeight: '10vh' }}>{story()}</Wrapper>,
  ],
};

export const SimpleModal = {
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();
    console.log('simple modal args', args);
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

/*
export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <Modal
          close={action('close clicked')}
          isOpen={true}
          title="Hello"
          footer={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                text="No"
                size="base"
                outlined
                onClick={action('No clicked')}
              />
              <Button
                variant="buttonSecondary"
                text="Yes"
                size="base"
                onClick={action('Yes clicked')}
              />
            </div>
          }
        >
          <span>Do you want a cookie?</span>
        </Modal>
      </Wrapper>
    );
  },
};

export const CustomizeTitle = {
  render: ({}) => {
    return (
      <Wrapper>
        <Modal
          isOpen={true}
          title="Hello"
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
                variant='outline'
                onClick={action('No clicked')}
              />
              <Button
                variant="secondary"
                label="Yes"
                size="base"
                onClick={action('Yes clicked')}
              />
            </div>
          }
          subTitle={
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
          }
        >
          <div>Do you want some chocolate? :D</div>
        </Modal>
      </Wrapper>
    );
  },
};
*/

const Demo = (myargs, args) => () => {
  const [{ isOpen }, updateArgs] = myargs;
  console.log('demo args', args);
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
};

const Action = {
  render: ({}) => {
    const [displayed, setDisplayed] = useState(false);
    return (
      <>
        <Button
          label={'Show modal'}
          onClick={() => setDisplayed((disp) => !disp)}
        />
        <Modal
          close={() => setDisplayed((disp) => !disp)}
          isOpen={displayed}
          title="Hello Table"
          footer={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                label="No"
                variant="outline"
                onClick={action('No clicked')}
              />
              <Button
                variant="secondary"
                label="Yes"
                onClick={action('Yes clicked')}
              />
            </div>
          }
        >
          <span>Do you want a cookie?</span>
        </Modal>
      </>
    );
  },
};

export const WithinTable = {
  render: (args) => {
    const toto = useArgs();
    console.log('toto', toto);
    console.log('tqtq', args);

    const columns = [
      {
        Header: 'First Name',
        accessor: 'firstName',
        cellStyle: {
          textAlign: 'left',
        },
      },
      {
        Header: 'Actions',
        accessor: 'health',
        // Cell: <div>toto</div>,
        Cell: Demo(toto, args),
        // disable the sorting on this column
        disableSortBy: true,
      },
    ];
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
    return (
      <Wrapper>
        <div
          style={{
            height: '300px',
            paddingTop: '20px',
          }}
        >
          <Table columns={columns} data={data} defaultSortingKey={'firstName'}>
            <Table.SingleSelectableContent
              rowHeight="h32"
              separationLineVariant="backgroundLevel3"
              backgroundVariant="backgroundLevel1"
            />
          </Table>
        </div>
      </Wrapper>
    );
  },
  args: {
    title: 'Hello',
    children: <span>Do you want a cookie?</span>,
  },
};
