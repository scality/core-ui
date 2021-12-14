//@flow
import React from 'react';
import ErrorPage401 from '../src/lib/components/error-pages/ErrorPage401.component';
import { Wrapper } from './common';

export default {
  title: 'Components/Navigation/ErrorPages/401',
  component: ErrorPage401,
};

export const Default = () => {
  return (
    <Wrapper>
      <ErrorPage401
        btnLink="/"
        supportLink="https://www.scality.com/support/"
        history={{ push: () => {} }}
      />
    </Wrapper>
  );
};

export const WithLocale = () => {
  return (
    <Wrapper>
      <ErrorPage401
        btnLink="/"
        locale="fr"
        supportLink="https://www.scality.com/support/"
        history={{ push: () => {} }}
      />
    </Wrapper>
  );
};
