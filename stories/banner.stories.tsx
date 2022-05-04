import React from 'react';
import Banner from '../src/lib/components/banner/Banner.component';
import { Props } from '../src/lib/components/banner/Banner.component';
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
export const ErrorBanner = () => (
  <Wrapper>
    <Banner
      variant="danger"
      icon={<i className="fas fa-exclamation-triangle" />}
      title={'Error'}
    >
      {'There is an error.'}
    </Banner>
  </Wrapper>
);
export const WarningBanner = () => (
  <Wrapper>
    <Banner
      variant="warning"
      icon={<i className="fas fa-exclamation-triangle" />}
      title={'Warning'}
    >
      {'There is a warning.'}
    </Banner>
  </Wrapper>
);
export const SuccessBanner = () => (
  <Wrapper>
    <Banner
      variant="success"
      icon={<i className="fas fa-exclamation-triangle" />}
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
  variant: 'success',
  icon: <i className="fas fa-exclamation-triangle" />,
  title: 'Man',
  children: 'There is a success',
};