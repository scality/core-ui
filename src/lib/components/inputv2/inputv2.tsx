import { forwardRef, HTMLProps } from 'react';
import styled from 'styled-components';
import { spacing } from '../../spacing';
import { getTheme } from '../../utils';
import { Box } from '../box/Box';
import { DESCRIPTION_PREFIX, useFieldContext } from '../form/Form.component';
import { Icon, IconName } from '../icon/Icon.component';

const StyledInput = styled.input`
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
  width: 21.875rem;
  height: ${spacing.r32};
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

const InputBorder = styled.div<{ disabled: boolean; hasError: boolean }>`
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

type Props = {
  error?: string;
  id: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
} & HTMLProps<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { error, disabled, id, leftIcon, rightIcon, placeholder, ...inputProps },
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
        disabled={disabled || disabledFromFieldContext}
        hasError={!!(error || errorFromFieldContext)}
      >
        <InputContainer
          isContextAvailable={isContextAvailable}
          disabled={disabled || disabledFromFieldContext}
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
              //@ts-expect-error
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
