import React from 'react';
import { Loader } from '../src/lib/components/loader/Loader.component';
import { Wrapper } from './common';
import { Size } from '../src/lib/components/constants';

const info = {
  title: 'Components/Progress & loading/Loader',
  component: Loader,
  args: {
    size: 'base',
    children: 'Loading',
  },
  argTypes: {
    color: {
      control: 'color',
    },
  },
};
export default info;

const sizes: Size[] = ['base', 'large', 'larger', 'huge', 'massive'];

export const BasicLoader = {};

export const DifferentColor = {
  args: {
    color: 'white',
  },
};

export const DifferentSizes = {
  render: ({}) => {
    return (
      <>
        {sizes.map((size) => (
          <Loader key={size} size={size}>
            <span>Loader</span>
          </Loader>
        ))}
      </>
    );
  },
};

export const CenteredLoader = {
  args: {
    centered: true,
  },
};
