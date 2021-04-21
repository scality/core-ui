//@flow
import React from 'react';
import ErrorPageAuth from '../src/lib/components/error-pages/ErrorPageAuth.component';
import { Wrapper } from './common';

export default {
  title: 'Components/Navigation/ErrorPages/Auth',
  component: ErrorPageAuth,
};

export const Default = () => {
  return (
    <Wrapper>
      <ErrorPageAuth btnLink="/" />
    </Wrapper>
  );
};

export const WithSupportLink = () => {
  return (
    <Wrapper>
      <ErrorPageAuth
        btnLink="/"
        supportLink="https://www.scality.com/support/"
      />
    </Wrapper>
  );
};

export const WithLocale = () => {
  return (
    <Wrapper>
      <ErrorPageAuth
        btnLink="/"
        supportLink="https://www.scality.com/support/"
        locale="fr"
      />
    </Wrapper>
  );
};
