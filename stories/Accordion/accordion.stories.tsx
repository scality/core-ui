import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Accordion, {
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
        <div>This the subtitle explaining the content of the accordion.</div>
        <div>This is the content of the accordion.</div>
      </Stack>
    ),
  },
};

export default meta;

export const Playground: AccordionStory = {};
