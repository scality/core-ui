import React from 'react';
import { ErrorPage404 } from '../src/lib/components/error-pages/ErrorPage404.component';
import { Wrapper } from './common';
import { localeArgtype } from './controls';
export default {
  title: 'Components/Navigation/Error Pages/404',
  component: ErrorPage404,
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

export const WithLocale = {
  args: {
    locale: 'fr',
  },
};
