import React, {
  CSSProperties,
  forwardRef,
  TextareaHTMLAttributes,
} from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';

type TextAreaVariant = 'code' | 'text';
type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: TextAreaVariant;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
};
type RefType = HTMLTextAreaElement | null;

const TextAreaContainer = styled.textarea<{
  variant: TextAreaVariant;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}>`
  padding: ${spacing.r12} ${spacing.r8};
  border-radius: 4px;
  resize: vertical;
  font-family: ${(props) =>
    props.variant === 'code' ? 'Courier New' : 'Lato'};
  font-size: ${spacing.f14};

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}

  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
    `}

  &:placeholder-shown {
    font-style: italic;
  }
  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
  }
  &:hover {
    ${(props) =>
      !props.disabled &&
      `border: ${spacing.r1} solid ${props.theme.infoPrimary};`}
  }
  &:focus {
    border: ${spacing.r1} solid ${(props) => props.theme.infoPrimary};
  }
  ${(props) => {
    const { border, textSecondary, backgroundLevel1, selectedActive } =
      props.theme;
    return css`
      border-color: ${border};
      color: ${textSecondary};
      background: ${backgroundLevel1};
      &:focus {
        border-color: ${selectedActive};
        outline: none;
      }
    `;
  }}
`;

function TextAreaElement(
  { rows = 3, cols = 20, width, height, variant = 'code', ...rest }: Props,
  ref: React.ForwardedRef<RefType>,
) {
  if (width || height) {
    return (
      <TextAreaContainer
        className="sc-textarea"
        width={width}
        height={height}
        variant={variant}
        {...rest}
        ref={ref}
      />
    );
  }

  return (
    <TextAreaContainer
      className="sc-textarea"
      rows={rows}
      cols={cols}
      variant={variant}
      {...rest}
      ref={ref}
    />
  );
}

export const TextArea = forwardRef<RefType, Props>(TextAreaElement);
