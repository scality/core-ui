import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { InputList } from '../src/lib/components/inputlist/InputList.component';
import { Wrapper as StoryWrapper } from './common';
import { FormSection } from '../src/lib/components/form/Form.component';
import { Controller, useForm } from 'react-hook-form';

const meta: Meta<typeof InputList> = {
  tags: ['autodocs'],
  title: 'Components/Inputs/InputList',
  component: InputList,
};
export default meta;

interface InputListForm {
  firstNames: string[];
  lastNames: string[];
}

const ExampleList = () => {
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
            placeholder="First name"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
        name="firstNames"
      />
    </FormSection>
  );
};
type Story = StoryObj<typeof InputList>;
export const SimpleListOfInputs: Story = {
  name: 'List of inputs',
  render: () => (
    <StoryWrapper>
      <ExampleList />
    </StoryWrapper>
  ),
};
