import React from 'react';
import { ErrorPage500 } from '../src/lib/components/error-pages/ErrorPage500.component';
import { Wrapper } from './common';
export default {
  title: 'Components/Navigation/ErrorPages/500',
  component: ErrorPage500,
};
export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <div
          style={{
            height: '100vh',
          }}
        >
          <ErrorPage500 onReturnHomeClick={() => {}} />
        </div>
      </Wrapper>
    );
  },
};
export const WithSupportLink = {
  render: ({}) => {
    return (
      <Wrapper>
        <div
          style={{
            height: '100vh',
          }}
        >
          <ErrorPage500
            supportLink="https://www.scality.com/support/"
            onReturnHomeClick={() => {}}
          />
        </div>
      </Wrapper>
    );
  },
};
export const WithLocale = {
  render: ({}) => {
    return (
      <Wrapper>
        <div
          style={{
            height: '100vh',
          }}
        >
          <ErrorPage500
            supportLink="https://www.scality.com/support/"
            locale="fr"
            onReturnHomeClick={() => {}}
          />
        </div>
      </Wrapper>
    );
  },
};
export const CustomerizedError = {
  render: ({}) => {
    return (
      <Wrapper>
        <div
          style={{
            height: '100vh',
          }}
        >
          <ErrorPage500
            supportLink="https://www.scality.com/support/"
            locale="en"
            onReturnHomeClick={() => {}}
            errorMessage={{
              en: 'Failed to log you in, this might be due to time synchronization between the browser and the server.',
              fr: `Impossible de vous connecter, cela peut être dû à la synchronisation de l'heure entre le navigateur et le serveur.`,
            }}
          />
        </div>
      </Wrapper>
    );
  },
};
