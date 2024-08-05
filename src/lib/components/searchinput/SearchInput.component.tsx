import React from 'react';
import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '../icon/Icon.component';
import { Input, InputSize } from '../inputv2/inputv2';
import { Button } from '../buttonv2/Buttonv2.component';
import { spacing } from '../../spacing';
export type Props = {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  disabled?: boolean;
  id?: string;
  size?: InputSize;
  autoComplete?: 'on' | 'off';
};
const SearchInputContainer = styled.div<{
  docked?: boolean;
  disabled?: boolean;
}>`
  position: relative;
  width: max-content;

  input[value] {
    max-width: calc(100% - 1rem - ${spacing.f8} - 1rem);
  }

  input[value=''] {
    max-width: calc(100% - 1rem - ${spacing.f8});
  }

  ${(props) => {
    if (props.disabled) {
      return css`
        i {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `;
    }
  }}

  //hide the default clear button in chrome
  .search-box::-webkit-search-cancel-button {
    display: none;
  }
`;

const ClearButton = styled.div`
  position: absolute;
  right: 1px;
  top: 0px;
`;

const SearchInput = forwardRef(
  (
    {
      placeholder,
      value,
      onChange,
      onReset,
      disabled,
      id,
      size,
      autoComplete = 'on',
      ...rest
    }: Props,
    forwardedRef,
  ) => {
    const myInputRef = useRef<HTMLInputElement | null>(null);
    const debounce = useRef<NodeJS.Timeout | null>(null);
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      return () => {
        if (debounce.current) {
          clearTimeout(debounce.current);
        }
      };
    }, []);

    const reset = () => {
      setDebouncedValue('');
      if (onReset) {
        onReset();
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setDebouncedValue(e.target.value);
      if (debounce.current) {
        clearTimeout(debounce.current);
      }

      debounce.current = setTimeout(() => {
        onChange(e);
      }, 300);
    };

    return (
      <SearchInputContainer
        className="sc-searchinput"
        disabled={disabled}
        {...rest}
      >
        <Input
          autoComplete={autoComplete}
          min={'1'}
          id={id || 'search'}
          type="search"
          aria-label="search"
          name="search"
          placeholder={placeholder}
          value={debouncedValue}
          onChange={handleChange}
          onReset={reset}
          size={size}
          leftIcon="Search"
          className="search-box"
          disabled={disabled}
          ref={(element) => {
            myInputRef.current = element;
            if (typeof forwardedRef === 'function') {
              forwardedRef(element);
            } else if (forwardedRef) {
              forwardedRef.current = element;
            }
          }}
        />
        {debouncedValue && (
          <ClearButton className="close-icon">
            <Button
              icon={<Icon name="Close" />}
              tooltip={{ overlay: 'Reset' }}
              onClick={reset}
            />
          </ClearButton>
        )}
      </SearchInputContainer>
    );
  },
);

export { SearchInput };
