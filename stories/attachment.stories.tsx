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
