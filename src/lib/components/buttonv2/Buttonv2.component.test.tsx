import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getWrapper } from '../../testUtils';
import { Button } from './Buttonv2.component';

describe('Button', () => {
  const { Wrapper } = getWrapper();
  const icon = <i className="fas fa-plus" aria-hidden />;

  it('shows the label text and uses it as the accessible name by default', () => {
    render(<Button icon={icon} label="Create" variant="secondary" />, {
      wrapper: Wrapper,
    });

    expect(screen.getByText('Create')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create' }),
    ).toBeInTheDocument();
  });

  it('hides the label text but keeps it as the accessible name when collapsed to icon-only', () => {
    render(
      <Button icon={icon} label="Create" variant="secondary" iconOnly />,
      { wrapper: Wrapper },
    );

    expect(screen.queryByText('Create')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create' }),
    ).toBeInTheDocument();
  });

  it('keeps an accessible name when collapsed to icon-only with a non-string label', () => {
    render(
      <Button
        icon={icon}
        label={<span>Create</span>}
        variant="secondary"
        iconOnly
      />,
      { wrapper: Wrapper },
    );

    expect(
      screen.getByRole('button', { name: 'Create' }),
    ).toBeInTheDocument();
  });

  it('reveals the label as a tooltip on hover when collapsed to icon-only', async () => {
    render(
      <Button icon={icon} label="Create" variant="secondary" iconOnly />,
      { wrapper: Wrapper },
    );

    await userEvent.hover(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() =>
      expect(screen.getByText('Create')).toBeInTheDocument(),
    );
  });

  it('keeps the label visible when iconOnly is set on a button without an icon', () => {
    render(<Button label="Create" variant="secondary" iconOnly />, {
      wrapper: Wrapper,
    });

    expect(screen.getByText('Create')).toBeInTheDocument();
  });
});
