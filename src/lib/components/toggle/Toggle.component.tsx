import { ChangeEvent, InputHTMLAttributes, useRef } from 'react';
import styled, { css } from 'styled-components';

import { LABEL_PREFIX, useFieldContext } from '../form/Form.component';
import { Stack, spacing } from '../../spacing';
import { Text } from '../text/Text.component';

export type Props = InputHTMLAttributes<HTMLInputElement> & {
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
  width: ${spacing.r24};
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
  background-color: ${(props) => props.theme.backgroundLevel1};
  border: ${spacing.r1} solid
    ${(props) => props.theme[props.toggle ? 'selectedActive' : 'infoPrimary']};
  border-radius: ${spacing.r8};
  transition: 0.4s;

  &:before {
    border-radius: 100%;
    position: absolute;
    content: '';
    height: ${spacing.r10};
    width: ${spacing.r10};
    left: 3px;
    top: 3.5px;
    background-color: ${(props) =>
      props.theme[props.toggle ? 'textSecondary' : 'textPrimary']};
    transition: 0.4s;
  }
`;
const ToggleInput = styled.input`
  &:checked + ${Slider} {
    background-color: ${(props) => props.theme.selectedActive};
  }
  &:checked + ${Slider}:before {
    transform: translateX(${spacing.r10});
  }
  display: none;
`;
const StyledSwitchLabel = styled.label<{ toggle?: boolean }>`
  color: ${(props) =>
    props.theme[props.toggle ? 'textPrimary' : 'textPrimary']};
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
