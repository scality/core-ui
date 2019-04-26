//@flow
import React from "react";
import styled, { css } from "styled-components";
import { DebounceInput } from "react-debounce-input";
import Checkbox from "../checkbox/Checkbox.component";
import * as defaultTheme from "../../style/theme";
import { mergeTheme } from "../../utils";

type Props = {
  value: string,
  type?: string,
  label?: string,
  title?: string,
  error?: string,
  id?: string,
  checked?: boolean,
  onChange: () => void
};

const InputContainer = styled.div`
  display: inline-flex;

  .sc-checkbox {
    margin: ${defaultTheme.padding.smaller} 0;
  }

  input {
    padding: 8px ${defaultTheme.padding.small};
    font-size: ${defaultTheme.fontSize.base};
    display: block;
    border-radius: 4px;
    border: 1px solid
      ${props =>
        props.error
          ? mergeTheme(props.theme, defaultTheme).danger
          : defaultTheme.gray};
  }

  input:focus {
    border-color: ${props => mergeTheme(props.theme, defaultTheme).primary};
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 1px rgba(0, 126, 255, 0.1);
    outline: none;
  }

  ${props => {
    if (props.error) {
      return css`
        @keyframes shake {
          from,
          to {
            transform: translate3d(0, 0, 0);
          }

          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translate3d(-5px, 0, 0);
          }

          20%,
          40%,
          60%,
          80% {
            transform: translate3d(5px, 0, 0);
          }
        }
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-name: shake;
      `;
    }
  }};
`;

const LabelStyle = styled.label`
  align-self: flex-start;
  padding: ${defaultTheme.padding.small};
  font-size: ${defaultTheme.fontSize.base};
`;

const InputErrorMessage = styled.span`
  color: ${props => mergeTheme(props.theme, defaultTheme).danger};
  margin: ${defaultTheme.padding.smaller} 0;
  font-size: ${defaultTheme.fontSize.small};
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  checked,
  ...rest
}: Props) => {
  return (
    <InputContainer className="sc-input" error={error}>
      {label && (
        <LabelStyle htmlFor={id} className="sc-input-label">
          {label}
        </LabelStyle>
      )}
      <InputWrapper>
        {type === "checkbox" ? (
          <Checkbox
            id={id}
            type={type}
            value={value}
            checked={!!checked}
            onChange={onChange}
            {...rest}
          />
        ) : (
          <DebounceInput
            minLength={1}
            debounceTimeout={300}
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            {...rest}
          />
        )}
        {error && <InputErrorMessage>{error}</InputErrorMessage>}
      </InputWrapper>
    </InputContainer>
  );
};

export default Input;
