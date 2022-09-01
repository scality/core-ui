import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { ScrollbarWrapper } from '../../index';
import { components } from 'react-select';
import { Icon } from '../icon/Icon.component';
import { SelectStyle } from './SelectStyle';
import { FixedSizeList as List } from 'react-window';
import { spacing } from '../../style/theme';
import { convertRemToPixels } from '../../utils';
const SelectContext = createContext<boolean>(false);
const ITEMS_PER_SCROLL_WINDOW = 4;
// more/equal than NOPT_SEARCH options enable search
const NOPT_SEARCH = 8;
export type OptionProps = {
  disabled?: boolean;
  icon?: JSX.Element;
  children?: React.ReactNode;
  value: string;
};
export function Option(_: OptionProps) {
  const context = useContext(SelectContext);
  if (!context)
    throw new Error('Option cannot be rendered outside the Select component');
  return _.children;
}

const Input = (props) => {
  const ariaProps = {
    role: props.selectProps.isSearchable ? 'combobox' : 'listbox',
    'aria-expanded': props.selectProps.menuIsOpen,
    'aria-autocomplete': 'list',
  };
  return <components.Input {...props} {...ariaProps} />;
};

const DropdownIndicator = (props) => {
  const indicatorDirection = props.selectProps.menuIsOpen ? 'up' : 'down';
  const caretType = props.selectProps.isDefault ? 'chevron' : 'caret';
  return (
    <components.DropdownIndicator {...props}>
      <i
        className={
          props.isDisabled
            ? 'fas fa-ban'
            : `fas fa-${caretType}-${indicatorDirection}`
        }
      />
    </components.DropdownIndicator>
  );
};

const InternalOption = (props) => {
  const formatOptionLabel = () => {
    const label: string = props.data.label;
    const inputValue = props.selectProps.inputValue;
    const parts = label
      .split(inputValue)
      .flatMap((item, index) => [inputValue, item])
      .slice(1);

    if (inputValue) {
      return (
        <div>
          {parts.map((part, i) => {
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
        </div>
      );
    } else {
      return <span>{label}</span>;
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
      <div>{props.isDisabled && <i className="fas fa-ban" />}</div>
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
  const listRef = useRef();
  const { children, getValue } = props;
  const [selectedOption] = getValue();
  const optionHeight =
    convertRemToPixels(
      parseFloat(props.selectProps.isDefault ? spacing.sp32 : spacing.sp24),
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
  placeholder?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onChange: (newValue: string) => void;
  variant?: 'default' | 'rounded';
  className?: string;
};
type SelectOptionProps = {
  value: string;
  label: React.ReactNode;
  isDisabled: boolean;
  icon?: ReturnType<typeof Icon>;
  optionProps: any;
};

function SelectBox({
  placeholder = 'Select...',
  disabled = false,
  children,
  defaultValue,
  value,
  onChange,
  variant = 'default',
  className,
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
  const options = useMemo((): Array<SelectOptionProps> => {
    if (children) {
      return (
        React.Children.toArray(children)
          // @ts-ignore
          .filter((child) => child.type === Option)
          .map((child) => {
            const { value, children, disabled, icon, ...rest }: OptionProps =
              // @ts-ignore
              child.props;
            return {
              value: value,
              label: children || '',
              isDisabled: disabled || false,
              icon: icon,
              optionProps: { ...rest },
            };
          })
      );
    } else {
      return [];
    }
  }, [children]);

  const handleChange = (option: SelectOptionProps) => {
    if (onChange && typeof onChange === 'function') {
      onChange(option ? option.value : '');
    }

    if (options && options.length > NOPT_SEARCH) {
      setSearchSelection(option ? option.value : '');
      // @ts-ignore
      setPlaceholder(option ? option.label : '');
      // @ts-ignore
      setSearchValue(option ? option.label : '');
    }
  };

  const handleSearchInput = (inputValue, { action }) => {
    if (options && options.length > NOPT_SEARCH) {
      if (action === 'menu-close') {
        setSearchSelection(undefined);
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
    <SelectContext.Provider value={true}>
      <ScrollbarWrapper>
        {options && (
          <SelectStyle
            className={['sc-select', className].join(' ')}
            classNamePrefix="sc-select"
            name="sc-select"
            aria-label="select"
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
              Option: InternalOption,
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
            {...rest}
          />
        )}
      </ScrollbarWrapper>
    </SelectContext.Provider>
  );
}

SelectBox.Option = Option;
export const Select = SelectBox;
