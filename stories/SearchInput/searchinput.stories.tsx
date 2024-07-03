import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
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
