import React from 'react';
import { Banner } from '../src/lib/components/banner/Banner.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { Wrapper } from './common';
import { iconOptions } from './controls';

export default {
  title: 'Components/Feedback/Banner',
  component: Banner,
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
  args: {
    icon: 'Exclamation-triangle',
  },
  argTypes: {
    icon: {
      options: iconOptions,
    },
  },
};

export const Playground = {
  render: ({ icon, variant, children, ...args }) => {
    return (
      <Banner
        icon={icon && <Icon name={icon}></Icon>}
        variant={variant}
        children={children}
        {...args}
      ></Banner>
    );
  },
  args: {
    variant: 'base',
    children: 'Some text explaining what happened',
  },
  argTypes: {
    variant: { control: { disable: false } },
    title: { control: { disable: false } },
    children: { control: { disable: false } },
    icon: { control: { disable: false } },
  },
};

export const Default = {
  ...Playground,
  args: {
    children: 'There is an alert',
    variant: 'base',
    icon: undefined,
  },
};

export const SuccessBanner = {
  ...Playground,
  args: {
    variant: 'success',
    title: 'Success',
    children: 'There is a success',
  },
};

export const WarningBanner = {
  ...Playground,
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'There is a warning',
  },
};
export const ErrorBanner = {
  ...Playground,
  args: {
    variant: 'danger',
    title: 'Error',
    children: 'There is an error',
  },
};
