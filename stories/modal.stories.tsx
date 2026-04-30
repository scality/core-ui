import { Modal } from '../src/lib/components/modal/Modal.component';
import { action } from 'storybook/actions';
import { Wrapper } from './common';
import { Table } from '../src/lib/components/tablev2/Tablev2.component';
import { IconHelp } from '../src/lib/components/iconhelper/IconHelper';
import { Stack } from '../src/lib/spacing';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { useArgs } from 'storybook/preview-api';

export default {
  title: 'Components/Feedback/Modal',
  component: Modal,
  decorators: [
    (story) => <Wrapper style={{ minHeight: '10vh' }}>{story()}</Wrapper>,
  ],
};

const FooterActions = ({ children }) => (
  <Stack gap="r8" style={{ justifyContent: 'flex-end' }}>
    {children}
  </Stack>
);

export const SimpleModal = {
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();
    return (
      <>
        <Button
          onClick={() => updateArgs({ isOpen: true })}
          label={'Open modal'}
          variant="primary"
        />
        <Modal
          close={() => updateArgs({ isOpen: false })}
          isOpen={isOpen}
          footer={
            <FooterActions>
              <Button
                label="Cancel"
                variant="outline"
                onClick={() => updateArgs({ isOpen: false })}
              />
              <Button
                variant="primary"
                label="Save changes"
                icon={<Icon name="Save" />}
                onClick={action('Save changes clicked')}
              />
            </FooterActions>
          }
          {...args}
        />
      </>
    );
  },
  args: {
    title: 'Edit settings',
    children: <span>Make your changes below.</span>,
  },
};

export const DestructiveModal = {
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();
    return (
      <>
        <Button
          onClick={() => updateArgs({ isOpen: true })}
          label={'Delete node'}
          variant="danger"
          icon={<Icon name="Delete" />}
        />
        <Modal
          role="alertdialog"
          isOpen={isOpen}
          footer={
            <FooterActions>
              <Button
                label="Cancel"
                variant="outline"
                onClick={() => updateArgs({ isOpen: false })}
              />
              <Button
                variant="danger"
                label="Delete node"
                icon={<Icon name="Delete" />}
                onClick={action('Delete node clicked')}
              />
            </FooterActions>
          }
          {...args}
        />
      </>
    );
  },
  args: {
    title: 'Delete node?',
    children: (
      <span>
        <strong>my-node-name</strong> will be permanently deleted, this action
        is irreversible.
      </span>
    ),
  },
};

export const CustomizeTitle = {
  ...SimpleModal,
  args: {
    close: null,
    title: 'Create bucket',
    children: <span>Fill in the details below.</span>,
    subTitle: (
      <Stack>
        <>Step 1/2</>
        <IconHelp
          tooltipMessage={
            <ul>
              <li>Complete all required fields before proceeding.</li>
            </ul>
          }
        />
      </Stack>
    ),
    isOpen: false,
  },
};

const Demo = (myargs, args) => () => {
  const [{ isOpen }, updateArgs] = myargs;
  return (
    <>
      <Button
        onClick={() => updateArgs({ isOpen: true })}
        label={'Delete'}
        variant="danger"
        icon={<Icon name="Delete" />}
        size="inline"
      />
      <Modal
        role="alertdialog"
        isOpen={isOpen}
        footer={
          <FooterActions>
            <Button
              label="Cancel"
              variant="outline"
              onClick={() => updateArgs({ isOpen: false })}
            />
            <Button
              variant="danger"
              label="Delete"
              icon={<Icon name="Delete" />}
              onClick={() => updateArgs({ isOpen: false })}
            />
          </FooterActions>
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
        cellStyle: { textAlign: 'left' },
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        cellStyle: { textAlign: 'left' },
      },
      {
        Header: 'Actions',
        accessor: 'health',
        Cell: Demo(myArgs, args),
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
      <div style={{ height: '300px', paddingTop: '20px' }}>
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
    title: 'Delete node?',
    children: <span>This action cannot be undone.</span>,
  },
};
