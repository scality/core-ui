import React from 'react';
import { ErrorPage401 } from '../src/lib/components/error-pages/ErrorPage401.component';
import { Wrapper } from './common';
import { localeArgtype } from './controls';
export default {
  title: 'Components/Navigation/Error Pages/401',
  component: ErrorPage401,
  decorators: [
    (story) => <Wrapper style={{ height: '100vh' }}>{story()}</Wrapper>,
  ],
  args: {
    supportLink: 'https://www.scality.com/support/',
    onReturnHomeClick: () => {},
  },
  argTypes: {
    locale: localeArgtype,
  },
};
export const Default = {};

export const WithLocale = {
  args: {
    locale: 'fr',
  },
};
