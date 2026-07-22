import React from 'react';
import { within, userEvent, expect, screen } from 'storybook/test';
import { ConstrainedText } from '../../src/lib/components/constrainedtext/Constrainedtext.component';
import { Wrapper } from '../common';

// Grouped under a dedicated "Interaction Tests" sidebar section so the
// browser-only behaviors are easy to switch between during a demo. The
// `interaction-test` tag (set on the meta, inherited by every story here) lets
// `test-storybook --includeTags interaction-test` run exactly this set.
const meta = {
  title: 'Interaction Tests/Constrained Text',
  component: ConstrainedText,
  tags: ['interaction-test'],
  decorators: [
    (story: () => React.ReactNode) => (
      <Wrapper style={{ minHeight: '10vh', padding: '3rem' }}>
        {/* the 100px box is what forces the text to clip */}
        <div style={{ width: '100px', color: '#0F7FFF' }}>{story()}</div>
      </Wrapper>
    ),
  ],
};
export default meta;

const baseArgs = {
  text: 'This is a long long phrase',
  tooltipStyle: { width: '100px' },
};

// The tooltip only exists when the text is actually clipped — something only a
// layout engine knows.
export const ShowsTooltipWhenClipped = {
  args: baseArgs,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
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
  args: { ...baseArgs, text: 'Short' },
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
