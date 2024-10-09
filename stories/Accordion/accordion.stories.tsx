import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import {
  Accordion,
  AccordionProps,
} from '../../src/lib/components/accordion/accordion.component';
import { Stack } from '../../src/lib/spacing';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';

type AccordionStory = StoryObj<AccordionProps>;

const meta: Meta<AccordionProps> = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    title: 'Accordion title',
    children: (
      <Stack direction="vertical" gap="r8">
        <div>This is the content of the accordion.</div>
        <Button label={'Check'} onClick={() => console.log('click')}></Button>
      </Stack>
    ),
  },
  argTypes: {
    children: {
      control: { disable: true },
      description: 'Content of the accordion',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Title of the accordion',
      table: {
        type: { summary: 'string' },
      },
    },
    style: {
      control: { disable: true },
      description: 'Use this to style the accordion content container',
      table: { type: { summary: 'CSSProperties' } },
    },
    id: {
      control: { disable: true },
      table: { type: { summary: 'string' } },
      description: 'Unique id for the accordion content container',
    },
  },
};

export default meta;

export const Playground: AccordionStory = {};

export const Stacked: AccordionStory = {
  render: (args) => (
    <Stack direction="vertical" gap="r8">
      <Accordion {...args} />
      <Accordion {...args} />
      <Accordion {...args} style={{ backgroundColor: 'grey' }} />
    </Stack>
  ),
};
