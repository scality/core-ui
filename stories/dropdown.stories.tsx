import React from 'react';
import { Dropdown } from '../src/lib/components/dropdown/Dropdown.component';
import { action } from '@storybook/addon-actions';
import { Wrapper } from './common';
import { Icon } from '../src/lib';
import {
  iconOptions,
  sizesOptions as sizes,
  variantsOptions as variants,
} from './controls';

const items = [
  {
    label: 'About',
    onClick: action('About clicked'),
    'data-cy': 'About',
  },
  {
    label: 'Documentation',
    onClick: action('Documentation clicked'),
    'data-cy': 'Documentation',
  },
  {
    label: 'Onboarding',
    onClick: action('Onboarding clicked'),
    'data-cy': 'Onboarding',
  },
];

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  decorators: [
    (story) => (
      <Wrapper
        style={{
          minHeight: '40vh',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="storybook-dropdown"
      >
        {story()}
      </Wrapper>
    ),
  ],
  args: {
    items,
  },
  argTypes: {
    icon: {
      options: iconOptions,
    },
    size: {
      options: sizes,
      control: {
        type: 'radio',
      },
    },
    variant: {
      options: variants,
      control: {
        type: 'radio',
      },
    },
  },
  render: ({ icon, items, ...args }) => (
    <Dropdown
      items={items}
      icon={icon && <Icon name={icon}></Icon>}
      {...args}
    />
  ),
};

export const Playground = {
  args: {
    text: 'Playground',
  },
};

export const DropdownWithText = {
  args: {
    text: 'Help',
  },
};

export const DropdownWithIcon = {
  args: {
    icon: <i className="fas fa-star" />,
    caret: false,
  },
};

export const DropdownWithTextAndIcon = {
  args: {
    text: 'Help',
    icon: 'Info-circle',
  },
};

export const DropdownVariant = {
  render: ({ icon, ...args }) => {
    return (
      <>
        {variants.map((variant, i) => {
          return (
            <Dropdown
              key={i}
              items={items}
              icon={icon && <Icon name={icon}></Icon>}
              text="Help"
              variant={variant}
              {...args}
            />
          );
        })}
      </>
    );
  },
};

export const DifferentSizes = {
  render: ({ icon, ...args }) => {
    return (
      <>
        {sizes.map((size, i) => {
          return (
            <Dropdown
              key={i}
              items={items}
              icon={icon && <Icon name={icon}></Icon>}
              text="Help"
              size={size}
              {...args}
            />
          );
        })}
      </>
    );
  },
  args: {
    text: 'Help',
    icon: 'Info-circle',
  },
};
