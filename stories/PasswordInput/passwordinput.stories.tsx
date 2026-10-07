import { Meta, StoryObj } from '@storybook/react-webpack5';
import { FormProvider, useForm } from 'react-hook-form';
import { Form, FormGroup, FormSection } from '../../src/lib';
import { PasswordFields } from '../../src/lib/components/passwordinput/PasswordFields.component';
import {
  PasswordInput,
  PasswordInputProps,
} from '../../src/lib/components/passwordinput/PasswordInput.component';

const meta: Meta<PasswordInputProps> = {
  title: 'Components/Inputs/PasswordInput',
  component: PasswordInput,
};
export default meta;

type Story = StoryObj<PasswordInputProps>;

/** Authenticating: one field, no copy affordance, the current password. */
export const Authenticate: Story = {
  render: () => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <Form responsive layout={{ kind: 'tab' }}>
          <FormSection>
            <FormGroup
              id="password"
              direction="horizontal"
              label="Password"
              content={
                <PasswordInput
                  id="password"
                  autoComplete="current-password"
                  {...methods.register('password')}
                />
              }
            />
          </FormSection>
        </Form>
      </FormProvider>
    );
  },
};

/** Setting a password: the pair, with the copy affordance on the first field. */
export const SetAPassword: Story = {
  render: () => {
    const methods = useForm({ mode: 'onChange' });
    return (
      <FormProvider {...methods}>
        <Form responsive layout={{ kind: 'tab' }}>
          <FormSection>
            {/* A password form carries a username field, visible or hidden, or
                password managers offer the wrong credential. It belongs to the
                application, which is the only side that has the username. */}
            <input
              type="text"
              autoComplete="username"
              style={{ display: 'none' }}
              {...methods.register('username')}
            />
            <PasswordFields required copyable />
          </FormSection>
        </Form>
      </FormProvider>
    );
  },
};

/** Outside a form: the field still gives ground, down to its floor. */
export const InANarrowContainer: Story = {
  render: () => (
    <div style={{ width: '18rem' }}>
      <PasswordInput
        id="password"
        aria-label="Password"
        autoComplete="new-password"
        copyable
      />
    </div>
  ),
};
