import React from 'react';
import { ErrorPageAuth } from '../src/lib/components/error-pages/ErrorPageAuth.component';
import { Wrapper } from './common';
export default {
  title: 'Components/Navigation/ErrorPages/Auth',
  component: ErrorPageAuth,
};
export const Default = ({}) => {
  return (
    <Wrapper>
      <div
        style={{
          height: '100vh',
        }}
      >
        <ErrorPageAuth onReturnHomeClick={() => {}} />
      </div>
    </Wrapper>
  );
};
export const WithSupportLink = ({}) => {
  return (
    <Wrapper>
      <div
        style={{
          height: '100vh',
        }}
      >
        <ErrorPageAuth
          supportLink="https://www.scality.com/support/"
          onReturnHomeClick={() => {}}
        />
      </div>
    </Wrapper>
  );
};
export const WithLocale = ({}) => {
  return (
    <Wrapper>
      <div
        style={{
          height: '100vh',
        }}
      >
        <ErrorPageAuth
          btnLink="/"
          supportLink="https://www.scality.com/support/"
          locale="fr"
        />
      </div>
    </Wrapper>
  );
};
