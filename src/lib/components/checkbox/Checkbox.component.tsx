import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';
import { spacing, Stack } from '../../spacing';

import { Text } from '../text/Text.component';

type Props = {
  label?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ disabled, checked, label, value, onChange, ...rest }, ref) => {
    return (
      <StyledCheckbox
        checked={checked}
        disabled={disabled}
        className="sc-checkbox"
      >
        <Stack>
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            value={value}
            onChange={onChange}
            ref={ref}
            {...rest}
          />
          {label && <Text>{label}</Text>}
        </Stack>
      </StyledCheckbox>
    );
  },
);

export { Checkbox };

const StyledCheckbox = styled.label<{
  disabled?: boolean;
  checked?: boolean;
}>`
  ${(props) => (props.disabled ? 'opacity: 0.5;' : '')}
  /* Basic styling */

  [type='checkbox'] {
    width: 0.75rem;
    height: 0.75rem;
    color: ${(props) => props.theme.textPrimary};
    vertical-align: middle;
    -webkit-appearance: none;
    background: none;
    border: 0;
    outline: 0;
    flex-grow: 0;
    border-radius: ${spacing.r2};
    background-color: ${(props) => props.theme.backgroundLevel1};
    transition: background 300ms;
    cursor: pointer;
  }

  /* Pseudo element for check styling */

  [type='checkbox']::before {
    content: '';
    color: transparent;
    display: block;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    border: 0;
    background-color: transparent;
    background-size: contain;
    box-shadow: inset 0 0 0 ${spacing.r1}
      ${(props) => props.theme.textSecondary};
  }

  /* Checked */

  [type='checkbox']:checked {
    background-color: ${(props) => props.theme.selectedActive};
  }

  [type='checkbox']:checked::before {
    box-shadow: none;
    background-image: url('data:image/svg+xml,%3Csvg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"%3E %3Cpath d="M3 6.68646L5.0671 9L9 3" stroke="%23fff" stroke-width="1.5"/%3E %3C/svg%3E');
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Indeterminate */

  [type='checkbox']:indeterminate::before {
    box-shadow: inset 0 0 0 ${spacing.r1}
      ${(props) => props.theme.selectedActive};
    background-color: ${(props) => props.theme.highlight};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cline x1='6' y1='12' x2='20' y2='12' style='stroke:%23fff;stroke-width:4'/%3E %3C/svg%3E");
  }

  /* Hover & focus */
  [type='checkbox']:hover {
    ${(props) =>
      !props.disabled && `background-color: ${props.theme.highlight};`}
  }

  [type='checkbox']:hover::before {
    ${(props) =>
      !props.disabled &&
      `box-shadow: inset 0 0 0 ${spacing.r1} ${props.theme.selectedActive};`}
  }

  [type='checkbox']:focus-visible:enabled {
    outline: dashed ${spacing.r2} ${(props) => props.theme.selectedActive};
    outline-offset: ${spacing.r2};
  }

  /* Disabled */

  [type='checkbox']:checked:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.selectedActive};
  }

  [type='checkbox']:not(:checked):disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.textSecondary};
  }
`;
