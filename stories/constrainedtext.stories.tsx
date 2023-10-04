import React from 'react';
import { ConstrainedText } from '../src/lib/components/constrainedtext/Constrainedtext.component';
import { Wrapper, Title } from './common';
export default {
  title: 'Components/Constrainedtext',
  component: ConstrainedText,
};
export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <Title>Constrained Text</Title>
        <div
          style={{
            width: '100px',
            color: '#0F7FFF',
          }}
        >
          <ConstrainedText
            text={'This is a long phrase'}
            tooltipStyle={{
              width: '100px',
            }}
          />
          <ConstrainedText
            text={'This'}
            tooltipStyle={{
              width: '100px',
            }}
          />
        </div>
        <Title>With the ability to customize the style of tooltip</Title>
        <div
          style={{
            width: '100px',
            color: '#0F7FFF',
          }}
        >
          <ConstrainedText
            text={'This is a long phrase'}
            tooltipStyle={{
              width: '100px',
            }}
            tooltipPlacement="right"
          />
        </div>

        <Title>With the ability to customize the number of line</Title>
        <div
          style={{
            width: '100px',
            color: '#0F7FFF',
          }}
        >
          <ConstrainedText
            text={'This is a long phrase that should get into 2 lines'}
            tooltipStyle={{
              width: '100px',
            }}
            lineClamp={2}
          />
        </div>
      </Wrapper>
    );
  },
};
