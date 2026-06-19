import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getWrapper } from '../../testUtils';
import { TextBadge } from './TextBadge.component';

describe('TextBadge', () => {
  const renderBadge = (props: React.ComponentProps<typeof TextBadge>) => {
    const { Wrapper } = getWrapper();
    render(
      <Wrapper>
        <TextBadge {...props} />
      </Wrapper>,
    );
  };

  it('renders its text', () => {
    renderBadge({ text: 'env:prod' });
    expect(screen.getByText('env:prod')).toBeInTheDocument();
  });

  it('does not render a remove button when onRemove is not provided', () => {
    renderBadge({ text: 'env:prod' });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a remove button and calls onRemove when clicked', () => {
    const onRemove = jest.fn();
    renderBadge({
      text: 'env:prod',
      onRemove,
      removeAriaLabel: 'Remove label env:prod',
    });

    const removeButton = screen.getByRole('button', {
      name: 'Remove label env:prod',
    });
    expect(removeButton).toBeInTheDocument();

    userEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('renders with custom colors', () => {
    renderBadge({
      text: 'env:prod',
      customColor: {
        text: 'rgb(0, 128, 255)',
        backgroundColor: 'rgba(0, 128, 255, 0.16)',
        borderColor: 'rgb(0, 128, 255)',
      },
    });

    expect(screen.getByText('env:prod')).toBeInTheDocument();
  });
});
