import React from 'react';
import { ToastBanner } from '../src/lib/components/toastbanner/ToastBanner.component';
import { Banner } from '../src/lib/components/banner/Banner.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { Wrapper } from './common';
import { iconOptions } from './controls';

export default {
  title: 'Components/Feedback/ToastBanner',
  component: ToastBanner,
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
  argTypes: {
    icon: {
      options: iconOptions,
    },
  },
};

export const Playground = {
  render: ({ icon, message, status }) => {
    return <ToastBanner message={message} status={status} icon={icon} />;
  },
  args: {
    status: 'info',
    message: 'Some text explaining what happened',
    icon: <Icon name="Info-circle" />,
  },
};

export const Default = {
  ...Playground,
  args: {
    message: 'There is an alert',
    status: 'info',
    icon: <Icon name="Info-circle" />,
  },
};

export const SuccessBanner = {
  ...Playground,
  args: {
    status: 'success',
    message: 'There is a success',
    icon: <Icon name="Check-circle" />,
  },
};

export const WarningBanner = {
  ...Playground,
  args: {
    status: 'warning',
    message: 'There is a warning',
    icon: <Icon name="Exclamation-circle" />,
  },
};
export const ErrorBanner = {
  ...Playground,
  args: {
    status: 'error',
    message: 'There is an error',
    icon: <Icon name="Times-circle" />,
  },
};
