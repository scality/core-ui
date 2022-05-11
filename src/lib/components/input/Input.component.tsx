// @ts-nocheck
import React, { useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';
import Checkbox from '../checkbox/Checkbox.component';
import Select from '../select/Select.component';
import TextArea from '../textarea/TextArea.component';
import {
  InputContainer,
  LabelStyle,
  InputErrorMessage,
  InputWrapper,
} from './Input.component.style';
export type Item = {
  label: string;
  value: string | number;
};
type Items = Array<Item>;
export type InputProps = {
  value: any;
  type?: string;
  label?: string;
  title?: string;
  error?: string;
  id?: string;
  checked?: boolean;
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  options?: Items;
  disabled?: boolean;
  min?: string;
  max?: string;
};

const InputRenderer = ({
  type,
  id,
  value,
  checked,
  onChange,
  options = [],
  min,
  max,
  ...rest
}) => {
  const inputEl = useRef(null);

  const handleNumberClick = (e) => {
    /*
     ** Since react is using Synthetic event we have to do the following to be
     ** able to programmatically dispatch the onChange event from the input
     */
    const valuePropDescriptor = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    );

    if (valuePropDescriptor && inputEl.current) {
      const nativeInputValueSetter = valuePropDescriptor.set;

      if (nativeInputValueSetter) {
        if (e.target.dataset.core === 'up')
          nativeInputValueSetter.call(
            inputEl.current,
            max
              ? max && parseInt(value) + 1 <= parseInt(max)
                ? parseInt(value) + 1
                : parseInt(value)
              : parseInt(value) + 1,
          );
        else
          nativeInputValueSetter.call(
            inputEl.current,
            min
              ? min && parseInt(value) - 1 >= parseInt(min)
                ? parseInt(value) - 1
                : parseInt(value)
              : parseInt(value) - 1,
          );
      }

      const event = new Event('input', {
        bubbles: true,
      });
      inputEl.current.dispatchEvent(event);
    }
  };

  const input = {
    select: (
      <Select
        id={id}
        value={value}
        onChange={onChange}
        options={options}
        {...rest}
      />
    ),
    checkbox: (
      <Checkbox
        id={id}
        value={value}
        checked={!!checked}
        onChange={onChange}
        {...rest}
      />
    ),
    textarea: <TextArea id={id} value={value} onChange={onChange} {...rest} />,
    number: (
      <div className="sc-number-input-wrapper">
        <input
          className="sc-input-type sc-number-input"
          type="number"
          id={id}
          value={value}
          onChange={onChange}
          ref={inputEl}
          min={min}
          max={max}
          {...rest}
        />
        <div className="carets-wrapper">
          <i
            className="fas fa-caret-up"
            data-core="up"
            onClick={handleNumberClick}
          ></i>
          <i
            className="fas fa-caret-down"
            data-core="down"
            onClick={handleNumberClick}
          ></i>
        </div>
      </div>
    ),
    text: (
      <DebounceInput
        className="sc-input-type"
        minLength={1}
        debounceTimeout={300}
        id={id}
        value={value}
        onChange={onChange}
        autoComplete="off"
        {...rest}
      />
    ),
  };
  if (type) return input[type];
  else return input.text;
};

const Input = ({ label, id, error, type, disabled, ...rest }: InputProps) => {
  return (
    <InputContainer
      className="sc-input"
      disabled={disabled}
      error={error}
      type={type}
    >
      {label && (
        <LabelStyle htmlFor={id} className="sc-input-label">
          {label}
        </LabelStyle>
      )}
      <InputWrapper className="sc-input-wrapper">
        <InputRenderer id={id} type={type} disabled={disabled} {...rest} />
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
