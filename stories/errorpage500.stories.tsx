import React from 'react';
import { ErrorPage500 } from '../src/lib/components/error-pages/ErrorPage500.component';
import { Wrapper } from './common';
export default {
  title: 'Components/Navigation/ErrorPages/500',
  component: ErrorPage500,
  decorators: [
    (story) => <Wrapper style={{ height: '100vh' }}>{story()}</Wrapper>,
  ],
  args: {
    onReturnHomeClick: () => {},
  },
  argTypes: {
    locale: {
      options: ['en', 'fr'],
      control: { type: 'radio' },
    },
    errorMessage: {
      control: {
        type: 'object',
      },
    },
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
    supportLink: 'https://www.scality.com/support/',
    locale: 'fr',
  },
};
export const CustomerizedError = {
  args: {
    supportLink: 'https://www.scality.com/support/',
    errorMessage: {
      en: 'Failed to log you in, this might be due to time synchronization between the browser and the server.',
      fr: `Impossible de vous connecter, cela peut être dû à la synchronisation de l'heure entre le navigateur et le serveur.`,
    },
  },
};
