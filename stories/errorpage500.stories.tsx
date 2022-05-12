import React from 'react';
import { ErrorPage500 } from '../src/lib/components/error-pages/ErrorPage500.component';
import { Wrapper } from './common';
export default {
  title: 'Components/Navigation/ErrorPages/500',
  component: ErrorPage500,
};
export const Default = () => {
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
};
export const WithSupportLink = () => {
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
};
export const WithLocale = () => {
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
};
