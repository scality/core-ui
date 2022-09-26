import React from 'react';
import { Banner } from '../src/lib/components/banner/Banner.component';
import { Props } from '../src/lib/components/banner/Banner.component';
import { Icon } from '../src/lib/components/icon/Icon.component';
import { Wrapper } from './common';
export default {
  title: 'Components/Notification/Banner',
  component: Banner,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
    variant: {
      control: {
        type: 'select',
        options: [
          'base',
          'secondary',
          'healthy',
          'warning',
          'danger',
          'success',
        ],
      },
    },
    title: {},
    icon: {
      control: {
        disable: true,
      },
    },
  },
};
export const ErrorBanner = ({}) => (
  <Wrapper>
    <Banner
      variant="danger"
      icon={<Icon name="Exclamation-triangle" />}
      title={'Error'}
    >
      {'There is an error.'}
    </Banner>
  </Wrapper>
);
export const WarningBanner = ({}) => (
  <Wrapper>
    <Banner
      variant="warning"
      icon={<Icon name="Exclamation-triangle" />}
      title={'Warning'}
    >
      {'There is a warning.'}
    </Banner>
  </Wrapper>
);
export const SuccessBanner = ({}) => (
  <Wrapper>
    <Banner
      variant="healthy"
      icon={<Icon name="Exclamation-triangle" />}
      title={'Success'}
    >
      {'There is a success.'}
    </Banner>
  </Wrapper>
);

const Template = (args: Props) => <Banner {...args} />;

export const Playground: {
  args?: Props;
} = Template.bind({});
Playground.args = {
  variant: 'healthy',
  icon: <Icon name="Exclamation-triangle" />,
  title: 'Man',
  children: 'There is a success',
};
