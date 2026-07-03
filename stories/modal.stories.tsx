import React, { ReactNode, useState } from 'react';
import { Modal, ModalActions } from '../src/lib/components/modal/Modal.component';
import { action } from 'storybook/actions';
import { Wrapper } from './common';
import { Table } from '../src/lib/components/tablev2/Tablev2.component';
import { IconHelp } from '../src/lib/components/iconhelper/IconHelper';
import { Stack } from '../src/lib/spacing';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { useArgs } from 'storybook/preview-api';
import { InfoMessage } from '../src/lib/components/infomessage/InfoMessage.component';
import { Input } from '../src/lib/components/inputv2/inputv2';

export default {
  title: 'Components/Feedback/Modal',
  component: Modal,
  decorators: [
    (story) => <Wrapper style={{ minHeight: '10vh' }}>{story()}</Wrapper>,
  ],
  argTypes: {
    wide: { control: 'boolean', description: 'Allow modal to grow past 480px to fit content' },
  },
  // The `actions` prop nests rendered React elements inside a plain object.
  // Autodocs' dynamic "Show code" generator deep-walks that object into the
  // element fiber tree and overflows the stack, so serve the static story
  // source instead of re-serializing the rendered tree.
  parameters: { docs: { source: { type: 'code' } } },
};

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
          actions={{
            cancel: {
              onClick: () => updateArgs({ isOpen: false }),
            },
            confirm: {
              label: 'Save changes',
              icon: 'Save',
              onClick: action('Save changes clicked'),
            },
          }}
          {...args}
        />
      </>
    );
  },
  args: {
    title: 'Edit settings',
    children: <span>Make your changes below.</span>,
    wide: false,
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
          actions={{
            cancel: {
              onClick: () => updateArgs({ isOpen: false }),
            },
            confirm: {
              label: 'Delete node',
              variant: 'danger',
              icon: 'Delete',
              onClick: action('Delete node clicked'),
            },
          }}
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
    wide: false,
  },
};

/**
 * A destructive modal whose `confirm` stays disabled until the user
 * acknowledges the risk. The disabled `confirm` carries a `tooltip` explaining
 * why it can't be used yet — the main reason a `ModalAction` accepts a tooltip.
 */
export const DestructiveWithAcknowledgement = {
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();
    const [acknowledged, setAcknowledged] = useState(false);
    const close = () => {
      setAcknowledged(false);
      updateArgs({ isOpen: false });
    };
    return (
      <>
        <Button
          onClick={() => updateArgs({ isOpen: true })}
          label="Delete bucket"
          variant="danger"
          icon={<Icon name="Delete" />}
        />
        <Modal
          role="alertdialog"
          isOpen={isOpen}
          actions={{
            cancel: { onClick: close },
            confirm: {
              label: 'Delete bucket',
              variant: 'danger',
              icon: 'Delete',
              disabled: !acknowledged,
              tooltip: acknowledged
                ? undefined
                : {
                    overlay: 'Accept the risk before deleting',
                    placement: 'top',
                  },
              onClick: () => {
                action('Delete bucket clicked')();
                close();
              },
            },
          }}
          {...args}
        >
          <Stack direction="vertical" gap="r16">
            <span>
              Deleting <strong>my-bucket</strong> permanently removes all of its
              objects. This action cannot be undone.
            </span>
            <label
              style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
            >
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
              />
              I understand this action is irreversible.
            </label>
          </Stack>
        </Modal>
      </>
    );
  },
  args: {
    title: 'Delete bucket?',
    isOpen: false,
  },
};

/**
 * Exercises all three action slots, all right-aligned: `extra` (secondary
 * variant) is the leftmost of the group, then `cancel` (outline), then
 * `confirm` (primary, rightmost). Also the alignment regression case — with
 * or without `extra`, the group must hug the right edge.
 */
export const WithExtraAction = {
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
          actions={{
            extra: {
              label: 'Learn more',
              icon: 'External-link',
              onClick: action('Learn more clicked'),
            },
            cancel: {
              onClick: () => updateArgs({ isOpen: false }),
            },
            confirm: {
              label: 'Save changes',
              icon: 'Save',
              onClick: action('Save changes clicked'),
            },
          }}
          {...args}
        />
      </>
    );
  },
  args: {
    title: 'Edit settings',
    children: <span>Make your changes below.</span>,
    wide: false,
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
        actions={{
          cancel: {
            onClick: () => updateArgs({ isOpen: false }),
          },
          confirm: {
            label: 'Delete',
            variant: 'danger',
            icon: 'Delete',
            onClick: () => updateArgs({ isOpen: false }),
          },
        }}
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

export const WithLongTextContent = {
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();
    return (
      <>
        <Button
          onClick={() => updateArgs({ isOpen: true })}
          label="Open modal"
          variant="primary"
        />
        <Modal
          close={() => updateArgs({ isOpen: false })}
          isOpen={isOpen}
          actions={{
            cancel: {
              onClick: () => updateArgs({ isOpen: false }),
            },
            confirm: {
              label: 'Save',
              icon: 'Save',
              onClick: action('Save clicked'),
            },
          }}
          {...args}
        />
      </>
    );
  },
  args: {
    title: 'Edit bucket name',
    isOpen: false,
    wide: false,
    children: (
      <Stack direction="vertical" gap="r16">
        <InfoMessage
          title="Naming restrictions"
          content="Bucket names must be between 3 and 63 characters long and can only contain lowercase letters, numbers, and hyphens. They must start and end with a letter or number, cannot contain consecutive hyphens, and cannot look like an IP address (e.g. 192.168.1.1)."
        />
        <Input id="bucket-name" placeholder="my-bucket-name" />
      </Stack>
    ),
  },
};

const NODE_DATA = [
  { name: 'artesca-storage-node-eu-west-1a', status: 'Healthy', capacity: '128 TB', used: '97.4 TB', location: 'eu-west-1a' },
  { name: 'artesca-storage-node-eu-west-1b', status: 'Degraded', capacity: '128 TB', used: '112.8 TB', location: 'eu-west-1b' },
  { name: 'artesca-storage-node-us-east-1a', status: 'Healthy', capacity: '64 TB', used: '31.1 TB', location: 'us-east-1a' },
  { name: 'artesca-storage-node-us-east-1b', status: 'Offline', capacity: '64 TB', used: '0 TB', location: 'us-east-1b' },
  { name: 'artesca-storage-node-ap-south-1a', status: 'Healthy', capacity: '256 TB', used: '198.6 TB', location: 'ap-south-1a' },
  { name: 'artesca-storage-node-ap-south-1b', status: 'Healthy', capacity: '256 TB', used: '204.2 TB', location: 'ap-south-1b' },
];

const NODE_COLUMNS = [
  { Header: 'Node name', accessor: 'name' as const, cellStyle: { textAlign: 'left' as const } },
  { Header: 'Status', accessor: 'status' as const, cellStyle: { textAlign: 'left' as const } },
  { Header: 'Capacity', accessor: 'capacity' as const, cellStyle: { textAlign: 'right' as const } },
  { Header: 'Used', accessor: 'used' as const, cellStyle: { textAlign: 'right' as const } },
  { Header: 'Location', accessor: 'location' as const, cellStyle: { textAlign: 'left' as const } },
];

export const WithTableContent = {
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();
    return (
      <>
        <Button
          onClick={() => updateArgs({ isOpen: true })}
          label="View nodes"
          variant="primary"
        />
        <Modal
          wide
          close={() => updateArgs({ isOpen: false })}
          isOpen={isOpen}
          actions={{
            confirm: {
              label: 'Close',
              onClick: () => updateArgs({ isOpen: false }),
            },
          }}
          {...args}
        >
          <div style={{ height: '280px' }}>
            <Table
              columns={NODE_COLUMNS}
              data={NODE_DATA}
              defaultSortingKey="name"
            >
              <Table.SingleSelectableContent
                rowHeight="h32"
                separationLineVariant="backgroundLevel3"
              />
            </Table>
          </div>
        </Modal>
      </>
    );
  },
  args: {
    title: 'Storage nodes',
    isOpen: false,
  },
};

/**
 * Demonstrates the deprecated `footer` prop. Existing call sites can keep
 * using `footer` until they migrate to the structured `actions` prop. New
 * code should prefer `actions`.
 */
export const LegacyFooterProp = {
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();
    return (
      <>
        <Button
          onClick={() => updateArgs({ isOpen: true })}
          label={'Open modal (legacy footer)'}
          variant="primary"
        />
        <Modal
          close={() => updateArgs({ isOpen: false })}
          isOpen={isOpen}
          footer={
            <Stack gap="r8" style={{ justifyContent: 'flex-end' }}>
              <Button
                label="Cancel"
                variant="outline"
                onClick={() => updateArgs({ isOpen: false })}
              />
              <Button
                variant="primary"
                label="Save"
                onClick={action('Save clicked')}
              />
            </Stack>
          }
          {...args}
        />
      </>
    );
  },
  args: {
    title: 'Edit settings',
    children: <span>Make your changes below.</span>,
    wide: false,
  },
};

/** Renders a trigger button + modal, wiring open/close automatically. */
const ModalStory = ({
  label,
  variant = 'primary',
  title,
  children,
  actions,
  wide,
}: {
  label: string;
  variant?: 'primary' | 'outline' | 'danger';
  title: string;
  children: ReactNode;
  actions?: ModalActions;
  wide?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultActions: ModalActions = {
    confirm: { label: 'Close', onClick: () => setIsOpen(false) },
  };
  return (
    <>
      <Button onClick={() => setIsOpen(true)} label={label} variant={variant} />
      <Modal
        wide={wide}
        close={() => setIsOpen(false)}
        isOpen={isOpen}
        title={title}
        actions={actions ?? defaultActions}
      >
        {children}
      </Modal>
    </>
  );
};

const HTML_TABLE = (
  <table style={{ borderCollapse: 'collapse', width: 'max-content' }}>
    <thead>
      <tr>
        {['Node name', 'Status', 'Capacity', 'Used', 'Location'].map((h) => (
          <th key={h} style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #444', whiteSpace: 'nowrap' }}>
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {NODE_DATA.map((row) => (
        <tr key={row.name}>
          <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>{row.name}</td>
          <td style={{ padding: '8px 12px' }}>{row.status}</td>
          <td style={{ padding: '8px 12px' }}>{row.capacity}</td>
          <td style={{ padding: '8px 12px' }}>{row.used}</td>
          <td style={{ padding: '8px 12px' }}>{row.location}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const CORE_UI_TABLE = (
  <div style={{ height: '280px' }}>
    <Table columns={NODE_COLUMNS} data={NODE_DATA} defaultSortingKey="name">
      <Table.SingleSelectableContent rowHeight="h32" separationLineVariant="backgroundLevel3" />
    </Table>
  </div>
);

/**
 * Width layout stress-tests.
 * Each button opens a modal with a different content type so you can
 * verify the 480 px default / 90 vw max rules in one place.
 */
export const WidthLayoutCases = {
  render: () => (
    <Stack gap="r16">
      {/* 1. Short text — modal should stay at 480px minimum */}
      <ModalStory label="Short text" title="Short text">
        <span>Just a short sentence.</span>
      </ModalStory>

      {/* 2. Long text / form — should wrap at 480px, never push wider */}
      <ModalStory label="Long text + input" title="Edit bucket">
        <Stack direction="vertical" gap="r16">
          <InfoMessage
            title="Naming restrictions"
            content="Bucket names must be between 3 and 63 characters long and can only contain lowercase letters, numbers, and hyphens. They must start and end with a letter or number, cannot contain consecutive hyphens, and cannot look like an IP address (e.g. 192.168.1.1)."
          />
          <InfoMessage
            title="Region note"
            content="The bucket region cannot be changed after creation. Make sure to select the correct region before proceeding with the configuration."
          />
          <Input id="bucket-name" placeholder="my-bucket-name" />
          <Input id="bucket-region" placeholder="eu-west-1" />
        </Stack>
      </ModalStory>

      {/* 3. Native HTML <table> — wide: modal sizes to table content */}
      <ModalStory wide label="Native table" title="Storage nodes (HTML table)">
        {HTML_TABLE}
      </ModalStory>

      {/* 4. Core-UI Table — wide: modal sizes to table content */}
      <ModalStory wide label="Core-UI table" title="Storage nodes (core-ui Table)">
        {CORE_UI_TABLE}
      </ModalStory>

      {/* 5. Core-UI Table nested inside multiple wrappers — wide */}
      <ModalStory wide label="Nested table" title="Storage nodes (nested wrappers)">
        <div>
          <div style={{ padding: '8px' }}>
            <div>
              {CORE_UI_TABLE}
            </div>
          </div>
        </div>
      </ModalStory>

      {/* 6. Text above a core-UI table — wide: table drives width, text fills it */}
      <ModalStory wide label="Text + table" title="Mixed content">
        <Stack direction="vertical" gap="r16">
          <InfoMessage
            title="Review before confirming"
            content="The following nodes will be affected by this operation. Make sure all nodes are healthy before proceeding."
          />
          {CORE_UI_TABLE}
        </Stack>
      </ModalStory>
    </Stack>
  ),
};
