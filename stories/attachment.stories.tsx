import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  AttachmentProvider,
  AttachmentTable,
  useAttachmentOperations,
} from '../src/lib/organisms/attachments/AttachmentTable';

import { Box } from '../src/lib/next';
import { useTheme } from 'styled-components';
import { CoreUITheme } from '../src/lib/style/theme';

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
                entities: [{ name: 'User A', id: 'test', type: 'USER' }],
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