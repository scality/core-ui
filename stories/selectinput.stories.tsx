import React from 'react';
import { Stack } from '../src/lib';
import { Input } from '../src/lib/components/inputv2/inputv2';
import { Select } from '../src/lib/components/selectv2/Selectv2.component';
import { Wrapper } from './common';
import styled from 'styled-components';

const options = Array.from(new Array(10), (_, index) => (
  <Select.Option
    value={`Option${index}`}
  >{`Label-option ${index}`}</Select.Option>
));

const sizes = ['1/3', '1/2', '2/3', '1'];

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default {
  title: 'Components/v2/SelectInput',
  component: Select,
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
  args: {
    children: options,
  },
  argTypes: {
    children: {
      control: false,
    },
  },
};

export const Playground = {};

export const Disabled = {
  args: {
    disabled: true,
  },
};

export const RoundedVariant = {
  args: {
    variant: 'rounded',
  },
};

export const DifferentSizes = {
  render: (args) => (
    <SelectWrapper>
      {sizes.map((size) => (
        <Select size={size} {...args}></Select>
      ))}
    </SelectWrapper>
  ),
};

export const Default = {
  render: ({}) => (
    <Wrapper className="storybook-select">
      <Stack>
        <Input id="input" placeholder="Select..."></Input>
        <Select id="select" onChange={console.log}>
          <Select.Option value="option1">label-option1</Select.Option>
          <Select.Option value="option2">label-option2</Select.Option>
        </Select>
      </Stack>
    </Wrapper>
  ),
};
