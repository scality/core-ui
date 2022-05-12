import React from 'react';
import { action } from '@storybook/addon-actions';
import { SearchInput } from '../src/lib/components/searchinput/SearchInput.component';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/Input/SearchInput',
  component: SearchInput,
};
export const Default = () => {
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
          disableToggle={false}
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
          disableToggle={true}
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
          disableToggle={false}
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
          disableToggle={true}
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
          disableToggle={true}
        />
      </div>
    </Wrapper>
  );
};
