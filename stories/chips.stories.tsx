import { Chips } from '../src/lib/components/chips/Chips.component';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Wrapper } from './common';
import { Icon, iconTable } from '../src/lib/components/icon/Icon.component';

const icons = Object.keys(iconTable);

export default {
  title: 'Components/Chips',
  component: Chips,
  decorators: [
    (story) => (
      <Wrapper
        style={{ minHeight: '10vh', padding: '3rem' }}
        className="storybook-chips"
      >
        {story()}
      </Wrapper>
    ),
  ],
  argTypes: {
    icon: {
      options: icons,
    },
  },
};

const Template = {
  render: ({ variant, text, icon, ...args }) => {
    return (
      <>
        {variant.map((status) => {
          return (
            <Chips
              key={status}
              variant={status}
              icon={icon && <Icon name={icon}></Icon>}
              text={text}
              {...args}
            />
          );
        })}
      </>
    );
  },
  args: {
    variant: [
      'infoPrimary',
      'statusHealthy',
      'statusWarning',
      'statusCritical',
    ],
    text: 'Basic Chip',
  },
};

export const Playground = {
  render: ({ icon, text, ...args }) => {
    return (
      <Chips icon={icon && <Icon name={icon}></Icon>} text={text} {...args} />
    );
  },
  args: {
    text: 'Playground',
  },
};

export const BasicChips = {
  ...Template,
};

export const ClickableChips = {
  ...Template,
  args: {
    ...Template.args,
    text: 'Clickable Chip',
    icon: 'Check',
    onClick: action('Clickable Chip'),
  },
};

export const DeletableChips = {
  ...Template,
  args: {
    ...Template.args,
    icon: 'Delete',
    onRemove: action('Deletable Chip'),
    text: 'Deletable',
  },
};

export const DifferentsSizeChips = {
  render: (args) => {
    return (
      <>
        <Chips text="Smaller" size="smaller" {...args} />
        <Chips text="Small" size="small" {...args} />
        <Chips text="Base" size="base" {...args} />
        <Chips text="Large" size="large" {...args} />
        <Chips text="Larger" size="larger" {...args} />
      </>
    );
  },
  args: {
    variant: 'statusHealthy',
    icon: <i className="fas fa-star" />,
    onClick: action('Clickable Chip'),
  },
};
