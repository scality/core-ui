import React from 'react';
import { Dropdown } from '../src/lib/components/dropdown/Dropdown.component';
import { action } from '@storybook/addon-actions';
import { Wrapper } from './common';

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

const variants = [
  'buttonPrimary',
  'buttonSecondary',
  'buttonDelete',
  'backgroundLevel1',
];
const sizes = ['smaller', 'small', 'base', 'large', 'larger'];

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
    icon: <i className="fas fa-star" />,
  },
};

export const DropdownVariant = {
  render: (args) => {
    return (
      <>
        {variants.map((variant, i) => {
          return <Dropdown key={i} text="Help" variant={variant} {...args} />;
        })}
      </>
    );
  },
};

export const DifferentSizes = {
  render: (args) => {
    return (
      <>
        {sizes.map((size, i) => {
          return <Dropdown key={i} text="Help" size={size} {...args} />;
        })}
      </>
    );
  },
  args: {
    text: 'Help',
    icon: <i className="fas fa-star" />,
  },
};
