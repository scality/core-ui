import React from 'react';
import Emptystate from '../src/lib/components/emptystate/Emptystate.component';
import { Wrapper } from './common';
export default {
  title: 'Components/EmptyState',
  component: Emptystate,
};
export const WithLink = () => {
  return (
    <Wrapper>
      <Emptystate
        icon="fa-server"
        label="node"
        link=""
        history={{
          push: () => {},
        }}
      />
    </Wrapper>
  );
};
export const WithoutLink = () => {
  return (
    <Wrapper>
      <Emptystate icon="fa-server" label="node" />
    </Wrapper>
  );
};