import {
  Select,
  Option,
} from '../src/lib/components/selectv2/Selectv2.component';
import React, { useState } from 'react';
import { Wrapper } from './common';
import { Icon } from '../src/lib/components/icon/Icon.component';
export default {
  title: 'Components/v2/Select',
  component: Select,
  decorators: [
    (story) => <Wrapper className="storybook-select">{story()}</Wrapper>,
  ],
};

const generateOptions = (n = 10) =>
  Array.from(new Array(n), (_, index) => ({
    label: `Item ${index}`,
    value: index.toString(),
    disabled: index !== 0 && index % 8 === 0,
    icon: index % 5 === 0 ? <Icon name={'Check'} /> : null,
  }));

const optionsWithSearchBar = generateOptions(25);
const optionsWithoutSearchBar = generateOptions(7);
const defaultOptions = generateOptions(4);
const thousandsOfOptions = generateOptions(1000);

const CustomSelect = (props) => {
  const [value, setValue] = useState('');
  return (
    <Select value={value} onChange={(value) => setValue(value)} {...props}>
      {props.opts &&
        props.opts.map((o, i) => (
          <Option key={i} value={o.value} {...o}>
            {o.label}
          </Option>
        ))}
    </Select>
  );
};

export const Playground = {
  args: {
    options: defaultOptions,
    placeholder: 'Playground',
  },
};

export const WithoutOptions = {
  args: {
    options: [{}],
    placeholder: 'No options',
  },
};

export const DisabledSelect = {
  args: {
    disabled: true,
    defaultValue: defaultOptions[1].value,
  },
};

export const WithScollbar = {
  name: 'More than 4 items',
  args: {
    options: optionsWithoutSearchBar,
  },
};

export const WithSearchBar = {
  render: (args) => {
    return <CustomSelect {...args} />;
  },
  args: {
    opts: optionsWithSearchBar,
  },
};

export const LotsOfOptions = {
  ...WithSearchBar,
  args: {
    opts: thousandsOfOptions,
  },
};

export const NotEnoughPlaceAtTheBottom = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        height: '100vh',
        flex: '1',
        flexDirection: 'column',
      }}
    >
      <CustomSelect {...args}></CustomSelect>
    </div>
  ),
  args: {
    options: optionsWithSearchBar,
  },
};

export const RoundedVariant = {
  args: {
    variant: 'rounded',
    options: defaultOptions,
  },
};
