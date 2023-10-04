import React from 'react';
import { Stack } from '../src/lib';
import { Input } from '../src/lib/components/inputv2/inputv2';
import { Select } from '../src/lib/components/selectv2/Selectv2.component';
import { Wrapper } from './common';

export default {
  title: 'Components/v2/SelectInput',
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
