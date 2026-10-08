import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { getWrapper } from '../../testUtils';
import { Form, FormSection } from '../form/Form.component';
import { PasswordFields } from './PasswordFields.component';

const { Wrapper } = getWrapper();

const WithForm = ({ children }: { children: ReactNode }) => {
  const methods = useForm({ mode: 'onChange' });
  return (
    <Wrapper>
      <FormProvider {...methods}>
        <Form layout={{ kind: 'tab' }}>
          <FormSection>{children}</FormSection>
        </Form>
      </FormProvider>
    </Wrapper>
  );
};

describe('PasswordFields', () => {
  it('reveals both fields from the one toggle', async () => {
    render(<PasswordFields />, { wrapper: WithForm });

    const password = screen.getByLabelText(/^Password$/);
    const confirmation = screen.getByLabelText(/^Password confirmation$/);
    expect(password).toHaveAttribute('type', 'password');
    expect(confirmation).toHaveAttribute('type', 'password');

    await userEvent.click(screen.getByRole('button', { name: 'Show password' }));

    expect(password).toHaveAttribute('type', 'text');
    expect(confirmation).toHaveAttribute('type', 'text');
  });

  it('gives the confirmation no reveal or copy affordance of its own', () => {
    render(<PasswordFields copyable />, { wrapper: WithForm });

    expect(
      screen.getAllByRole('button', { name: /^(Show|Hide) password$/ }),
    ).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /^Copy/ })).toHaveLength(1);
  });

  it('marks both fields required when asked to', () => {
    render(<PasswordFields required />, { wrapper: WithForm });

    expect(screen.getByLabelText('Password *')).toBeRequired();
    expect(screen.getByLabelText('Password confirmation *')).toBeRequired();
  });

  it('re-runs the confirmation rule when the password changes', async () => {
    const validate = jest.fn().mockReturnValue(true);

    render(<PasswordFields confirmationRules={{ validate }} />, {
      wrapper: WithForm,
    });

    await userEvent.type(screen.getByLabelText(/^Password confirmation$/), 'a');
    const callsBefore = validate.mock.calls.length;

    await userEvent.type(screen.getByLabelText(/^Password$/), 'b');

    expect(validate.mock.calls.length).toBeGreaterThan(callsBefore);
  });

  it('shows the confirmation error when the fields are registered under a path', async () => {
    render(
      <PasswordFields
        names={{
          password: 'credentials.password',
          confirmation: 'credentials.passwordConfirm',
        }}
        confirmationRules={{ validate: () => 'Passwords do not match' }}
      />,
      { wrapper: WithForm },
    );

    await userEvent.type(screen.getByLabelText(/^Password confirmation$/), 'a');

    expect(
      await screen.findByText('Passwords do not match'),
    ).toBeInTheDocument();
  });

  it('leaves an untouched confirmation alone while the password is typed', async () => {
    render(
      <PasswordFields
        confirmationRules={{ required: 'Confirmation is required' }}
      />,
      { wrapper: WithForm },
    );

    await userEvent.type(screen.getByLabelText(/^Password$/), 'a');

    await expect(
      screen.findByText('Confirmation is required', undefined, {
        timeout: 500,
      }),
    ).rejects.toThrow();
  });

  it('refuses to submit an empty required field, and says which', async () => {
    const onSubmit = jest.fn();
    const WithSubmit = ({ children }: { children: ReactNode }) => {
      const methods = useForm({ mode: 'onChange' });
      return (
        <Wrapper>
          <FormProvider {...methods}>
            <Form
              layout={{ kind: 'tab' }}
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <FormSection>{children}</FormSection>
            </Form>
          </FormProvider>
        </Wrapper>
      );
    };

    const { container } = render(<PasswordFields required />, {
      wrapper: WithSubmit,
    });

    fireEvent.submit(container.querySelector('form')!);

    expect(await screen.findByText('Password is required')).toBeInTheDocument();
    expect(
      screen.getByText('Password confirmation is required'),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("lets the caller's own confirmation rule override required", async () => {
    const onSubmit = jest.fn();
    const WithSubmit = ({ children }: { children: ReactNode }) => {
      const methods = useForm({ mode: 'onChange' });
      return (
        <Wrapper>
          <FormProvider {...methods}>
            <Form
              layout={{ kind: 'tab' }}
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <FormSection>{children}</FormSection>
            </Form>
          </FormProvider>
        </Wrapper>
      );
    };

    const { container } = render(
      <PasswordFields required confirmationRules={{ required: false }} />,
      { wrapper: WithSubmit },
    );

    await userEvent.type(screen.getByLabelText('Password *'), 'secret');
    fireEvent.submit(container.querySelector('form')!);

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(
      screen.queryByText('Password confirmation is required'),
    ).not.toBeInTheDocument();
  });
});
