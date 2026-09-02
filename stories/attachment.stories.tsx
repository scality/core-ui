import { action } from 'storybook/actions';
import React from 'react';
import {
  AttachmentProvider,
  AttachmentTable,
} from '../src/lib/organisms/attachments/AttachmentTable';

import { Box } from '../src/lib/next';
import { useTheme } from 'styled-components';
import { MemoryRouter } from 'react-router';
import { Icon } from '../src/lib';
import { AttachmentConfirmationModal } from '../src/lib/organisms/attachments/AttachmentConfirmationModal';
import {
  AttachmentAction,
  AttachmentOperation,
} from '../src/lib/organisms/attachments/AttachmentTypes';

export default {
  title: 'Components/AttachmentTable',
  component: AttachmentTable,
};

export const Playground = {
  render: () => {
    const theme = useTheme();
    return (
      <Box
        style={{ height: '100%', backgroundColor: theme.backgroundLevel4 }}
        p={'2rem'}
      >
        <AttachmentProvider>
          <AttachmentTable
            entityName={{ plural: 'users', singular: 'user' }}
            filteredEntities={{
              status: 'success',
              data: {
                number: 1,
                entities: [
                  { name: 'User A', id: 'test', type: 'USER' },
                  { name: 'User B', id: 'test', type: 'USER' },
                  { name: 'User C', id: 'test', type: 'USER' },
                ],
              },
            }}
            initialAttachmentOperations={[]}
            onEntitySearchChange={action('onEntitySearchChange')}
            searchEntityPlaceholder="Search user by name"
            initiallyAttachedEntities={[
              { name: 'User A', id: 'test', type: 'USER' },
            ]}
            initiallyAttachedEntitiesStatus={'success'}
            onAttachmentsOperationsChanged={() => {
              console.log('changed');
            }}
          />
        </AttachmentProvider>
      </Box>
    );
  },
};

export const FailToLoad = {
  render: () => {
    const theme = useTheme();
    return (
      <Box
        style={{ height: '100%', backgroundColor: theme.backgroundLevel4 }}
        p={'2rem'}
      >
        <AttachmentProvider>
          <AttachmentTable
            entityName={{ plural: 'users', singular: 'user' }}
            filteredEntities={{
              status: 'error',
            }}
            initialAttachmentOperations={[]}
            onEntitySearchChange={action('onEntitySearchChange')}
            searchEntityPlaceholder="Search user by name"
            initiallyAttachedEntities={[]}
            initiallyAttachedEntitiesStatus={'error'}
            onAttachmentsOperationsChanged={() => {
              console.log('changed');
            }}
          />
        </AttachmentProvider>
      </Box>
    );
  },
};

const ConfirmationEntityIcon = ({ type }: { type: string }) => (
  <Box display="flex" alignItems="center" gap={8}>
    <Icon name="Bucket" />
    {type}
  </Box>
);

export const ConfirmationModal = {
  render: () => {
    const theme = useTheme();
    // Enough rows to exceed the modal body height: the table must scroll
    // internally, the modal itself must not gain a scrollbar.
    const attachmentOperations: AttachmentOperation<string>[] = Array.from(
      { length: 24 },
      (_, index) => ({
        action: index % 4 === 0 ? AttachmentAction.REMOVE : AttachmentAction.ADD,
        entity: {
          name: `bucket-${String(index + 1).padStart(2, '0')}`,
          id: `id-${index + 1}`,
          type: 'Bucket',
        },
      }),
    );
    return (
      <MemoryRouter>
        <Box
          style={{ height: '100%', backgroundColor: theme.backgroundLevel4 }}
          p={'2rem'}
        >
          <p>Click “Save” to open the attachment confirmation modal.</p>
          <AttachmentConfirmationModal
            attachmentOperations={attachmentOperations}
            getAttachmentMutationOptions={() => ({
              mutationFn: () =>
                new Promise<void>((resolve) => setTimeout(resolve, 800)),
            })}
            resourceType="storage-account"
            resourceName="my-storage-account"
            redirectUrl="/"
            EntityIcon={ConfirmationEntityIcon}
          />
        </Box>
      </MemoryRouter>
    );
  },
};

/**
 * The table in a panel-sized column, which is the shape it ships in.
 *
 * Drag `frameWidth` down. At **360px** the row's `Remove` button drops its label for
 * a tooltip. Without that the button is what stops the row shrinking, and from
 * 357.63px the row bleeds out of the panel -- these panels are `overflow: visible`,
 * so there is no scrollbar or clipped edge to give it away. Keep going and the
 * search box is the next floor at **301px**, which is `SearchInput`'s fixed width
 * and not fixable from this component.
 */
export const NarrowPanel = {
  argTypes: {
    frameWidth: {
      control: { type: 'range', min: 200, max: 900, step: 10 },
    },
  },
  args: { frameWidth: 383 },
  render: ({ frameWidth }: { frameWidth: number }) => {
    const theme = useTheme();
    return (
      <Box
        data-testid="panel-frame"
        style={{
          width: frameWidth,
          height: '100%',
          backgroundColor: theme.backgroundLevel4,
          outline: '1px dashed #888',
        }}
        p={'1rem'}
      >
        <AttachmentProvider>
          <AttachmentTable
            entityName={{ plural: 'users', singular: 'user' }}
            filteredEntities={{
              status: 'success',
              data: {
                number: 1,
                entities: [
                  { name: 'jean.dupont@example.com', id: 'a', type: 'USER' },
                  { name: 'storage-operators-emea', id: 'b', type: 'USER' },
                ],
              },
            }}
            initialAttachmentOperations={[]}
            onEntitySearchChange={action('onEntitySearchChange')}
            searchEntityPlaceholder="Search user by name"
            initiallyAttachedEntities={[
              { name: 'jean.dupont@example.com', id: 'a', type: 'USER' },
              { name: 'storage-operators-emea', id: 'b', type: 'USER' },
              { name: 'svc-backup', id: 'c', type: 'USER' },
            ]}
            initiallyAttachedEntitiesStatus={'success'}
            onAttachmentsOperationsChanged={() => {}}
          />
        </AttachmentProvider>
      </Box>
    );
  },
};
