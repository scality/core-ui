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

const variants = [
  "buttonPrimary", "buttonSecondary", "buttonDelete", "backgroundLevel1"
]
const sizes =[
  'smaller',
  'small',
  'base',
  'large',
  'larger',
]


export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  decorators:[(story) => (
    <Wrapper style={{minHeight:"40vh",display:"flex",justifyContent:"space-between"}} className="storybook-dropdown">
        {story()}
    </Wrapper>) ],
    args:{
      items
    },
    argTypes: {
      size:{
        options:sizes,
        control:{
          type:'radio'
        }
      },
      variant:{
        options:variants,
        control:{
          type:'radio'
        }
      }
    }
};

export const DropdownWithText = {
  args:{
    text: "Help",
  }
}

export const DropdownWithIcon = {
  args:{
    icon:<i className="fas fa-star" />,
    caret:false
  }
}

export const DropdownWithTextAndIcon = {
  args:{
    text: "Help",
    icon: <i className="fas fa-star" />,
  }
}

export const DropdownVariant = {
render:(args) => {
  return (
    <>
      {
        variants.map(variant => {
          return <Dropdown text='Help' variant={variant} {...args}/>
        })
      }
    </>
  )
},
}

export const DifferentSizes = {
  render:(args) => {
    return (
      <>
        {
          sizes.map(size => {
            return <Dropdown text='Help' size={size} {...args}/>
          })
        }
      </>
    )
  },
  args:{
    text:"Help",
    icon: <i className="fas fa-star" />
  }
}

export const Default = {
  render: ({}) => {
    return (
      <Wrapper >
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