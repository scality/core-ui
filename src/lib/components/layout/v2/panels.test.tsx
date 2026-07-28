import { render, screen } from '@testing-library/react';
import { getWrapper } from '../../../testUtils';
import { TwoPanelLayout } from './panels';

const { Wrapper } = getWrapper();

describe('TwoPanelLayout', () => {
  it("renders both panels' content when the right panel opts into being a container", () => {
    render(
      <TwoPanelLayout
        panelsRatio="50-50"
        container="right"
        leftPanel={{ children: <div>left content</div> }}
        rightPanel={{ children: <div>right content</div> }}
      />,
      { wrapper: Wrapper },
    );
    expect(screen.getByText('left content')).toBeVisible();
    expect(screen.getByText('right content')).toBeVisible();
  });
});
