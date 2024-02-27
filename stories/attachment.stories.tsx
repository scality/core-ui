import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  AttachableEntity,
  AttachmentAction,
  AttachmentOperation,
} from '../src/lib/organisms/attachments/AttachmentTypes';
import {
  AttachmentProvider,
  AttachmentTable,
  useAttachmentOperations,
} from '../src/lib/organisms/attachments/AttachmentTable';

export default {
  title: 'Components/AttachmentTable',
  component: AttachmentTable,
  decorators: [
    (Story) => (
      <AttachmentProvider>
        <Story />
      </AttachmentProvider>
    ),
  ],
  render: ({ args }) => {
    return (
      <AttachmentTable
        entityName={{ plural: 'groups', singular: 'group' }}
        filteredEntities={{
          status: 'success',
          data: {
            number: 1,
            entities: [{ name: 'test', id: 'test', type: 'GROUP' }],
          },
        }}
        initialAttachmentOperations={[]}
        onEntitySearchChange={action('onEntitySearchChange')}
        searchEntityPlaceholder="Search group by name"
        initiallyAttachedEntities={[
          { name: 'test', id: 'test', type: 'GROUP' },
        ]}
        initiallyAttachedEntitiesStatus={'success'}
        onAttachmentsOperationsChanged={() => {
          console.log('changed');
        }}
      />
    );
  },
};

export const Playground = {
  args: {
    label: 'Playground',
  },
};
