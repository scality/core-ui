import { forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { spacing } from '../../spacing';
import { getTheme } from '../../utils';
import { Box } from '../box/Box';
import { DESCRIPTION_PREFIX, useFieldContext } from '../form/Form.component';
import { Icon, IconName } from '../icon/Icon.component';

export const convertSizeToRem = (size?: '1' | '2/3' | '1/2' | '1/3') => {
  if (size === '2/3') return '14rem';
  else if (size === '1/3') return '6rem';
  else if (size === '1/2') return '10rem';
  else return '20.5rem';
};

const StyledInput = styled.input`
  max-width: 100%;
  font-family: 'Lato';
  ${(props) =>
    props.disabled &&
    `
  cursor: not-allowed;
  `}
  background: ${(props) => getTheme(props).backgroundLevel1};
  font-size: 1rem;
  color: ${(props) => getTheme(props).textPrimary};
  border: 0;
  flex: 1;
  border-radius: ${spacing.r4};
  line-height: ${spacing.r20};
  &:placeholder-shown {
    font-style: italic;
  }
  &::placeholder {
    color: ${(props) => getTheme(props).textSecondary};
  }
  &:focus {
    border: 0;
    outline: none;
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
  padding: 0 ${spacing.r8} 0 ${spacing.r8};
  background: ${(props) => getTheme(props).backgroundLevel1};
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
      props.hasError ? getTheme(props).statusCritical : getTheme(props).border};
  border-radius: ${spacing.r4};
  &:hover {
    ${(props) =>
      !props.disabled &&
      `border: ${spacing.r1} solid ${getTheme(props).infoPrimary};`}
  }
  &:focus-within {
    border: ${spacing.r1} solid ${(props) => getTheme(props).infoPrimary};
  }
`;

const SelfCenterredIcon = styled(Icon)`
  align-self: center;
`;

type InputSize = '1' | '2/3' | '1/2' | '1/3';

type Props = {
  error?: string;
  id: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  inputSize?: InputSize;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      error,
      disabled,
      id,
      leftIcon,
      rightIcon,
      placeholder,
      inputSize,
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
        width={convertSizeToRem(inputSize)}
      >
        <InputContainer
          isContextAvailable={isContextAvailable}
          disabled={!!(disabled || disabledFromFieldContext)}
          hasError={!!(error || errorFromFieldContext)}
        >
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'baseline'}
            width="100%"
            gap={spacing['f8']}
          >
            {leftIcon && <SelfCenterredIcon name={leftIcon} />}
            <StyledInput
              ref={ref}
              disabled={disabled || disabledFromFieldContext}
              aria-invalid={!!(error || errorFromFieldContext)}
              aria-describedby={`${DESCRIPTION_PREFIX}${id}`}
              id={id}
              {...inputProps}
              placeholder={placeholder}
            />
            {rightIcon && <SelfCenterredIcon name={rightIcon} />}
          </Box>
        </InputContainer>
      </InputBorder>
    );
  },
);
