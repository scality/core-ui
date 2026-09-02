import React, { useState } from 'react';
import { action } from 'storybook/actions';
import { SearchInput } from '../../src/lib/components/searchinput/SearchInput.component';
import { Wrapper, Title } from '../common';
export default {
  title: 'Components/Inputs/SearchInput',
  component: SearchInput,
};
export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <Title>Default</Title>
        <div
          style={{
            width: '250px',
          }}
        >
          <SearchInput
            value=""
            placeholder="Search server..."
            onChange={action('on input change')}
            onReset={action('on input reset')}
            autoComplete="off"
          />
        </div>
        <Title>Disabled</Title>
        <div
          style={{
            width: '250px',
          }}
        >
          <SearchInput
            value=""
            disabled={true}
            placeholder="Search server..."
            onChange={action('on input change')}
            onReset={action('on input reset')}
          />
        </div>
        <Title>Search Input filled</Title>
        <div
          style={{
            width: '250px',
          }}
        >
          <SearchInput
            value="carlito"
            onChange={action('on input change')}
            onReset={action('on input reset')}
            data-cy="carlito_searchinput"
          />
        </div>
        <Title>Disable the default toggle</Title>
        <div
          style={{
            width: '250px',
          }}
        >
          <SearchInput
            value=""
            placeholder="Search and Filter…"
            onChange={action('on input change')}
            onReset={action('on input reset')}
          />
        </div>
        <Title>Disable the default toggle undefined onReset action</Title>
        <div
          style={{
            width: '250px',
          }}
        >
          <SearchInput
            value=""
            placeholder="Search and Filter…"
            onChange={action('on input change')}
          />
        </div>
      </Wrapper>
    );
  },
};
export const Debounce = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <SearchInput
        placeholder="Search"
        value={value}
        onReset={action('on input reset')}
        onChange={(e) => {
          setValue(e.target.value);
          action('debounce')(`${e.target} changed`);
        }}
        {...args}
      />
    );
  },
};

export const WithCustomIconColor = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Wrapper>
        <Title>SearchInput with Custom Icon Colors</Title>
        <div
          style={{
            width: '250px',
            marginBottom: '20px',
          }}
        >
          <SearchInput
            placeholder="Primary color..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              action('on input change')(e.target.value);
            }}
            onReset={() => {
              setValue('');
              action('on input reset')();
            }}
            searchIconColor="infoPrimary"
            {...args}
          />
        </div>
        <div
          style={{
            width: '250px',
            marginBottom: '20px',
          }}
        >
          <SearchInput
            placeholder="Success color..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              action('on input change')(e.target.value);
            }}
            onReset={() => {
              setValue('');
              action('on input reset')();
            }}
            searchIconColor="statusHealthy"
            {...args}
          />
        </div>
        <div
          style={{
            width: '250px',
            marginBottom: '20px',
          }}
        >
          <SearchInput
            placeholder="Warning color..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              action('on input change')(e.target.value);
            }}
            onReset={() => {
              setValue('');
              action('on input reset')();
            }}
            searchIconColor="statusWarning"
            {...args}
          />
        </div>
      </Wrapper>
    );
  },
};

/**
 * The box shrinks with its container instead of overflowing it, down to the `1/2`
 * size. Drag `frameWidth`: the default box gives ground from 287px to its 10rem
 * floor, then overflows rather than shrink into uselessness. The `1/3` box is
 * already at its own size -- the floor is never wider than the `size` asked for.
 */
export const Narrow = {
  argTypes: {
    frameWidth: { control: { type: 'range', min: 60, max: 500, step: 10 } },
  },
  args: { frameWidth: 250 },
  render: ({ frameWidth }: { frameWidth: number }) => {
    const [value, setValue] = useState('');
    return (
      <Wrapper>
        <Title>Default size, in a {frameWidth}px frame</Title>
        <div style={{ width: frameWidth, outline: '1px dashed #888' }}>
          <SearchInput
            value={value}
            placeholder="Search server..."
            onChange={(e) => setValue(e.target.value)}
            onReset={() => setValue('')}
          />
        </div>
        <Title>size="1/3", same frame</Title>
        <div style={{ width: frameWidth, outline: '1px dashed #888' }}>
          <SearchInput
            value=""
            size="1/3"
            placeholder="Search server..."
            onChange={action('on input change')}
            onReset={action('on input reset')}
          />
        </div>
      </Wrapper>
    );
  },
};
