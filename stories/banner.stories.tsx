import React from 'react';
import { Banner } from '../src/lib/components/banner/Banner.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { Wrapper } from './common';
import { iconArgType } from './controls';

export default {
  title: 'Components/Feedback/Banner',
  component: Banner,
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
  args: {
    withDefaultIcon: true,
  },
  argTypes: {
    withDefaultIcon: { control: 'boolean' },
    icon: iconArgType,
  },
};

export const Playground = {
  render: ({ withDefaultIcon, icon, variant, children, ...args }) => {
    return (
      <Banner
        withDefaultIcon={withDefaultIcon}
        icon={icon ? <Icon name={icon} /> : undefined}
        variant={variant}
        children={children}
        {...args}
      />
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
    withDefaultIcon: { control: { disable: false } },
    icon: { control: { disable: false } },
  },
};

/** No icon. */
export const Default = {
  ...Playground,
  args: {
    children: 'There is an alert',
    variant: 'base',
    withDefaultIcon: false,
    icon: undefined,
  },
};

/** Simple default: withDefaultIcon + variant. Info-circle for base, Exclamation-circle otherwise. */
export const WithIcon = {
  args: {
    withDefaultIcon: true,
    variant: 'base',
    title: 'Info',
    children: 'Use withDefaultIcon for the default icon (Info-circle on base, Exclamation-circle on warning/danger/etc.).',
  },
};

export const SuccessBanner = {
  ...Playground,
  args: {
    variant: 'healthy',
    withDefaultIcon: false,
    icon: 'Check-circle',
    title: 'Success',
    children: 'There is a success',
  },
};

export const WarningBanner = {
  ...Playground,
  args: {
    withDefaultIcon: true,
    variant: 'warning',
    title: 'Warning',
    children: 'There is a warning',
  },
};

export const ErrorBanner = {
  ...Playground,
  args: {
    withDefaultIcon: true,
    variant: 'danger',
    title: 'Error',
    children: 'There is an error',
  },
};

/** Custom icon when default (Exclamation-circle / Info-circle) is not desired. */
export const WithCustomIcon = {
  ...Playground,
  args: {
    variant: 'base',
    withDefaultIcon: false,
    icon: 'Exclamation-circle',
    title: 'Custom',
    children: 'Use the icon prop when you need a specific icon other than the withDefaultIcon default.',
  },
};
