import React from 'react';
import { ErrorPage404 } from '../src/lib/components/error-pages/ErrorPage404.component';
import { Wrapper } from './common';
export default {
  title: 'Components/Navigation/ErrorPages/404',
  component: ErrorPage404,
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
          <ErrorPage404 onReturnHomeClick={() => {}} />
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
          <ErrorPage404 locale="fr" onReturnHomeClick={() => {}} />
        </div>
      </Wrapper>
    );
  },
};
