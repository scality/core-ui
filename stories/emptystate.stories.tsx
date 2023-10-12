import React from 'react';
import { EmptyState } from '../src/lib/components/emptystate/Emptystate.component';
import { Wrapper } from './common';
export default {
  title: 'Components/EmptyState',
  component: EmptyState,
  decorators:[(story) => (
    <Wrapper >
        {story()}
    </Wrapper>) ],
  args:{
    icon:"Node-backend",
    label:"Node"
  }
};

export const Default = {}

export const WithLink = {
  args: {
    link:"",
    history:{
      push: () => {}
  }
}
}

