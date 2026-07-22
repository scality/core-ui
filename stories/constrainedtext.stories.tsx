import React from 'react';
import { ConstrainedText } from '../src/lib/components/constrainedtext/Constrainedtext.component';
import { Wrapper } from './common';
import { placementOptions } from './controls';
import { Text } from '../src/lib/components/text/Text.component';
export default {
  title: 'Components/Constrained Text',
  component: ConstrainedText,
  decorators: [
    (story) => (
      <Wrapper style={{ minHeight: '10vh', padding: '3rem' }}>
        <div
          style={{
            width: '100px',
            color: '#0F7FFF',
          }}
        >
          {story()}
        </div>
      </Wrapper>
    ),
  ],
  argTypes: {
    tooltipPlacement: {
      options: placementOptions,
    },
  },
};

export const Default = {
  args: {
    text: 'This is a long long phrase',
    tooltipStyle: { width: '100px' },
  },
};

export const CustomizedTooltip = {
  ...Default,
  args: {
    text: <Text>This is a long long phrase</Text>,
    tooltipStyle: { width: '100px', color: 'lightblue' },
    tooltipPlacement: 'right',
    color: 'statusCritical',
  },
};

export const ConstrainedTextOnMultipleLines = {
  ...Default,
  args: {
    ...Default.args,
    text: 'This is a really long long phrase that should take 2 lines',
    lineClamp: 2,
  },
};
