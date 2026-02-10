import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { InputList, InputListProps } from '../src/lib/components/inputlist/InputList.component';
import { Wrapper as StoryWrapper } from './common';
import { FormSection } from '../src/lib/components/form/Form.component';
import { Controller, useForm } from 'react-hook-form';

const meta: Meta<typeof InputList> = {
  tags: ['autodocs'],
  title: 'Components/Inputs/InputList',
  component: InputList,
  args: {
    value: [''],
    size: '1/2',
  },
  argTypes: {
    size: {
      options: ['1/3', '1/2', '2/3', '1'],
      control: 'select',
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;
interface InputListForm {
  firstNames: string[];
  lastNames: string[];
}


const ExampleList = ({ size }: { size?: InputListProps<string>['size'] }) => {
  const { control } = useForm<InputListForm>({
    mode: 'all',
    defaultValues: {
      firstNames: [''],
      lastNames: [''],
    },
  });

  return (
    <FormSection>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputList
            placeholder="San Francisco"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            size={size}
          />
        )}
        name="firstNames"
      />
    </FormSection>
  );
};
export const SimpleListOfInputs: Story = {
  name: 'List of inputs',
  render: (args) => (
    <StoryWrapper>
      <ExampleList {...args} />
    </StoryWrapper>
  ),
};
