import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { Wrapper, Title } from './common';
import { CopyButton } from '../src/lib/next';

export default {
  title: 'Components/v2/Button',
  component: Button,
  decorators:[(story) => (
    <Wrapper className="storybook-button" style={{minHeight:'20vh', padding:'3rem'}}>
        {story()}
    </Wrapper>) ],
};

export const DefaultButtons = {
  render:({...args}) => {
    return (
      <>
        <Button variant='primary' label='primary' {...args}/>
        <Button variant='secondary' label='secondary' {...args}/>
        <Button variant='danger' label='danger' {...args}/>
        <Button variant='outline' label='outline' {...args}/>
      </>
    )
  }
}

export const ButtonsWithIcon = {
  ...DefaultButtons,
  args:{
    icon:<i className="fas fa-arrow-right"></i>
  }
}

export const ButtonDisabled = {
  ...ButtonsWithIcon,
  args:{
    disabled:true,
    tooltip:{
      overlayStyle: {
        width: '80px',
      },
      overlay: 'The button is disabled because of blabla...',
      placement: 'top',
    }
  }
}

export const IconButtonWithTooltip = {
  render:({...args})=> {
    return (
   <>
    <Button {...args} />
    <Button
      variant="secondary"
      icon={<i className="fas fa-link" />}
      tooltip={{
        overlayStyle: {
          width: '80px',
        },
        overlay: 'Bound status',
        placement: 'top',
      }}
    />
    <Button
      {...args}
      variant="danger"
    />
    <Button
      {...args}
      variant="outline"
    />
  </>
    )
  },
  args:{
    variant:"primary",
    icon:<i className="fas fa-trash" />,
    tooltip:{
      overlayStyle: {
        width: '80px',
      },
      overlay: 'Entity deletion',
      placement: 'top',
      }
  }

}

export const GhostButtons = {
  render:() => {
    return (
      <>
        <Button
          icon={<i className="fas fa-sync" />}
          tooltip={{
            overlayStyle: {
              width: '80px',
            },
            overlay: 'Refresh the metrics',
            placement: 'top',
          }}
        />
        <Button
          icon={<i className="fas fa-file-export" />}
          tooltip={{
            overlayStyle: {
              width: '120px',
            },
            overlay: 'Export the data in predefined format',
            placement: 'top',
          }}
        />
        <Button
          icon={<i className="fas fa-calendar-week" />}
          tooltip={{
            overlayStyle: {
              width: '120px',
            },
            overlay: 'Metric over a period',
            placement: 'top',
          }}
        />
      </>
    )
  }
}

export const CopyButtons = {
  render:(args) => <CopyButton {...args} ></CopyButton>,
  args:{
    textToCopy:'test'
  }
}
export const CopyButtonsWithLabel = {
  ...CopyButtons,
  args:{
    ...CopyButtons.args,
    label:'Test',
  }
}

export const OutlinedCopyButton = {
  ...CopyButtons,
  args:{
    ...CopyButtons.args,
    variant:"outline"
  }
}

export const OutlinedCopyButtonWithLabel ={
  ...OutlinedCopyButton,
  args:{
    ...OutlinedCopyButton.args,
    label:"Test"
  }
}

export const OutlinedCopyButtonWithBigLabel ={
  ...OutlinedCopyButton,
  args:{
    ...OutlinedCopyButton.args,
    label:"Certificate",
    textToCopy:"Certificate"
  }
}