import React, { useState } from 'react';
import { Toggle } from '../src/lib/components/toggle/Toggle.component';
import { Wrapper } from './common';
import { useArgs } from '@storybook/preview-api';
export default {
  title: 'Components/Inputs/Toggle',
  component: Toggle,
  args: {
    name: 'toggle',
  },
};
export const Playground = {
  render: (args) => {
    const [{ toggle }, updateArgs] = useArgs();
    return (
      <Toggle
        toggle={toggle}
        onChange={() => updateArgs({ toggle: !toggle })}
        {...args}
      />
    );
  },
  args: {
    label: 'Playground',
  },
};
export const LabelledToggle = {
  render: (args) => {
    const [toggle, setToggle] = useState(false);
    return (
      <Toggle toggle={toggle} onChange={() => setToggle(!toggle)} {...args} />
    );
  },
  args: {
    label: 'Airplane mode',
  },
};
export const DisabledToggle = {
  ...Playground,
  args: {
    label: 'Disabled Toggle',
    disabled: true,
    toggle: false,
  },
};
