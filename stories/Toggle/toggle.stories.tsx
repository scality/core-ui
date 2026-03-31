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
export const FeatureToggle: Story = {
  render: (args) => {
    const [toggle, setToggle] = useState(false);
    return (
      <Toggle {...args} toggle={toggle} onChange={() => setToggle(!toggle)} />
    );
  },
  args: {
    label: 'List versions',
  },
};

export const AmbiguousLabel: Story = {
  render: () => {
    const [toggle, setToggle] = useState(false);
    return (
      <Toggle name="ambiguous" toggle={toggle} label="Active" onChange={() => setToggle(!toggle)} />
    );
  },
};

export const LabelLeftToggleRight: Story = {
  render: () => {
    const [toggle, setToggle] = useState(false);
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '16rem' }}>
        <span>Enable object lock</span>
        <Toggle name="label-left" toggle={toggle} onChange={() => setToggle(!toggle)} />
      </div>
    );
  },
};

export const LabelRightToggleLeft: Story = {
  render: () => {
    const [toggle, setToggle] = useState(false);
    return (
      <Toggle name="label-right" toggle={toggle} label="List versions" onChange={() => setToggle(!toggle)} />
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const labelStyle: React.CSSProperties = {
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      opacity: 0.5,
      marginBottom: '0.75rem',
    };
    return (
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', paddingTop: '1.5rem' }}>
        <div>
          <div style={labelStyle}>Off</div>
          <Toggle name="s1" toggle={false} label="Feature" onChange={() => {}} />
        </div>
        <div>
          <div style={labelStyle}>On</div>
          <Toggle name="s2" toggle={true} label="Feature" onChange={() => {}} />
        </div>
        <div>
          <div style={labelStyle}>Disabled</div>
          <Toggle name="s3" toggle={false} label="Feature" disabled onChange={() => {}} />
        </div>
        <div>
          <div style={labelStyle}>Disabled on</div>
          <Toggle name="s4" toggle={true} label="Feature" disabled onChange={() => {}} />
        </div>
      </div>
    );
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
