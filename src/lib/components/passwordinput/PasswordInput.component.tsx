import { forwardRef, useState } from 'react';
import { spacing } from '../../spacing';
import { Button } from '../buttonv2/Buttonv2.component';
import { useFieldContext } from '../form/Form.component';
import { Icon } from '../icon/Icon.component';
import { Input, InputProps } from '../inputv2/inputv2';
import { PasswordFieldSlot, PasswordRow } from './PasswordRow';

export type PasswordInputProps = Omit<
  InputProps,
  'type' | 'autoComplete' | 'fluid'
> & {
  /**
   * Required, no default: a field announcing `new-password` while asking for the
   * current password gets offered for saving instead of autofilled, with nothing
   * about the result looking visibly wrong.
   */
  autoComplete: 'current-password' | 'new-password';
} & (
    | { revealed?: undefined; onToggleReveal?: undefined }
    | { revealed: boolean; onToggleReveal: () => void }
  );

/**
 * A password field with a reveal toggle. Reach for this rather than an `Input` of
 * type `password` whenever a user types a password.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ revealed, onToggleReveal, disabled, ...inputProps }, ref) => {
    const [internalRevealed, setInternalRevealed] = useState(false);
    const { disabled: disabledFromFieldContext } = useFieldContext();

    const isRevealed = revealed ?? internalRevealed;
    const toggle =
      onToggleReveal ?? (() => setInternalRevealed((current) => !current));
    const isDisabled = !!(disabled || disabledFromFieldContext);

    return (
      <PasswordRow>
        <PasswordFieldSlot>
          <Input
            ref={ref}
            fluid
            disabled={disabled}
            type={isRevealed ? 'text' : 'password'}
            {...inputProps}
          />
        </PasswordFieldSlot>
        <Button
          type="button"
          variant="outline"
          disabled={isDisabled}
          style={{ width: spacing.r36 }}
          icon={<Icon name={isRevealed ? 'EyeSlash' : 'Eye'} />}
          tooltip={{ overlay: isRevealed ? 'Hide password' : 'Show password' }}
          onClick={toggle}
        />
      </PasswordRow>
    );
  },
);
