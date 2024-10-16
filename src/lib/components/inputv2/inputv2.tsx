import { forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { spacing } from '../../spacing';
import { DESCRIPTION_PREFIX, useFieldContext } from '../form/Form.component';
import { Icon, IconName } from '../icon/Icon.component';

export const convertSizeToRem = (size?: '1' | '2/3' | '1/2' | '1/3') => {
  if (size === '2/3') return '14rem';
  else if (size === '1/3') return '6rem';
  else if (size === '1/2') return '10rem';
  else return '20.5rem';
};

const StyledInput = styled.input<{ hasIcon: boolean }>`
  max-width: ${(props) =>
    props.hasIcon ? `calc(100% - 1rem - ${spacing.f8})` : '100%'};

  font-family: 'Lato';
  ${(props) =>
    props.disabled &&
    `
  cursor: not-allowed;
  `}
  background: ${(props) => props.theme.backgroundLevel1};
  font-size: 1rem;
  color: ${(props) => props.theme.textPrimary};
  border: 0;
  flex: 1;
  border-radius: ${spacing.r4};
  line-height: ${spacing.r20};
  &:placeholder-shown {
    font-style: italic;
  }
  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
    opacity: 0.5;
  }
  &:focus {
    border: 0;
    outline: none;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${(props) => props.theme.textPrimary};
    -webkit-background-clip: text;
    caret-color: ${(props) => props.theme.textPrimary};
  }
`;

const InputContainer = styled.div<{
  hasError: boolean;
  disabled: boolean;
  isContextAvailable: boolean;
}>`
  height: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing.f8};
  padding: 0 ${spacing.r8} 0 ${spacing.r8};
  background: ${(props) => props.theme.backgroundLevel1};
  border-radius: ${spacing.r4};
  ${(props) =>
    props.isContextAvailable &&
    props.disabled &&
    `
  opacity: 0.5;
  cursor: not-allowed;
  `}
`;

const InputBorder = styled.div<{
  disabled: boolean;
  hasError: boolean;
  width: string;
}>`
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: ${spacing.r32};
  border: ${spacing.r1} solid
    ${(props) =>
      props.hasError ? props.theme.statusCritical : props.theme.border};
  border-radius: ${spacing.r4};
  &:hover {
    ${(props) =>
      !props.disabled &&
      `border: ${spacing.r1} solid ${props.theme.infoPrimary};`}
  }
  &:focus-within {
    border: ${spacing.r1} solid ${(props) => props.theme.infoPrimary};
  }
`;

const SelfCenterredIcon = styled(Icon)`
  align-self: center;
  color: ${(props) => props.theme.textSecondary};
`;

export type InputSize = '1' | '2/3' | '1/2' | '1/3';

export type InputProps = {
  error?: string;
  id: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  size?: InputSize;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      disabled,
      id,
      leftIcon,
      rightIcon,
      placeholder,
      size,
      ...inputProps
    },
    ref,
  ) => {
    const {
      isContextAvailable,
      disabled: disabledFromFieldContext,
      error: errorFromFieldContext,
    } = useFieldContext();
    placeholder = placeholder ? `Example: ${placeholder}` : undefined;

    return (
      <InputBorder
        disabled={!!(disabled || disabledFromFieldContext)}
        hasError={!!(error || errorFromFieldContext)}
        width={convertSizeToRem(size)}
      >
        <InputContainer
          isContextAvailable={isContextAvailable}
          disabled={!!(disabled || disabledFromFieldContext)}
          hasError={!!(error || errorFromFieldContext)}
        >
          {leftIcon && <SelfCenterredIcon name={leftIcon} />}
          <StyledInput
            ref={ref}
            disabled={disabled || disabledFromFieldContext}
            aria-invalid={!!(error || errorFromFieldContext)}
            aria-describedby={`${DESCRIPTION_PREFIX}${id}`}
            hasIcon={!!(leftIcon || rightIcon)}
            id={id}
            {...inputProps}
            placeholder={placeholder}
          />
          {rightIcon && <SelfCenterredIcon name={rightIcon} />}
        </InputContainer>
      </InputBorder>
    );
  },
);
