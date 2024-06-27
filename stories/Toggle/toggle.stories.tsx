import React, { useState } from 'react';
import {
  Props,
  Toggle,
} from '../../src/lib/components/toggle/Toggle.component';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<Props>;
const meta: Meta = {
  title: 'Components/Inputs/Toggle',
  component: Toggle,
  args: {
    name: 'toggle',
  },
};
export default meta;

export const Playground: Story = {
  render: (args) => {
    const [{ toggle }, updateArgs] = useArgs<{ toggle: boolean }>();
    return (
      <Toggle
        {...args}
        onChange={() => updateArgs({ toggle: !toggle })}
        toggle={toggle}
      />
    );
  },
  args: {
    label: 'Playground',
  },
};
export const LabelledToggle: Story = {
  render: (args) => {
    const [toggle, setToggle] = useState(false);
    return (
      <Toggle {...args} toggle={toggle} onChange={() => setToggle(!toggle)} />
    );
  },
  args: {
    label: 'Airplane mode',
  },
};
export const DisabledToggle: Story = {
  ...Playground,
  args: {
    label: 'Disabled Toggle',
    disabled: true,
    toggle: false,
  },
};
