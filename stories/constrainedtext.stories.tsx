import React from 'react';
import { within, userEvent, expect, screen } from 'storybook/test';
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

// Real-browser interaction test: the tooltip only exists when the text is
// actually clipped — something only a layout engine knows. Hidden from the
// deployed sidebar (`!dev`) but still runs as a test; `interaction-test` lets
// the runner target it explicitly.
export const ShowsTooltipWhenClipped = {
  ...Default,
  tags: ['!dev', 'interaction-test'],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // the clipped label lives inside the 100px story container
    const label = canvas.getByText('This is a long long phrase');

    // first assert the *cause*: the text really overflows its box. This is the
    // exact `offsetWidth < scrollWidth` check the component uses, and it only
    // holds in a real layout engine — in jsdom both read 0, so this is
    // untestable there. scrollWidth > clientWidth ⟹ the ellipsis is active.
    const clipped = canvasElement.querySelector(
      '.sc-constrainedtext',
    ) as HTMLElement;
    await expect(clipped.scrollWidth).toBeGreaterThan(clipped.clientWidth);

    // then the *effect*: hovering the clipped text reveals the full value
    await userEvent.hover(label);

    // the tooltip overlay is portaled to document.body → assert via `screen`,
    // scoped to the overlay class so it doesn't match the trigger text
    const overlay = await screen.findByText('This is a long long phrase', {
      selector: '.sc-tooltip-overlay-text',
    });
    await expect(overlay).toBeVisible();
  },
};

// Contrast case: text that fits the 100px box is NOT clipped, so the component
// mounts no tooltip at all. This is the negative half of the layout assertion —
// it can only be told apart from the clipped case by a real layout engine, and
// guards against a tooltip that fires when it shouldn't.
export const NoTooltipWhenTextFits = {
  ...Default,
  args: {
    ...Default.args,
    text: 'Short',
  },
  tags: ['!dev', 'interaction-test'],
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Short');

    // the text fits, so it does not overflow its box → ellipsis inactive
    const fitted = canvasElement.querySelector(
      '.sc-constrainedtext',
    ) as HTMLElement;
    await expect(fitted.scrollWidth).toBeLessThanOrEqual(fitted.clientWidth);

    // hovering must not surface any tooltip overlay
    await userEvent.hover(label);
    await expect(
      screen.queryByText('Short', { selector: '.sc-tooltip-overlay-text' }),
    ).not.toBeInTheDocument();
  },
};
