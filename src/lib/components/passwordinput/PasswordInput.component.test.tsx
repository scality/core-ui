import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getWrapper } from '../../testUtils';
import { Form, FormGroup, FormSection } from '../form/Form.component';
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

  it('disables both buttons when the surrounding field group is disabled', () => {
    render(
      <Form layout={{ kind: 'tab' }}>
        <FormSection>
          <FormGroup
            id="pwd"
            label="Password"
            disabled
            content={
              <PasswordInput id="pwd" autoComplete="new-password" copyable />
            }
          />
        </FormSection>
      </Form>,
      { wrapper: Wrapper },
    );

    expect(screen.getByRole('button', { name: 'Show password' })).toBeDisabled();
    expect(screen.getByRole('button', { name: /copy/i })).toBeDisabled();
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

  it('renders no copy affordance unless one is asked for', () => {
    render(
      <PasswordInput
        id="pwd"
        aria-label="Password"
        autoComplete="new-password"
      />,
      { wrapper: Wrapper },
    );

    expect(
      screen.queryByRole('button', { name: /copy/i }),
    ).not.toBeInTheDocument();
  });

  it('copies what is currently typed, not what was there at the last render', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(
      <PasswordInput
        id="pwd"
        aria-label="Password"
        autoComplete="new-password"
        copyable
      />,
      { wrapper: Wrapper },
    );

    await userEvent.type(screen.getByLabelText('Password'), 'correct horse');
    await userEvent.click(screen.getByRole('button', { name: /copy/i }));

    expect(writeText).toHaveBeenCalledWith('correct horse');
  });

  it('does not copy an empty field', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(
      <PasswordInput
        id="pwd"
        aria-label="Password"
        autoComplete="new-password"
        copyable
      />,
      { wrapper: Wrapper },
    );

    await userEvent.click(screen.getByRole('button', { name: /copy/i }));

    expect(writeText).not.toHaveBeenCalled();
  });
});
