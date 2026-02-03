import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { getWrapper } from '../../testUtils';

import userEvent from '@testing-library/user-event';
import { IconHelp } from './IconHelper';

describe('IconHelper', () => {
  const selectors = {
    icon: () => screen.getByRole('img'),
  };
  const renderIcon = (tooltipMessage: React.ReactNode) => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <IconHelp tooltipMessage={tooltipMessage} title="Info" />
      </Wrapper>,
    );
  };
  it('should render correctly', async () => {
    renderIcon('This is a tooltip');
    await waitFor(() => {
      expect(selectors.icon()).toBeInTheDocument();
    });
  });
  it('should display tooltip on hover', async () => {
    const tooltipMessage = 'This is another tooltip';
    renderIcon(tooltipMessage);

    await waitFor(() => {
      expect(selectors.icon()).toBeInTheDocument();
    });
    userEvent.hover(selectors.icon());
    await waitFor(() => {
      expect(screen.getByText(tooltipMessage)).toBeVisible();
    });
  });
  it('should render with title prop (passed to FontAwesome as native tooltip)', async () => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <IconHelp
          tooltipMessage={'This is a tooltip'}
          title="Info Helper Testing"
        />
      </Wrapper>,
    );
    await waitFor(() => {
      expect(screen.getByRole('img', { name: /Info/i })).toBeInTheDocument();
    });
  });
});
