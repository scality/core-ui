//@flow
import React from 'react';
import ErrorPage500 from '../src/lib/components/error-pages/ErrorPage500.component';
import { Wrapper } from './common';

export default {
  title: 'Components/Navigation/ErrorPages/500',
  component: ErrorPage500,
};

export const Default = () => {
  return (
    <Wrapper>
      <ErrorPage500 btnLink="/"/>
    </Wrapper>
  );
};

export const WithSupportLink = () => {
  return (
    <Wrapper>
      <ErrorPage500 btnLink="/" supportLink="https://www.scality.com/support/"/>
    </Wrapper>
  );
};

export const WithLocale = () => {
  return (
    <Wrapper>
      <ErrorPage500 btnLink="/" supportLink="https://www.scality.com/support/" locale="fr"/>
    </Wrapper>
  );
};
