// @ts-nocheck
import React from 'react';
import styled, { css } from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getTheme } from '../../utils';
type Props = {
  rows?: number;
  cols?: number;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
};
const TextAreaContainer = styled.textarea`
  padding: ${defaultTheme.padding.small};
  border-radius: 4px;
  ${(props) => {
    const { border, textSecondary, primary, secondary } = getTheme(props);
    return css`
      border-color: ${border};
      color: ${textSecondary};
      background: ${primary};
      &:focus {
        border-color: ${secondary};
        outline: none;
      }
    `;
  }}
`;

function TextArea({
  value,
  onChange,
  rows = 3,
  cols = 20,
  placeholder,
  disabled,
  ...rest
}: Props) {
  return (
    <TextAreaContainer
      className="sc-textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      disabled={disabled}
      {...rest}
    ></TextAreaContainer>
  );
}

export { TextArea };
