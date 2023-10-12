import { Chips } from '../src/lib/components/chips/Chips.component';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/Chips',
  component: Chips,
  decorators:[(story) => (
    <Wrapper style={{minHeight:'10vh', padding:'3rem'}} className="storybook-chips" >
        {story()}
    </Wrapper>) ],
};

const Template = {
  render:({variant,text,...args}) => {
    return (
      <>
      {
        variant.map(status => {
          return <Chips variant={status} text={text} {...args} />
        })
      }
      </>
    )
  },
  args:{
    variant:["infoPrimary", 'statusHealthy',"statusWarning",'statusCritical'],
    text:"Basic Chip"
  }
}

export const BasicChips ={
  ...Template
}

export const ClickableChips ={
  ...Template,
  args: {
    ...Template.args,
    text:'Clickable Chip',
    icon:<i className="fas fa-star" />,
    onClick:() => action('Clickable Chip')
  }
}

export const DeletableChips = {
  ...Template,
  args:{
    ...Template.args,
    icon:<i className="fas fa-star" />,
    onRemove:() => action('Deletable Chip'),
    text: 'Deletable'
  }
}

export const DifferentsSizeChips = {
  render:(args) => {
    return (
      <>
       <Chips text="Smaller" size='smaller' {...args} />
       <Chips text="Small" size='small'  {...args} />
       <Chips text="Base" size='base'  {...args} />
       <Chips text="Large" size='large'  {...args} />
       <Chips text="Larger" size='larger'  {...args} />
    </>
    )
   
  },
  args:{
    variant:'statusHealthy',
    icon:<i className="fas fa-star" />,
    onClick:action('Clickable Chip')
  }
}

export const Default = {
  render: ({}) => {
    return (
      <Wrapper className="storybook-chips">
        <Title>Basic Chip</Title>
        <Chips text="Basic Chip" variant="infoPrimary" />
        <Chips text="Basic Chip" variant="statusHealthy" />
        <Chips text="Basic Chip" variant="statusWarning" />
        <Chips text="Basic Chip" variant="statusCritical" />

        <Title>Clickable Chip</Title>
        <Chips
          text="Clickable Chip"
          icon={<i className="fas fa-star" />}
          variant="infoPrimary"
          onClick={action('Clickable Chip')}
        />
        <Chips
          text="Clickable Chip"
          icon={<i className="fas fa-star" />}
          variant="statusHealthy"
          onClick={action('Clickable Chip')}
        />
        <Chips
          text="Clickable Chip"
          icon={<i className="fas fa-star" />}
          variant="statusWarning"
          onClick={action('Clickable Chip')}
        />
        <Chips
          text="Clickable Chip"
          icon={<i className="fas fa-star" />}
          variant="statusCritical"
          onClick={action('Clickable Chip')}
        />

        <Title>Deletable Chip</Title>
        <Chips
          text="Deletable"
          icon={<i className="fas fa-star" />}
          variant="infoPrimary"
          onRemove={action('Deletable Chip')}
        />
        <Chips
          text="Deletable"
          icon={<i className="fas fa-star" />}
          variant="statusHealthy"
          onRemove={action('Deletable Chip')}
        />
        <Chips
          text="Deletable"
          icon={<i className="fas fa-star" />}
          variant="statusWarning"
          onRemove={action('Deletable Chip')}
        />
        <Chips
          text="Deletable"
          icon={<i className="fas fa-star" />}
          variant="statusCritical"
          onRemove={action('Deletable Chip')}
        />

        <Title>Different sizes</Title>
        <Chips
          text="Smaller"
          icon={<i className="fas fa-star" />}
          variant="infoPrimary"
          onRemove={action('Deletable Chip')}
          size="smaller"
        />
        <Chips
          text="Small"
          icon={<i className="fas fa-star" />}
          variant="infoPrimary"
          onRemove={action('Deletable Chip')}
          size="small"
        />
        <Chips
          text="Base"
          icon={<i className="fas fa-star" />}
          variant="statusWarning"
          onRemove={action('Deletable Chip')}
          size="base"
        />
        <Chips
          text="Large"
          icon={<i className="fas fa-star" />}
          variant="statusHealthy"
          onRemove={action('Deletable Chip')}
          size="large"
        />
        <Chips
          text="Larger"
          icon={<i className="fas fa-star" />}
          variant="statusWarning"
          onRemove={action('Deletable Chip')}
          size="larger"
        />
      </Wrapper>
    );
  },
};
