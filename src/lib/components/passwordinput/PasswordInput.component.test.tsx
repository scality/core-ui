import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getWrapper } from '../../testUtils';
import { PasswordInput } from './PasswordInput.component';

const { Wrapper } = getWrapper();

describe('PasswordInput', () => {
  it('hides what is typed until the reveal button is pressed, and hides it again', async () => {
    render(
      <PasswordInput
        id="pwd"
        aria-label="Password"
        autoComplete="new-password"
      />,
      { wrapper: Wrapper },
    );

    const field = screen.getByLabelText('Password');
    await userEvent.type(field, 'correct horse');
    expect(field).toHaveAttribute('type', 'password');

    await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(field).toHaveAttribute('type', 'text');
    expect(field).toHaveValue('correct horse');

    await userEvent.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(field).toHaveAttribute('type', 'password');
  });

  it('lets a caller drive the reveal state from outside', async () => {
    const onToggleReveal = jest.fn();
    render(
      <PasswordInput
        id="pwd"
        aria-label="Password"
        autoComplete="new-password"
        revealed={true}
        onToggleReveal={onToggleReveal}
      />,
      { wrapper: Wrapper },
    );

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
    await userEvent.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(onToggleReveal).toHaveBeenCalledTimes(1);
  });

  it('does not submit the form it sits in when the reveal button is pressed', async () => {
    const onSubmit = jest.fn((event) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <PasswordInput
          id="pwd"
          aria-label="Password"
          autoComplete="new-password"
        />
      </form>,
      { wrapper: Wrapper },
    );

    await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('disables the reveal button when the field is disabled', () => {
    render(
      <PasswordInput
        id="pwd"
        aria-label="Password"
        autoComplete="new-password"
        disabled
      />,
      { wrapper: Wrapper },
    );

    expect(screen.getByRole('button', { name: 'Show password' })).toBeDisabled();
  });

  it('comes back masked after being unmounted and mounted again', async () => {
    const { unmount } = render(
      <PasswordInput
        id="pwd"
        aria-label="Password"
        autoComplete="new-password"
      />,
      { wrapper: Wrapper },
    );

    await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');

    unmount();
    render(
      <PasswordInput
        id="pwd"
        aria-label="Password"
        autoComplete="new-password"
      />,
      { wrapper: Wrapper },
    );

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });
});
