//@flow
import React from "react";
import { DebounceInput } from "react-debounce-input";
import Checkbox from "../checkbox/Checkbox.component";
import Select from "../select/Select.component";
import TextArea from "../textarea/TextArea.component";
import { InputContainer, LabelStyle, InputErrorMessage, InputWrapper} from "./input.component.style";

export type Item = {
  label: string,
  value: string | number
};

type Items = Array<Item>;

type Props = {
  value: any,
  type?: string,
  label?: string,
  title?: string,
  error?: string,
  id?: string,
  checked?: boolean,
  onChange: () => void,
  options?: Items
};

const InputRenderer = ({
  type,
  id,
  value,
  checked,
  onChange,
  options = [],
  ...rest
}) => {
  const input = {
    select: 
      <Select
        id={id}
        value={value}
        onChange={onChange}
        options={options}
        {...rest}
      />,
    checkbox:      
      <Checkbox
        id={id}
        value={value}
        checked={!!checked}
        onChange={onChange}
        {...rest}
      />,
    textarea:
      <TextArea
        rows={10} 
        cols={200} 
        id={"text"} 
        label="Text Area:"  
        {...rest}
      />,
    debounceInput:
      <DebounceInput
        className="sc-input-type"
        minLength={1}
        debounceTimeout={300}
        id={id}          
        value={value}
        onChange={onChange}
        autocomplete="off"
        {...rest}
      />    
  }

return input[type] || input.debounceInput
};

const Input = ({ label, id, error, ...rest }: Props) => {
  return (
    <InputContainer className="sc-input" error={error}>
      {label && (
        <LabelStyle htmlFor={id} className="sc-input-label">
          {label}
        </LabelStyle>
      )}      
      <InputWrapper className="sc-input-wrapper">
        <InputRenderer id={id} {...rest} />
        {error && (
          <InputErrorMessage className="sc-input-error">
            {error}
          </InputErrorMessage>
        )}
      </InputWrapper>
    </InputContainer>
  );
};

export default Input;
