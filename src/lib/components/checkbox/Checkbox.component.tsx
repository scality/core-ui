import { ChangeEvent, forwardRef } from 'react';
import styled from 'styled-components';
import { spacing, Stack } from '../../spacing';
import { getTheme } from '../../utils';
import { Text } from '../text/Text.component';

type Props = {
  label?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = forwardRef<HTMLInputElement, Props>(({
  disabled,
  checked,
  label,
  value,
  onChange,
  ...rest
}, ref) => {
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
      {label && (
        <Text>{label}</Text>
      )}
      </Stack>
    </StyledCheckbox>
  );
});

export { Checkbox };

const StyledCheckbox = styled.label<{
  disabled?: boolean;
  checked?: boolean;
}>`
  /* Basic styling */

  [type=checkbox] {
    width: 0.75rem;
    height: 0.75rem;
    color: ${props => getTheme(props).textPrimary};
    vertical-align: middle;
    -webkit-appearance: none;
    background: none;
    border: 0;
    outline: 0;
    flex-grow: 0;
    border-radius: ${spacing.r2};
    background-color: ${props => getTheme(props).backgroundLevel1};
    transition: background 300ms;
    cursor: pointer;
  }


  /* Pseudo element for check styling */

  [type=checkbox]::before {
    content: "";
    color: transparent;
    display: block;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    border: 0;
    background-color: transparent;
    background-size: contain;
    box-shadow: inset 0 0 0 ${spacing.r1} ${props => getTheme(props).border};
  }


  /* Checked */

  [type=checkbox]:checked {
    background-color: ${props => getTheme(props).selectedActive};
  }

  [type=checkbox]:checked::before {
    box-shadow: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
  }

  /* Indeterminate */

  [type=checkbox]:indeterminate::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cline x1='4' y1='11' x2='18' y2='11' style='stroke:%23fff;stroke-width:2'/%3E %3C/svg%3E");
  }

  /* Hover & focus */
  [type=checkbox]:hover {
    ${(props) =>
      !props.disabled &&
      `box-shadow: inset 0 0 0 ${spacing.r1} ${getTheme(props).infoPrimary};`}
  }
  [type=checkbox]:focus {
    box-shadow: inset 0 0 0 ${spacing.r1} ${props => getTheme(props).infoPrimary};
  }

  [type=checkbox]:focus-visible:enabled {
    outline: dashed ${spacing.r2} ${props => getTheme(props).selectedActive};
    outline-offset: ${spacing.r2};
  }

  /* Disabled */

  [type=checkbox]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
