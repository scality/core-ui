import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Barchart, {
  BarchartProps,
} from '../../src/lib/components/barchartv2/Barchart.component';

import { Wrapper } from '../common';

type Story = StoryObj<typeof Barchart>;

const meta: Meta<typeof Barchart> = {
  title: 'Components/Data Display/Charts/Barchartv2',
  component: Barchart,
  decorators: [
    (story) => (
      <Wrapper style={{ height: '100vh', width: '100vw' }}>{story()}</Wrapper>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const exampleData: BarchartProps['bars'] = [
  {
    label: 'Success',
    data: [
      ['category1', 2],
      ['category2', 4],
      ['category3', 6],
    ],
    color: 'green',
  },
  {
    label: 'Failed',
    data: [
      ['category1', 8],
      ['category2', 10],
      ['category3', 12],
    ],
    color: 'red',
  },
];

export const Playground: Story = {
  render: () => {
    return <Barchart type="category" bars={exampleData} />;
  },
};
