import { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { FormGroup } from '../form/Form.component';
import { Input } from '../inputv2/inputv2';
import { PasswordInput } from './PasswordInput.component';
import { PasswordFieldSlot, PasswordRow } from './PasswordRow';

export type PasswordFieldsProps = {
  names?: { password: string; confirmation: string };
  labels?: { password: string; confirmation: string };
  required?: boolean;
  copyable?: boolean;
  confirmationRules?: RegisterOptions;
};

/**
 * A password and its confirmation, sharing one reveal toggle. It does not enforce that
 * the two values match: a form with a `resolver` ignores field-level validation, so
 * that rule belongs in the caller's schema.
 *
 * Renders two `FormGroup`s and registers their fields itself, so it needs a
 * `FormProvider` ancestor for the registration and a `Form` / `FormSection` ancestor
 * for the rows.
 */
export const PasswordFields = ({
  names = { password: 'password', confirmation: 'passwordConfirm' },
  labels = { password: 'Password', confirmation: 'Password confirmation' },
  required = false,
  copyable = false,
  confirmationRules,
}: PasswordFieldsProps) => {
  const { register, trigger, getFieldState, formState } = useFormContext();
  // Read through getFieldState rather than indexing formState.errors: a name may be
  // a path, and errors are nested, so errors['credentials.password'] is undefined and
  // the field would render with no message while the form refuses to submit.
  const errorOf = (name: string) =>
    getFieldState(name, formState).error?.message?.toString() ?? '';
  const [revealed, setRevealed] = useState(false);
  const toggle = () => setRevealed((current) => !current);

  return (
    <>
      <FormGroup
        id={names.password}
        direction="horizontal"
        helpErrorPosition="bottom"
        label={labels.password}
        required={required}
        error={errorOf(names.password)}
        content={
          <PasswordInput
            id={names.password}
            autoComplete="new-password"
            copyable={copyable}
            revealed={revealed}
            onToggleReveal={toggle}
            required={required}
            {...register(names.password, {
              // The confirmation's rule reads the password, so it has to be re-run
              // when the password changes; without this a "do not match" error stays
              // on screen after the user has already fixed it.
              onChange: () => trigger(names.confirmation),
            })}
          />
        }
      />
      <FormGroup
        id={names.confirmation}
        direction="horizontal"
        helpErrorPosition="bottom"
        label={labels.confirmation}
        required={required}
        error={errorOf(names.confirmation)}
        content={
          // Same row and slot as the password field, buttons aside: the two fields
          // have to stop shrinking at the same width, or the pair gives ground
          // unevenly and a reader blames the form.
          <PasswordRow>
            <PasswordFieldSlot>
              <Input
                id={names.confirmation}
                fluid
                required={required}
                autoComplete="new-password"
                type={revealed ? 'text' : 'password'}
                {...register(names.confirmation, confirmationRules)}
              />
            </PasswordFieldSlot>
          </PasswordRow>
        }
      />
    </>
  );
};
