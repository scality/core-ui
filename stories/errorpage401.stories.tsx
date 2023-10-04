import React from 'react';
import { ErrorPage401 } from '../src/lib/components/error-pages/ErrorPage401.component';
import { Wrapper } from './common';
export default {
  title: 'Components/Navigation/ErrorPages/401',
  component: ErrorPage401,
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
          <ErrorPage401
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
          <ErrorPage401
            locale="fr"
            supportLink="https://www.scality.com/support/"
            onReturnHomeClick={() => {}}
          />
        </div>
      </Wrapper>
    );
  },
};
