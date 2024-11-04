import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useTheme } from 'styled-components';
import {
  Accordion,
  AccordionProps,
} from '../../src/lib/components/accordion/Accordion.component';
import { Button } from '../../src/lib/components/buttonv2/Buttonv2.component';
import { spacing, Stack } from '../../src/lib/spacing';
import { Text } from '../../src/lib';

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
      <Accordion {...args} />
    </Stack>
  ),
};

export const WithCustomStyle: AccordionStory = {
  render: (args) => {
    const { title } = args;
    const theme = useTheme();

    const style = {
      backgroundColor: theme.statusHealthy,
      borderRadius: spacing.r4,
      padding: spacing.r16,
      margin: spacing.r8,
    };
    return (
      <Accordion {...args} style={style} title={title}>
        <Text>The container of this accordion has a custom style</Text>
      </Accordion>
    );
  },
  args: {
    title: 'Accordion with custom style',
  },
};
