import React from 'react';
import { InlineInput } from '../../src/lib';
import { useMutation } from 'react-query';

export default {
  title: 'Components/InlineInput',
  component: InlineInput,
  args: {
    id: 'instanceName',
    defaultValue: 'My instance',
  },
  argTypes: {
    changeMutation: {
      table: {
        disable: true,
      },
    },
  },
  render: ({ ...args }) => {
    const changeMutation = useMutation<unknown, unknown, { value: string }>({
      mutationFn: ({ value }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(null);
          }, 2000);
        });
      },
    });
    return <InlineInput {...args} changeMutation={changeMutation} />;
  },
};

export const Playground = {
  args: {
    label: 'Playground',
  },
};

export const WithConfirmationModal = {
  args: {
    confirmationModal: {
      title: 'Confirm the instance name change',
      body: 'Are you sure you want to change the instance name?',
    },
  },
};
