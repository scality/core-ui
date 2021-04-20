//@flow
import React from 'react';
import TextBadge from '../src/lib/components/textbadge/TextBadge.component';
import { Wrapper, Title } from './common';

export default {
  title: 'Components/TextBadge',
  component: TextBadge,
};

export const Default = () => {
  return (
    <Wrapper>
      <Title>Text Badges</Title>
      <TextBadge
        text='1'
        variant='healthy'
      />
      <TextBadge
        text='2'
        variant='secondary'
      />
      <TextBadge
        text='3'
        variant='base'
      />
      <TextBadge
        text='Badge'
        variant='danger'
      />
    </Wrapper>
  );
};
