import React from 'react';
import { EmptyState } from '../src/lib/components/emptystate/Emptystate.component';
import { Wrapper } from './common';
export default {
  title: 'Components/EmptyState',
  component: EmptyState,
};
export const WithLink = {
  render: ({}) => {
    return (
      <Wrapper>
        <EmptyState
          icon="Node-backend"
          label="Node"
          link=""
          history={{
            push: () => {},
          }}
        />
      </Wrapper>
    );
  },
};
export const WithoutLink = {
  render: ({}) => {
    return (
      <Wrapper>
        <EmptyState icon="Node-backend" label="node" />
      </Wrapper>
    );
  },
};
