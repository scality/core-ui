import React from 'react';
import { MultiSelect } from '../src/lib/components/multiselect/MultiSelect.component';
import { action } from '@storybook/addon-actions';
import { Wrapper, Title } from './common';
const items = [
  {
    selected: true,
    isFavorite: true,
    label: 'AWS',
    description: 'Amazon',
    onSelect: action('onSelect clicked'),
    onFavoriteClick: action('onFavoriteClick clicked'),
  },
  {
    selected: false,
    isFavorite: false,
    label: 'WM',
    description: 'Walmart',
    onSelect: action('onSelect clicked'),
    onFavoriteClick: action('onFavoriteClick clicked'),
  },
];
const itemsWithoutFavourite = [
  {
    selected: true,
    label: 'AWS',
    description: 'Amazon',
    onSelect: action('onSelect clicked'),
  },
  {
    selected: false,
    label: 'WM',
    description: 'Walmart',
    onSelect: action('onSelect clicked'),
  },
];
const itemsWithoutCheckboxFavourite = [
  {
    label: 'AWS',
    description: 'Amazon',
  },
  {
    label: 'WM',
    description: 'Walmart',
  },
];
const options = [
  {
    label: 'Azure',
    value: 'Azure',
  },
  {
    label: 'S3',
    value: 'S3',
  },
];
const search = {
  placeholder: 'Select location to add',
  options: options,
  onSelect: action('onSelect clicked'),
  onAdd: action('onAdd clicked'),
  selectedOption: null,
};
export default {
  title: 'Components/Inputs/Selector/MultiSelect',
  component: MultiSelect,
};
export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <Title>MultiSelect List</Title>
        <div className="storybook-mutiselect-container">
          <MultiSelect
            title="Destination Locations"
            items={items}
            search={search}
            onItemRemove={action('onItemRemove clicked')}
          />
        </div>
        <Title>MultiSelect List without search</Title>
        <div className="storybook-mutiselect-container">
          <MultiSelect
            title="Destination Locations"
            items={items}
            onItemRemove={action('onItemRemove clicked')}
          />
        </div>
        <Title>MultiSelect List without Favourite</Title>
        <div className="storybook-mutiselect-container">
          <MultiSelect
            title="Destination Locations"
            items={itemsWithoutFavourite}
            search={search}
            onItemRemove={action('onItemRemove clicked')}
          />
        </div>
        <Title>MultiSelect List without Favourite and Selectbox</Title>
        <div className="storybook-mutiselect-container">
          <MultiSelect
            title="Destination Locations"
            items={itemsWithoutCheckboxFavourite}
            search={search}
            onItemRemove={action('onItemRemove clicked')}
          />
        </div>
        <Title>
          MultiSelect List without Remove Button, Favourite and Selectbox
        </Title>
        <div className="storybook-mutiselect-container">
          <MultiSelect
            title="Destination Locations"
            items={itemsWithoutCheckboxFavourite}
            search={search}
          />
        </div>
        <Title>
          MultiSelect List without Title, Remove Button, Favourite and Selectbox
        </Title>
        <div className="storybook-mutiselect-container">
          <MultiSelect items={itemsWithoutCheckboxFavourite} search={search} />
        </div>
      </Wrapper>
    );
  },
};
