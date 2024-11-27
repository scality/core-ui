import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { getWrapper } from '../../testUtils';

import userEvent from '@testing-library/user-event';
import { IconHelp } from './IconHelper';

describe('Icon', () => {
  const selectors = {
    icon: () => screen.getByRole('img', { name: /Info/i }),
  };
  const renderIcon = (tooltipMessage: React.ReactNode) => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <IconHelp tooltipMessage={tooltipMessage} />
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
  it('should be able to change accessible label with title', async () => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <IconHelp
          tooltipMessage={'This is a tooltip'}
          title="Info Helper testing"
        />
      </Wrapper>,
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Info Helper testing')).toBeInTheDocument();
    });
  });
});
