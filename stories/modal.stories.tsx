import React, { useState } from 'react';
import { Modal } from '../src/lib/components/modal/Modal.component';
import { Button } from '../src/lib/components/button/Button.component';
import { action } from '@storybook/addon-actions';
import { Wrapper } from './common';
import { Table } from '../src/lib/components/tablev2/Tablev2.component';
import { IconHelp } from '../src/lib/components/IconHelper';
import { Stack } from '../src/lib/spacing';
export default {
  title: 'Components/Notification/Modal',
  component: Modal,
};
export const Default = ({}) => {
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
};

export const CustomizeTitle = ({}) => {
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
        <span>Do you want some chocolate? :D</span>
      </Modal>
    </Wrapper>
  );
};

const Action = ({}) => {
  const [displayed, setDisplayed] = useState(false);
  return (
    <>
      <Button
        text={'Show modal'}
        onClick={() => setDisplayed((disp) => !disp)}
      />
      <Modal
        close={action('close clicked')}
        isOpen={displayed}
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
    </>
  );
};

export const WithinTable = ({}) => {
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
      Cell: Action,
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
};
