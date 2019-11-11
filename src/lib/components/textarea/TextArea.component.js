//@flow
import React from "react";
import styled, { css } from "styled-components";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

type Props = {
  rows?: int,
  cols?: int,
  placeholder?: string,
  label?: string,
  value?: string,  
  error?: string,
  disabled?: boolean,
  onChange: () => void
};

const TextAreaContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  ${props => {      
    return props.disabled
      ? css`
          cursor: default;
          opacity: 0.5;
        `
      : css`
          cursor: pointer;
        `;
    }
  }
  textarea{
    margin: ${defaultTheme.padding.base};
    padding: ${defaultTheme.padding.base};
    border-radius: 10px;
  }
  ${props => {
      const brandingTheme = mergeTheme(props.theme, defaultTheme);
      return (
        css`
        background: ${brandingTheme.backgroundContrast1};
        textarea{
          &:hover {
            border-color: ${brandingTheme.primary};
          }
        }
    ` )
    }
  }
`;

const LabelStyle = styled.label`
  font-size: ${defaultTheme.fontSize.large};
  padding-left: ${defaultTheme.padding.base};
  vertical-align: middle;
  color: ${props => mergeTheme(props.theme, defaultTheme).text};
`;

const TextareaErrorMessage = styled.span`
  color: ${props => mergeTheme(props.theme, defaultTheme).danger};
  margin: ${defaultTheme.padding.smaller} 0;
  font-size: ${defaultTheme.fontSize.small};
`;

function TextArea({ id,rows,cols, label, error, placeholder,disabled,...rest }: Props) {
  return (
    <TextAreaContainer className="sc-textarea">
      {label && (
        <LabelStyle htmlFor={id} className="sc-input-label">
          {label}
        </LabelStyle>
      )}
        <textarea 
          placeholder={placeholder}
          id={id} 
          rows={rows} 
          cols={cols}
          error={error}
          disabled={disabled}
        >          
        </textarea>
        {error && (
          <TextareaErrorMessage className="sc-input-error">
            {error}
          </TextareaErrorMessage>
        )}
    </TextAreaContainer>
  );
}

export default TextArea;
