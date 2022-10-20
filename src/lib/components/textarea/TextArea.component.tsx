import React, { forwardRef, HTMLProps } from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../../spacing';
import { getTheme } from '../../utils';
type Props = Omit<HTMLProps<HTMLTextAreaElement>, 'as'>;
type RefType = HTMLTextAreaElement | null;

const TextAreaContainer = styled.textarea`
  padding: ${spacing.r12} ${spacing.r8};
  border-radius: 4px;
  resize: vertical;
  font-family: Courier New;
  font-size: ${spacing.f14};

  ${(props) =>
    props.disabled &&
    `
  opacity: 0.5;
  cursor: not-allowed;
  `}

  &:placeholder-shown {
    font-style: italic;
  }
  &::placeholder {
    color: ${(props) => getTheme(props).textSecondary};
  }
  &:hover {
    ${(props) =>
      !props.disabled &&
      `border: ${spacing.r1} solid ${getTheme(props).infoPrimary};`}
  }
  &:focus {
    border: ${spacing.r1} solid ${(props) => getTheme(props).infoPrimary};
  }
  ${(props) => {
    const { border, textSecondary, backgroundLevel1, selectedActive } =
      getTheme(props);
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
  { rows = 3, cols = 20, ...rest }: Props,
  ref: React.ForwardedRef<RefType>,
) {
  return (
    <TextAreaContainer
      className="sc-textarea"
      rows={rows}
      cols={cols}
      {...rest}
      ref={ref}
    />
  );
}

export const TextArea = forwardRef<RefType, Props>(TextAreaElement);

export default { TextArea };
