//@flow
import React from "react";
import styled, { css } from "styled-components";
import * as defaultTheme from "../../style/theme";
import { getThemeProp } from "../../utils";

type Props = {
  rows?: number,
  cols?: number,
  placeholder?: string,
  value: string,
  disabled?: boolean,
  onChange: any => void
};

const TextAreaContainer = styled.textarea`
  padding: ${defaultTheme.padding.small};
  border-radius: 4px;
  ${props => {
    const brandingTheme = getTheme(props);
    return css`
      border-color: ${brandingTheme.border};
      color: ${brandingTheme.text};
      background: ${brandingTheme.backgroundContrast1};
      &:focus {
        border-color: ${brandingTheme.primary};
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

export default TextArea;
