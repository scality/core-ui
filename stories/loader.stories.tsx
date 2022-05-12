import React from 'react';
import { Loader } from '../src/lib/components/loader/Loader.component';
import { Wrapper } from './common';

const info = {
  title: 'Components/Progress & loading/Loader',
  component: Loader,
};
export default info;

const sizes = ['base', 'large', 'larger', 'huge', 'massive'];

export const Default = () => {
  return (
    <Wrapper>
      {sizes.map((size) => (
        <Loader key={size} size={size}>
          Loader
        </Loader>
      ))}
    </Wrapper>
  );
};
