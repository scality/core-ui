import { ChangeEvent, forwardRef, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { fontSize } from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Icon } from '../icon/Icon.component';
import { Input } from '../input/Input.component';
export type Props = {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  disableToggle: boolean;
  disabled?: boolean;
};
const SearchInputContainer = styled.div<{
  docked?: boolean;
  disabled?: boolean;
}>`
  position: relative;

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

  .sc-input {
    display: block;
    input[type='text'] {
      width: ${(props) => (props.docked ? '40px' : '100%')};
      box-sizing: border-box;
      padding-left: ${(props) => (props.docked ? '28px' : '40px')};
      transition: width 0.2s ease-in-out;
    }
  }
`;
const IconButton = styled.button`
  position: absolute;
  border: none;
  outline: none;
  top: 1px;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: ${fontSize.base};
  color: ${getThemePropSelector('textSecondary')};
  background-color: transparent;
  ${(props) => {
    // TODO
    return (
      !props.disabled &&
      css`
        cursor: pointer;
        &:hover {
          color: ${getThemePropSelector('selectedActive')};
        }
      `
    );
  }};
`;
const SearchIcon = styled(IconButton)`
  left: 1px;
`;
const ResetIcon = styled(IconButton)<{ visible?: boolean }>`
  right: 1px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const SearchInput = forwardRef(
  (
    {
      disableToggle,
      placeholder,
      value,
      onChange,
      onReset,
      disabled,
      ...rest
    }: Props,
    forwardedRef,
  ) => {
    const [docked, setDocked] = useState(!disableToggle);
    const myInputRef = useRef<HTMLInputElement | null>(null);

    const toggle = () => {
      if (!disableToggle) {
        setDocked(!docked);
        if (myInputRef.current) {
          myInputRef.current.focus();
        }
      }
    };

    const reset = () => {
      if (onReset) {
        onReset();
      }

      if (!disableToggle) {
        setDocked(true);
      }
    };

    return (
      <SearchInputContainer
        className="sc-searchinput"
        disabled={disabled}
        docked={docked}
        {...rest}
      >
        <Input
          min={'1'}
          type="text"
          aria-label="search"
          name="search"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          inputRef={(element) => {
            myInputRef.current = element;
            if (typeof forwardedRef === 'function') {
              forwardedRef(element);
            } else if (forwardedRef) {
              forwardedRef.current = element;
            }
          }}
        />
        <SearchIcon onClick={toggle} disabled={!docked}>
          <Icon name="Search" />
        </SearchIcon>
        <ResetIcon onClick={reset} visible={!!value && !docked && !!onReset}>
          <Icon name="Times-circle" />
        </ResetIcon>
      </SearchInputContainer>
    );
  },
);

export { SearchInput };
