import React from 'react';
import { ErrorPageAuth } from '../src/lib/components/error-pages/ErrorPageAuth.component';
import { Wrapper } from './common';
import { localeArgtype } from './controls';
export default {
  title: 'Components/Navigation/ErrorPages/Auth',
  component: ErrorPageAuth,
  decorators: [
    (story) => <Wrapper style={{ height: '100vh' }}>{story()}</Wrapper>,
  ],
  args: {
    onReturnHomeClick: () => {},
  },
  argTypes: {
    locale: localeArgtype,
  },
};
export const Default = {};

export const WithSupportLink = {
  args: {
    supportLink: 'https://www.scality.com/support/',
  },
};

export const WithLocale = {
  args: {
    locale: 'fr',
    supportLink: 'https://www.scality.com/support/',
  },
};
