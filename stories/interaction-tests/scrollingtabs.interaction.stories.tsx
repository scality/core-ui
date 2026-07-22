import React from 'react';
import { within, userEvent, expect, waitFor } from 'storybook/test';
import { BrowserRouter } from 'react-router-dom';
import { Tabs, Tab } from '../../src/lib/components/tabsv2/Tabsv2.component';
import { Wrapper } from '../common';

// Tabs collapse into a horizontally scrollable strip with chevron affordances
// once they no longer fit. Whether they fit is a pure measurement question
// (clientWidth / scrollWidth / scrollLeft) — jsdom reports 0 for all of them,
// so this behavior can only be exercised in a real browser.
const meta = {
  title: 'Interaction Tests/Scrolling Tabs',
  component: Tabs,
  tags: ['interaction-test'],
  decorators: [
    (story: () => React.ReactNode) => (
      <BrowserRouter>
        <Wrapper style={{ minHeight: '12rem' }}>
          {/* deliberately narrow so the tab strip overflows and must scroll */}
          <div style={{ width: '320px' }}>{story()}</div>
        </Wrapper>
      </BrowserRouter>
    ),
  ],
};
export default meta;

const LABELS = [
  'Overview',
  'Configuration',
  'Networking',
  'Storage volumes',
  'Access policies',
  'Monitoring',
  'Audit log',
  'Advanced settings',
];

const ManyTabs = () => (
  <Tabs>
    {LABELS.map((label, index) => (
      <Tab
        key={index}
        path={index === 0 ? '/iframe.html' : `/tab-${index}`}
        exact={index !== 0}
        label={label}
      >
        <div style={{ padding: 16 }}>{label} content</div>
      </Tab>
    ))}
  </Tabs>
);

export const ScrollsWhenTabsOverflow = {
  render: () => <ManyTabs />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const bar = canvasElement.querySelector('.sc-tabs-bar') as HTMLElement;
    // the scroller (TabBar's parent) owns the horizontal overflow
    const scroller = bar.parentElement as HTMLElement;

    // real layout: the strip is wider than its viewport
    await waitFor(() =>
      expect(scroller.scrollWidth).toBeGreaterThan(scroller.clientWidth),
    );

    // the end scroll affordance only mounts *because* of that overflow; it is
    // rendered as the scroller's next sibling inside the scrollable container
    let endButton!: HTMLElement;
    await waitFor(() => {
      endButton = scroller.nextElementSibling as HTMLElement;
      expect(endButton).toBeInTheDocument();
    });

    // clicking it animates the strip to the right
    const before = scroller.scrollLeft;
    await userEvent.click(endButton);
    await waitFor(() =>
      expect(scroller.scrollLeft).toBeGreaterThan(before),
    );
  },
};
