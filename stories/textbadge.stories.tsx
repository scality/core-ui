import React from 'react';
import { TextBadge } from '../src/lib/components/textbadge/TextBadge.component';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/TextBadge',
  component: TextBadge,
};

export const Playground = {
  args: {
    text: 'Test me',
  },
};
export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <Title>Text Badges</Title>
        <TextBadge text="0" />
        <TextBadge text="1" variant="statusHealthy" />
        <TextBadge text="2" variant="statusWarning" />
        <TextBadge text="3" variant="statusCritical" />
        <TextBadge text="Badge" variant="infoSecondary" />
      </Wrapper>
    );
  },
};
