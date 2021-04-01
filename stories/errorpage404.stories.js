//@flow
import React from 'react';
import ErrorPage404 from '../src/lib/components/error-pages/ErrorPage404.component';
import { Wrapper } from './common';

export default {
  title: 'Components/Navigation/ErrorPages/404',
  component: ErrorPage404,
};

export const Default = () => {
  return (
    <Wrapper>
      <ErrorPage404 btnLink="/"/>
    </Wrapper>
  );
};
