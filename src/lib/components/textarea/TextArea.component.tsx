// @ts-nocheck
import React, { forwardRef, useRef } from 'react';
import styled, { css } from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getTheme } from '../../utils';
type Props = {
  rows?: number;
  cols?: number;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
};
type RefType = HTMLTextAreaElement | null;

const TextAreaContainer = styled.textarea`
  padding: ${defaultTheme.padding.small};
  border-radius: 4px;
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
