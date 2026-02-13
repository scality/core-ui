import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { getWrapper } from '../../testUtils';

import userEvent from '@testing-library/user-event';
import { IconHelp } from './IconHelper';

describe('IconHelper', () => {
  const selectors = {
    helpButton: () => screen.getByRole('button', { name: /Info/i }),
  };
  const renderIcon = (tooltipMessage: React.ReactNode) => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <IconHelp tooltipMessage={tooltipMessage} aria-label="Info" />
      </Wrapper>,
    );
  };
  it('should render correctly', async () => {
    renderIcon('This is a tooltip');
    await waitFor(() => {
      expect(selectors.helpButton()).toBeInTheDocument();
    });
  });
  it('should display tooltip on hover', async () => {
    const tooltipMessage = 'This is another tooltip';
    renderIcon(tooltipMessage);

    await waitFor(() => {
      expect(selectors.helpButton()).toBeInTheDocument();
    });
    userEvent.hover(selectors.helpButton());
    await waitFor(() => {
      expect(screen.getByText(tooltipMessage)).toBeVisible();
    });
  });
  it('should render with aria-label prop for accessibility', async () => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <IconHelp
          tooltipMessage={'This is a tooltip'}
          aria-label="Info Helper Testing"
        />
      </Wrapper>,
    );
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Info Helper Testing/i }),
      ).toBeInTheDocument();
    });
  });
});
