import { ChangeEvent, InputHTMLAttributes, useRef } from 'react';
import styled, { css } from 'styled-components';
import { getTheme } from '../../utils';
import { spacing } from '../../style/theme';
import { LABEL_PREFIX, useFieldContext } from '../form/Form.component';
import { Stack } from '../../spacing';
import { Text } from '../text/Text.component';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  toggle: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
};
const ToggleContainer = styled.span<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  position: relative;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
const Switch = styled.label<{ disabled?: boolean }>`
  position: relative;
  width: ${spacing.sp24};
  height: ${spacing.sp14};
  align-self: center;
  ${(props) => {
    return css`
      ${props.disabled
        ? `
          cursor: not-allowed;
        `
        : `
          cursor: pointer;
        `}
    `;
  }}
`;
const Slider = styled.div<{ toggle?: boolean }>`
  width: 100%;
  height: 1rem;
  background-color: ${(props) => getTheme(props).backgroundLevel1};
  border: ${spacing.sp1} solid
    ${(props) =>
      getTheme(props)[props.toggle ? 'selectedActive' : 'infoPrimary']};
  border-radius: ${spacing.sp8};
  transition: 0.4s;
  -moz-transform: rotate(0.02deg);
  &:before {
    border-radius: 100%;
    position: absolute;
    content: '';
    height: ${spacing.sp10};
    width: ${spacing.sp10};
    left: 3px;
    top: 3.5px;
    background-color: ${(props) =>
      getTheme(props)[props.toggle ? 'textSecondary' : 'textTertiary']};
    transition: 0.4s;
    -moz-transform: rotate(0.02deg);
  }
`;
const ToggleInput = styled.input`
  &:checked + ${Slider} {
    background-color: ${(props) => getTheme(props).selectedActive};
  }
  &:checked + ${Slider}:before {
    transform: translateX(${spacing.sp10});
  }
  display: none;
`;
const StyledSwitchLabel = styled.label<{ toggle?: boolean }>`
  color: ${(props) =>
    getTheme(props)[props.toggle ? 'textPrimary' : 'textTertiary']};
`;

function ToggleSwitch({ toggle, label, onChange, disabled, ...rest }: Props) {
  const { isContextAvailable } = useFieldContext();
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  return (
    <StyledSwitchLabel
      toggle={toggle}
      className="text"
      id={`${rest['id']}-label`}
      htmlFor={rest['id']}
    >
      <ToggleContainer className="sc-toggle" disabled={disabled}>
        <Stack gap={'r8'} style={{ alignItems: 'baseline' }}>
          <Switch
            htmlFor={rest['id']}
            role="checkbox"
            aria-checked={toggle}
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                e.stopPropagation();

                checkboxRef.current && checkboxRef.current.click();
              }
            }}
            aria-labelledby={
              label
                ? `${rest['id']}-label`
                : isContextAvailable
                ? `${LABEL_PREFIX}${rest['id']}`
                : undefined
            }
          >
            <ToggleInput
              type="checkbox"
              checked={toggle}
              onChange={onChange}
              disabled={disabled}
              ref={checkboxRef}
              {...rest}
            />
            <Slider className="sc-slider" toggle={toggle} />
          </Switch>
          {label && <Text>{label}</Text>}
        </Stack>
      </ToggleContainer>
    </StyledSwitchLabel>
  );
}

export const Toggle = ToggleSwitch;
