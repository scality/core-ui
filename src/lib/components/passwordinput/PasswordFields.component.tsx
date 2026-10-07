import { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { FormGroup } from '../form/Form.component';
import { Input } from '../inputv2/inputv2';
import { PasswordInput } from './PasswordInput.component';

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
 * Requires a `FormProvider` ancestor.
 */
export const PasswordFields = ({
  names = { password: 'password', confirmation: 'passwordConfirm' },
  labels = { password: 'Password', confirmation: 'Password confirmation' },
  required = false,
  copyable = false,
  confirmationRules,
}: PasswordFieldsProps) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();
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
        error={errors[names.password]?.message?.toString() ?? ''}
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
        error={errors[names.confirmation]?.message?.toString() ?? ''}
        content={
          <Input
            id={names.confirmation}
            fluid
            required={required}
            autoComplete="new-password"
            type={revealed ? 'text' : 'password'}
            {...register(names.confirmation, confirmationRules)}
          />
        }
      />
    </>
  );
};
