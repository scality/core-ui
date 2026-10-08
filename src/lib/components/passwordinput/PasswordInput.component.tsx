import { forwardRef, useCallback, useRef, useState } from 'react';
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
  copyable?: boolean;
} & (
    | { revealed?: undefined; onToggleReveal?: undefined }
    | { revealed: boolean; onToggleReveal: () => void }
  );

/**
 * Reach for this rather than an `Input` of type `password` whenever a user types a
 * password: it carries the reveal toggle, and an optional copy button.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ revealed, onToggleReveal, copyable, disabled, ...inputProps }, ref) => {
    const [internalRevealed, setInternalRevealed] = useState(false);
    const { disabled: disabledFromFieldContext } = useFieldContext();
    const fieldRef = useRef<HTMLInputElement | null>(null);
    const setFieldRef = useCallback(
      (node: HTMLInputElement | null) => {
        fieldRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const isRevealed = revealed ?? internalRevealed;
    const toggle =
      onToggleReveal ?? (() => setInternalRevealed((current) => !current));
    const isDisabled = !!(disabled || disabledFromFieldContext);

    return (
      <PasswordRow>
        <PasswordFieldSlot>
          <Input
            ref={setFieldRef}
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
          // `flexShrink: 0` keeps this button at its fixed width; flex items shrink by
          // default even with a set width, so without it the button — not the field —
          // would be the one to give when the row runs out of room.
          style={{ width: spacing.r36, flexShrink: 0 }}
          icon={<Icon name={isRevealed ? 'EyeSlash' : 'Eye'} />}
          tooltip={{ overlay: isRevealed ? 'Hide password' : 'Show password' }}
          onClick={toggle}
        />
        {copyable && (
          <CopyButton
            label="password"
            disabled={isDisabled}
            style={{ flexShrink: 0 }}
            textToCopy={() => fieldRef.current?.value ?? ''}
          />
        )}
      </PasswordRow>
    );
  },
);
