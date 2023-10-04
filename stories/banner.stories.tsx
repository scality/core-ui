import React from 'react';
import { Banner } from '../src/lib/components/banner/Banner.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { Wrapper } from './common';

export default {
  title: 'Components/Notification/Banner',
  component: Banner,
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
  args: {
    icon: <Icon name="Exclamation-triangle" />,
  },
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
    variant: {
      control: {
        type: 'select',
        disable: true,
      },
    },
    title: { control: { disable: true } },
    icon: {
      control: {
        disable: true,
      },
    },
  },
};

export const Playground = {
  args: {
    variant: 'success',
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
  args: {
    children: 'There is an alert',
    variant: 'info',
  },
};

export const SuccessBanner = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'There is a success',
  },
};

export const WarningBanner = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'There is a warning',
  },
};
export const ErrorBanner = {
  args: {
    variant: 'danger',
    title: 'Error',
    children: 'There is an error',
  },
};
