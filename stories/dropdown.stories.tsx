import React from 'react';
import { Dropdown } from '../src/lib/components/dropdown/Dropdown.component';
import { action } from '@storybook/addon-actions';
import { Wrapper, Title } from './common';
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
};
export const Default = {
  render: ({}) => {
    return (
      <Wrapper className="storybook-dropdown">
        <Title>Dropdown with text/icon</Title>
        <Dropdown
          text="Help"
          icon={<i className="fas fa-star" />}
          items={items}
          size="smaller"
        />
        <Dropdown
          text="Help"
          icon={<i className="fas fa-star" />}
          items={items}
          size="small"
        />
        <Dropdown
          text="Help"
          icon={<i className="fas fa-star" />}
          items={items}
        />
        <Dropdown
          text="Help"
          icon={<i className="fas fa-star" />}
          items={items}
          size="large"
        />
        <Dropdown
          text="Help"
          icon={<i className="fas fa-star" />}
          items={items}
          size="larger"
        />

        <Title>Dropdown with icon</Title>
        <Dropdown
          icon={<i className="fas fa-star" />}
          items={items}
          caret={false}
        />

        <Title>Dropdown with text</Title>
        <Dropdown text="Help" items={items} />

        <Title>Dropdown with variant</Title>
        <Dropdown
          icon={<i className="fas fa-star" />}
          items={items}
          variant="buttonPrimary"
          text="primary"
        />
        <Dropdown
          icon={<i className="fas fa-star" />}
          items={items}
          variant="buttonSecondary"
          text="secondary"
        />
        <Dropdown
          icon={<i className="fas fa-user" />}
          items={items}
          variant="backgroundLevel1"
          text="admin"
          caret={false}
        />
      </Wrapper>
    );
  },
};
