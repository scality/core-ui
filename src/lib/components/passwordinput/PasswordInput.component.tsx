import { forwardRef, useRef, useState } from 'react';
import { spacing } from '../../spacing';
import { Button } from '../buttonv2/Buttonv2.component';
import { CopyButton } from '../buttonv2/CopyButton.component';
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
  /** Copies the field's current value whether or not it is masked. */
  withCopyButton?: boolean;
} & (
    | { revealed?: undefined; onToggleReveal?: undefined }
    | { revealed: boolean; onToggleReveal: () => void }
  );

/**
 * Reach for this rather than an `Input` of type `password` whenever a user types a
 * password: it carries the reveal toggle, and an optional copy button.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { revealed, onToggleReveal, withCopyButton, disabled, ...inputProps },
    ref,
  ) => {
    const [internalRevealed, setInternalRevealed] = useState(false);
    const { disabled: disabledFromFieldContext } = useFieldContext();
    const rowRef = useRef<HTMLDivElement>(null);

    const isRevealed = revealed ?? internalRevealed;
    const toggle =
      onToggleReveal ?? (() => setInternalRevealed((current) => !current));
    const isDisabled = !!(disabled || disabledFromFieldContext);

    return (
      <PasswordRow ref={rowRef}>
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
          aria-pressed={isRevealed}
          disabled={isDisabled}
          // `flexShrink: 0` keeps this button at its fixed width; flex items shrink by
          // default even with a set width, so without it the button — not the field —
          // would be the one to give when the row runs out of room.
          style={{ width: spacing.r36, flexShrink: 0 }}
          icon={<Icon name={isRevealed ? 'EyeSlash' : 'Eye'} />}
          tooltip={{ overlay: isRevealed ? 'Hide password' : 'Show password' }}
          onClick={toggle}
        />
        {withCopyButton && (
          <CopyButton
            label="password"
            disabled={isDisabled}
            style={{ flexShrink: 0 }}
            // The field's own ref slot belongs to the caller, so the value is
            // read through the row, which holds exactly one input.
            textToCopy={() =>
              rowRef.current?.querySelector('input')?.value ?? ''
            }
          />
        )}
      </PasswordRow>
    );
  },
);
