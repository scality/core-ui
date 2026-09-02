import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Icon, IconName } from '../icon/Icon.component';
import { convertSizeToRem, Input, InputSize } from '../inputv2/inputv2';
import { Button } from '../buttonv2/Buttonv2.component';
import { spacing } from '../../spacing';
import { CoreUITheme } from '../../style/theme';

export type Props = {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  disabled?: boolean;
  id?: string;
  size?: InputSize;
  autoComplete?: 'on' | 'off';
  searchIcon?: IconName;
  searchIconColor?: keyof CoreUITheme;
  className?: string;
};
const SearchInputContainer = styled.div.withConfig({
  componentId: 'sc-searchinput',
})<{
  $disabled?: boolean;
  $width: string;
}>`
  position: relative;
  /* Hugs its content, no wider than the parent -- max-content alone pinned the box
     and it overflowed. Two declarations, not min(max-content, 100%): an intrinsic
     keyword inside a math function is invalid, so the whole width is dropped and the
     box goes full-bleed.
     Floor is the 1/2 size, never more than the width asked for. min-width beats
     max-width, so past it the box overflows rather than shrink further: a field
     rationed to a few px looks fine but is unusable, and the overflow is what tells
     the layout around it to adapt. */
  width: max-content;
  max-width: 100%;
  min-width: min(${convertSizeToRem('1/2')}, ${(props) => props.$width});

  input[value] {
    max-width: calc(100% - 1rem - ${spacing.f8} - 1rem);
  }

  input[value=''] {
    max-width: calc(100% - 1rem - ${spacing.f8});
  }

  ${(props) => {
    if (props.$disabled) {
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
      searchIcon = 'Search',
      searchIconColor = 'textSecondary',
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
        $disabled={disabled}
        $width={convertSizeToRem(size)}
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
          noPlaceholderPrefix
          value={debouncedValue}
          onChange={handleChange}
          onReset={reset}
          size={size}
          /* The container above can now be narrower than `size`; without this the
             input keeps that width and overflows it. The two move together. */
          fluid
          leftIcon={searchIcon}
          leftIconColor={searchIconColor}
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
