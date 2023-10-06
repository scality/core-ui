import React from 'react';
import { Banner } from '../src/lib/components/banner/Banner.component';
import { Props } from '../src/lib/components/banner/Banner.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { Wrapper } from './common';
import { Component, StoryProps } from '@storybook/blocks';
import { StoryFn, StoryObj } from '@storybook/react';


export default {
  title: 'Components/Notification/Banner',
  component: Banner,
  decorators: [(story:Component) => <Wrapper>{story()}</Wrapper>],
  args:{icon:<Icon name='Exclamation-triangle'></Icon>},
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
    variant: {
      control: {
        type: 'select',
        disable:true
      },
    },
    title: {control: { disable:true}},
    icon: {
      control: {
        disable: true,
      },
    },
  },
};


export const SuccessBanner = {
  args:{
    variant:"success",
        title:'Success',
        children:"There is a success",
  },
};

export const WarningBanner = {
  args:{
    variant:"warning",
    title:'Warning',
    children:"There is a warning",
  },
};
export const ErrorBanner = {
  args:{
    variant:"danger",
    title:'Error',
    children:"There is an error",
  },
};

export const Playground = {
  args:{
    ...SuccessBanner.args,
    title: "Testing playground"
  },
  argTypes:{
    variant:{control: {disable:false}},
    title:{control: {disable:false}},
    children:{control: {disable:false}},
  }
};
