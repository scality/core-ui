import { render, screen } from '@testing-library/react';
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

    expect(screen.getAllByRole('button', { name: /password$/i })).toHaveLength(
      1,
    );
    expect(screen.getAllByRole('button', { name: /copy/i })).toHaveLength(1);
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
});
