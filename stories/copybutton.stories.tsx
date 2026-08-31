import { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { Box, CopyButton } from '../src/lib/next';
import { Text } from '../src/lib/components/text/Text.component';
import { Stack } from '../src/lib/spacing';
import { Wrapper } from './common';

type Story = StoryObj<typeof CopyButton>;

const meta: Meta = {
  title: 'Components/CopyButton',
  component: CopyButton,
  decorators: [
    (story) => (
      <Wrapper className="storybook-button" style={{ height: 'auto' }}>
        {story()}
      </Wrapper>
    ),
  ],
};

export default meta;

export const CopyButtons: Story = {
  args: {
    textToCopy: 'Playground',
  },
};
export const CopyButtonsWithLabel: Story = {
  ...CopyButtons,
  args: {
    ...CopyButtons.args,
    label: 'Test',
  },
};

export const OutlinedCopyButton: Story = {
  ...CopyButtons,
  args: {
    ...CopyButtons.args,
    variant: 'outline',
  },
};

export const OutlinedCopyButtonWithLabel: Story = {
  ...OutlinedCopyButton,
  args: {
    ...OutlinedCopyButton.args,
    label: 'Test',
  },
};

export const OutlinedCopyButtonWithBigLabel: Story = {
  ...OutlinedCopyButton,
  args: {
    ...OutlinedCopyButton.args,
    label: 'Certificate',
    textToCopy: 'Certificate',
  },
};

// `iconOnly` on an outline copy button: the width floor that keeps the button from
// resizing on click used to be applied unconditionally, so the button stayed ~8.5rem
// wide with nothing in it. Both forms are shown — `true` collapses always, a number
// collapses below that container width, which needs the `container` Box to resolve.
export const OutlinedCopyButtonIconOnly: StoryObj = {
  render: () => (
    <Stack direction="vertical" gap="r16">
      <Stack direction="vertical" gap="r4">
        <Text>iconOnly — collapsed at every width</Text>
        <Box>
          <CopyButton
            variant="outline"
            label="Certificate"
            textToCopy="Certificate"
            iconOnly
          />
        </Box>
      </Stack>
      <Stack direction="vertical" gap="r4">
        <Text>
          iconOnly={'{240}'} — drag the frame below 240px to collapse it
        </Text>
        <div
          style={{
            resize: 'horizontal',
            overflow: 'auto',
            width: '20rem',
            minWidth: '8rem',
            maxWidth: '100%',
            border: '1px dashed #666',
            padding: '0.5rem',
          }}
        >
          <Box container>
            <CopyButton
              variant="outline"
              label="Certificate"
              textToCopy="Certificate"
              iconOnly={240}
            />
          </Box>
        </div>
      </Stack>
    </Stack>
  ),
};
