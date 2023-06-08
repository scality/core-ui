import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { ScrollbarWrapper } from '../../index';
import { components } from 'react-select';
import { Icon } from '../icon/Icon.component';
import { SelectStyle } from './SelectStyle';
import { FixedSizeList, FixedSizeList as List } from 'react-window';
import { convertRemToPixels } from '../../utils';
import { spacing } from '../../spacing';
import { convertSizeToRem } from '../inputv2/inputv2';
import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';

const ITEMS_PER_SCROLL_WINDOW = 4;
// more/equal than NOPT_SEARCH options enable search
const NOPT_SEARCH = 8;
export type OptionProps = {
  title?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  value: string;
};
const usePreviousValue = (value) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

function useOptions() {
  const optionContext = useContext(OptionContext);
  if (!optionContext)
    throw new Error(
      'useOptions cannot be rendered outside the Select component',
    );
  return Object.values(optionContext.options);
}

export function Option({
  value,
  children,
  disabled,
  icon,
  ...rest
}: OptionProps): JSX.Element {
  const optionContext = useContext(OptionContext);
  if (!optionContext)
    throw new Error('Option cannot be rendered outside the Select component');

  const prevValue = usePreviousValue(value);

  useEffect(() => {
    if (prevValue && prevValue !== value) {
      optionContext.unregister(prevValue);
    }
    optionContext.register({
      value: value,
      label: children || '',
      isDisabled: disabled || false,
      icon: icon,
      optionProps: { ...rest },
    });
    return () => {
      optionContext.unregister(value);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps --  optionContext is mutable
  }, [children, disabled, icon, value, prevValue]);

  return <></>;
}

const Input = (props) => {
  const ariaProps = {
    role: props.selectProps.isSearchable ? 'combobox' : 'listbox',
    'aria-expanded': props.selectProps.menuIsOpen,
    'aria-autocomplete': 'list',
  };
  return <components.Input {...props} {...ariaProps} />;
};

const selectDropdownIndicator = (
  caretType: 'chevron' | 'caret',
  indicatorDirection: 'up' | 'down',
) => {
  if (caretType === 'chevron') {
    if (indicatorDirection === 'up') return 'Chevron-up';
    else return 'Chevron-down';
  } else {
    if (indicatorDirection === 'up') return 'Dropdown-up';
    else return 'Dropdown-down';
  }
};

const DropdownIndicator = (props) => {
  const indicatorDirection = props.selectProps.menuIsOpen ? 'up' : 'down';
  const caretType = props.selectProps.isDefault ? 'chevron' : 'caret';
  return (
    <components.DropdownIndicator {...props}>
      <Icon
        name={
          props.isDisabled
            ? 'Deletion-marker'
            : selectDropdownIndicator(caretType, indicatorDirection)
        }
      />
    </components.DropdownIndicator>
  );
};

const InternalOption = (width, isDefaultVariant) => (props) => {
  const formatOptionLabel = () => {
    const label: string = props.data.label;
    const inputValue = props.selectProps.inputValue;
    const parts = label
      .split(inputValue)
      .flatMap((item, index) => [inputValue, item])
      .slice(1);

    const reducedWidth = `${parseFloat(width.replace('rem')) - 2}rem`;

    if (inputValue) {
      return (
        <ConstrainedText
          lineClamp={isDefaultVariant ? 2 : 1}
          tooltipStyle={{
            width: reducedWidth,
          }}
          text={parts.map((part, i) => {
            const highlightStyle =
              part.toLowerCase() === inputValue.toLowerCase()
                ? 'sc-highlighted-matching-text'
                : '';
            return (
              <span key={i} className={highlightStyle}>
                {part}
              </span>
            );
          })}
        />
      );
    } else {
      return (
        <ConstrainedText
          lineClamp={isDefaultVariant ? 2 : 1}
          tooltipStyle={{
            width: reducedWidth,
          }}
          text={label}
        />
      );
    }
  };

  const innerProps = {
    ...props.innerProps,
    ...props.data.optionProps,
    // remove onMouseMove & onMouseOver so that options are not focused on hover
    onMouseMove: undefined,
    onMouseOver: undefined,
    role: 'option',
    'aria-disabled': props.isDisabled,
    'aria-selected': props.isSelected,
  };
  return (
    <components.Option
      {...props}
      innerProps={innerProps}
      isFocused={props.isFocused && props.selectProps.keyboardFocusEnabled}
    >
      <div className="option-value-wrapper">
        <div className="option-icon">{props.data.icon}</div>
        {formatOptionLabel()}
      </div>
      <div>{props.isDisabled && <Icon name="Deletion-marker" />}</div>
    </components.Option>
  );
};

const Menu = (props) => {
  useEffect(() => {
    props.selectProps.setIsMenuBottom(props.placement === 'bottom');
  }, [props]);
  return <components.Menu {...props} />;
};

const getScrollOffset = (
  list,
  index: number,
  itemCount: number,
  offset: number,
): number => {
  const { itemSize, height } = list.props;
  const scrollOffset = list.state ? list.state.scrollOffset : 0;
  const lastItemOffset = Math.max(0, itemCount * itemSize - height);
  const maxOffset = Math.min(lastItemOffset, index * itemSize);
  const minOffset = Math.max(0, index * itemSize - height + itemSize);

  if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
    return scrollOffset;
  } else if (scrollOffset < minOffset) {
    return minOffset === 0 ? minOffset : minOffset + offset;
  } else {
    return maxOffset === 0 ? maxOffset : maxOffset - offset;
  }
};

const MenuList = (props) => {
  const listRef = useRef<FixedSizeList<any> | null>(null);
  const { children, getValue } = props;
  const [selectedOption] = getValue();
  const optionHeight =
    convertRemToPixels(
      parseFloat(props.selectProps.isDefault ? spacing.r40 : spacing.r24),
    ) || 32;
  let selectedIndex = 0;
  let focusedIndex = 0;

  if (children && children.length > 0) {
    selectedIndex = children.findIndex(
      (child) => child.props.data === selectedOption,
    );
    focusedIndex = props.focusedOption
      ? children.findIndex((child) => child.props.data === props.focusedOption)
      : selectedIndex;
  }

  const initialOffset =
    selectedIndex * optionHeight - (ITEMS_PER_SCROLL_WINDOW - 1) * optionHeight;
  useEffect(() => {
    if (listRef && listRef.current) {
      // @ts-ignore
      listRef.current.scrollTo(
        getScrollOffset(
          listRef.current,
          focusedIndex,
          children.length,
          optionHeight / 2,
        ),
      );
    }
  }, [children.length, focusedIndex, optionHeight, listRef]);

  if (children.length > ITEMS_PER_SCROLL_WINDOW) {
    return (
      // @ts-ignore
      <List
        ref={listRef}
        className="sc-select__menu-list"
        height={optionHeight * ITEMS_PER_SCROLL_WINDOW + optionHeight / 2}
        itemCount={children.length}
        itemSize={optionHeight}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => {
          return (
            <div className="react-window-option" style={style}>
              {children[index]}
            </div>
          );
        }}
      </List>
    );
  }

  return <components.MenuList {...props}>{children}</components.MenuList>;
};

const ValueContainer = ({ children, ...props }) => {
  const selectedOption = props.selectProps.selectedOption;
  const icon = selectedOption ? selectedOption.icon : null;
  return (
    <components.ValueContainer {...props}>
      {icon ? <div className="value-container-icon">{icon}</div> : null}
      <div>{children}</div>
    </components.ValueContainer>
  );
};

export type SelectProps = {
  id: string;
  placeholder?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onChange: (newValue: string) => void;
  variant?: 'default' | 'rounded';
  size?: '1' | '2/3' | '1/2' | '1/3';
  className?: string;
};
type SelectOptionProps = {
  value: string;
  label: React.ReactNode;
  isDisabled: boolean;
  icon?: React.ReactNode;
  optionProps: any;
};

const OptionContext =
  createContext<{
    options: Record<string, SelectOptionProps>;
    register: (option: SelectOptionProps) => void;
    unregister: (value: string) => void;
  } | null>(null);

function SelectWithOptionContext(props: SelectProps) {
  const [options, setOptions] = useState<Record<string, SelectOptionProps>>({});

  const register = (option: SelectOptionProps) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option.value]: option,
    }));
  };

  const unregister = (value: string) => {
    setOptions((prevOptions) => {
      const { [value]: _, ...rest } = prevOptions;
      return rest;
    });
  };

  return (
    <OptionContext.Provider value={{ options, register, unregister }}>
      <>
        <SelectBox {...props} />
        {props.children}
      </>
    </OptionContext.Provider>
  );
}

function SelectBox({
  placeholder = 'Select...',
  disabled = false,

  defaultValue,
  value,
  onChange,
  variant = 'default',
  className,
  size = '1',
  id,
  ...rest
}: SelectProps) {
  if (defaultValue && value) {
    console.error(
      'The `defaultValue` will be overridden by the `value` if they are set at the same time.',
    );
  }
  const [keyboardFocusEnabled, setKeyboardFocusEnabled] = useState(false);
  const [searchSelection, setSearchSelection] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [customPlaceholder, setPlaceholder] = useState(placeholder);
  const isDefaultVariant = variant === 'default';
  const [isMenuBottom, setIsMenuBottom] = useState(true);
  const selectRef = useRef<any>();

  const options = useOptions();

  const handleChange = (option: SelectOptionProps) => {
    const newValue = option ? option.value : '';
    if (onChange && typeof onChange === 'function' && newValue !== value) {
      onChange(newValue);
    }

    if (options && options.length > NOPT_SEARCH) {
      selectRef.current.blur();
    }
  };

  const handleSearchInput = (inputValue, { action }) => {
    if (options && options.length > NOPT_SEARCH) {
      if (action === 'menu-close') {
        setSearchSelection('');
      }

      if (action === 'input-blur' || action === 'set-value') {
        if (searchValue) setPlaceholder(searchValue);
        else setPlaceholder(placeholder);
        setSearchValue(inputValue);
      } else {
        setSearchValue(inputValue);
        if (inputValue.length === 0) setPlaceholder(placeholder);
      }
    }
  };

  const isEmptyStringInOptions = options.find((option) => option.value === '');

  // Force to reset the value
  useEffect(() => {
    if (
      !defaultValue &&
      !isEmptyStringInOptions &&
      value === '' &&
      selectRef.current &&
      selectRef.current.select
    ) {
      selectRef.current.select.clearValue();
    }
  }, [value, selectRef, isEmptyStringInOptions]);

  return (
    <ScrollbarWrapper>
      <>
        {options && (
          <SelectStyle
            inputId={id}
            className={['sc-select', className].join(' ')}
            classNamePrefix="sc-select"
            name="sc-select"
            value={
              searchSelection || options.find((opt) => opt.value === value)
            }
            defaultValue={defaultValue}
            inputValue={options.length > NOPT_SEARCH ? searchValue : undefined}
            selectedOption={options.find((opt) => opt.value === value)}
            keyboardFocusEnabled={keyboardFocusEnabled}
            options={options}
            isDisabled={disabled}
            placeholder={customPlaceholder}
            menuPlacement="auto"
            isSearchable={options.length > NOPT_SEARCH}
            components={{
              Input: Input,
              Option: InternalOption(convertSizeToRem(size), isDefaultVariant),
              Menu: Menu,
              MenuList: MenuList,
              ValueContainer: ValueContainer,
              DropdownIndicator: DropdownIndicator,
              IndicatorSeparator: null,
            }}
            isDefault={isDefaultVariant}
            ITEMS_PER_SCROLL_WINDOW={ITEMS_PER_SCROLL_WINDOW}
            onChange={handleChange}
            onInputChange={handleSearchInput}
            ref={selectRef}
            isMenuBottom={isMenuBottom}
            setIsMenuBottom={setIsMenuBottom}
            onBlur={rest.onBlur}
            onFocus={rest.onFocus}
            onMenuClose={() => setKeyboardFocusEnabled(false)}
            onKeyDown={(event: KeyboardEvent) => {
              if (
                event &&
                event.key === 'Enter' &&
                selectRef &&
                !selectRef.current.state.isOpen
              ) {
                selectRef.current.setState({
                  menuIsOpen: true,
                });
              } else {
                setKeyboardFocusEnabled(true);
              }
            }}
            width={convertSizeToRem(size)}
            {...rest}
          />
        )}
      </>
    </ScrollbarWrapper>
  );
}

SelectWithOptionContext.Option = Option;
export const Select = SelectWithOptionContext;
