import { action } from 'storybook/actions';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { Radio, Props } from '../../src/lib/components/radio/Radio.component';
import { Stack } from '../../src/lib/spacing';

type RadioStory = StoryObj<Props>;

const meta: Meta<Props> = {
  title: 'Components/Inputs/Radio',
  component: Radio,
  args: {
    name: 'playground',
    value: 'option',
    label: 'Option',
    onChange: action('Radio changed'),
  },
};

export default meta;

export const Playground: RadioStory = {};

export const RadioGroup: RadioStory = {
  render: () => {
    const [selected, setSelected] = useState('governance');
    return (
      <Stack gap="r12">
        <Radio
          name="retention-mode"
          value="governance"
          label="Governance"
          checked={selected === 'governance'}
          onChange={() => setSelected('governance')}
        />
        <Radio
          name="retention-mode"
          value="compliance"
          label="Compliance"
          checked={selected === 'compliance'}
          onChange={() => setSelected('compliance')}
        />
        <Radio
          name="retention-mode"
          value="none"
          label="None"
          checked={selected === 'none'}
          onChange={() => setSelected('none')}
        />
      </Stack>
    );
  },
};

export const AllStates: RadioStory = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Radio name="s1" value="a" label="Unchecked" checked={false} onChange={() => {}} />
      <Radio name="s2" value="b" label="Checked" checked={true} onChange={() => {}} />
      <Radio name="s3" value="c" label="Disabled" disabled checked={false} onChange={() => {}} />
      <Radio name="s4" value="d" label="Disabled checked" disabled checked={true} onChange={() => {}} />
    </div>
  ),
};

export const DisabledGroup: RadioStory = {
  render: () => (
    <Stack gap="r12">
      <Radio name="disabled" value="a" label="Option A" disabled checked={true} onChange={() => {}} />
      <Radio name="disabled" value="b" label="Option B" disabled checked={false} onChange={() => {}} />
    </Stack>
  ),
};
