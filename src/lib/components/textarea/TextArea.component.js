//@flow
import React from "react";
import styled, { css } from "styled-components";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

type Props = {
  rows?: number,
  cols?: number,
  placeholder?: string,
  label?: string,
  value?: string,  
  error?: string,
  disabled?: boolean,
  onChange: any => void
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

function TextArea({ id,rows,cols, label, error, placeholder,disabled,...rest }: Props) {
  return (
    <TextAreaContainer className="sc-textarea">
        <textarea 
          placeholder={placeholder}
          id={id} 
          rows={rows} 
          cols={cols}
          error={error}
          disabled={disabled}
        >          
        </textarea>
    </TextAreaContainer>
  );
}

export default TextArea;
