import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getWrapper } from '../../testUtils';
import { Tooltip } from './Tooltip.component';

describe('Tooltip', () => {
  const { Wrapper } = getWrapper();

  const renderTooltip = (props?: { overlay?: React.ReactNode }) =>
    render(
      <Tooltip overlay="Sorted by last modified" {...props}>
        <button>Last modified</button>
      </Tooltip>,
      { wrapper: Wrapper },
    );

  // The wrapper carries the description, not the child.
  const describedTrigger = () =>
    screen.getByRole('button').closest('[aria-describedby]');

  it('shows no overlay until the trigger is hovered', () => {
    renderTooltip();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(describedTrigger()).toBeNull();
  });

  it('exposes the hovered overlay as a tooltip', async () => {
    renderTooltip();

    await userEvent.hover(screen.getByRole('button'));

    expect(screen.getByRole('tooltip')).toHaveTextContent(
      'Sorted by last modified',
    );
  });

  it('describes the trigger with the overlay while it is shown', async () => {
    renderTooltip();

    await userEvent.hover(screen.getByRole('button'));

    expect(describedTrigger()).toHaveAttribute(
      'aria-describedby',
      screen.getByRole('tooltip').id,
    );
  });

  it('stops describing the trigger once the overlay is gone', async () => {
    renderTooltip();

    await userEvent.hover(screen.getByRole('button'));
    await userEvent.unhover(screen.getByRole('button'));

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(describedTrigger()).toBeNull();
  });

  it('opens when the trigger is tabbed to, and closes on Escape', async () => {
    renderTooltip();

    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await userEvent.type(screen.getByRole('button'), '{esc}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('describes nothing when there is no overlay to show', async () => {
    renderTooltip({ overlay: undefined });

    await userEvent.hover(screen.getByRole('button'));

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(describedTrigger()).toBeNull();
  });

  it('keeps the sc-tooltip classes that other components style against', async () => {
    renderTooltip();

    expect(document.querySelector('.sc-tooltip')).toBeInTheDocument();

    await userEvent.hover(screen.getByRole('button'));

    expect(document.querySelector('.sc-tooltip-overlay')).toBeInTheDocument();
    expect(
      document.querySelector('.sc-tooltip-overlay-text'),
    ).toBeInTheDocument();
  });
});
