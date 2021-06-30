//@flow
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type { Element } from 'react';
import type { Node } from 'react';
import { ScrollbarWrapper } from '../../index';
import { components } from 'react-select';
import Icon from '../icon/Icon.component';
import StyledSelect from './SelectStyle';

const SelectContext = createContext<boolean>(false);

export type OptionProps = {
  disabled?: boolean,
  icon?: Element<typeof Icon>,
  children: string,
  value: string,
};

export function Option(_: OptionProps) {
  const context = useContext(SelectContext);

  if (!context)
    throw new Error('Option cannot be rendered outside the Select component');
  return null;
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
    const label = props.data.label;
    const inputValue = props.selectProps.inputValue;
    const regex = new RegExp('(' + inputValue + ')', 'gi');
    const match = label.match(regex);

    if (match && inputValue) {
      const parts = label.split(match[0], 2);
      const highlight = match[0];
      return (
        <div>
          <span>{parts[0]}</span>
          <span className="sc-highlighted-matching-text">{highlight}</span>
          <span>{parts[1]}</span>
        </div>
      );
    } else {
      return <span>{label}</span>;
    }
  };

  const innerProps = {
    ...props.innerProps,
    ...props.data.optionProps,
    role: 'option',
    'aria-disabled': props.isDisabled,
    'aria-selected': props.isSelected,
  };

  return (
    <components.Option {...props} innerProps={innerProps}>
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
  placeholder?: string,
  disabled?: boolean,
  children: Node,
  defaultValue?: string,
  value?: string,
  onChange: (newValue: string) => void,
  variant?: 'default' | 'rounded',
  className?: string,
};

// more/equal than NOPT_SEARCH options enable search
const NOPT_SEARCH = 8;

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
  const [searchSelection, setSearchSelection] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [customPlaceholder, setPlaceholder] = useState(placeholder);
  const [options, setOptions] = useState<Array<any> | null>(null);
  const isDefaultVariant = variant === 'default';
  const [isMenuBottom, setIsMenuBottom] = useState(true);
  const [selectRef, setSelectRef] = useState(null);

  const childrenToOptions = useCallback((): Array<any> => {
    if (children) {
      return React.Children.toArray(children)
        .filter((child) => child.type === Option)
        .map((child) => {
          const {
            value,
            children,
            disabled,
            icon,
            ...rest
          }: OptionProps = child.props;
          return {
            value: value,
            label: children,
            isDisabled: disabled,
            icon: icon,
            optionProps: { ...rest },
          };
        });
    } else {
      return [];
    }
  }, [children]);

  useEffect(() => {
    setOptions(childrenToOptions());
  }, [childrenToOptions]);

  const handleChange = (option) => {
    if (onChange) {
      onChange(option.value);
    }
    if (options && options.length > NOPT_SEARCH) {
      setSearchSelection(option.value);
      setPlaceholder(option.label);
      setSearchValue(option.label);
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

  return (
    <SelectContext.Provider value={true}>
      <ScrollbarWrapper>
        {options && (
          <StyledSelect
            className={['sc-select', className].join(' ')}
            classNamePrefix="sc-select"
            name="sc-select"
            aria-label="select"
            value={
              searchSelection || options.find((opt) => opt.value === value)
            }
            defaultValue={options.find((opt) => opt.value === defaultValue)}
            inputValue={options.length > NOPT_SEARCH ? searchValue : undefined}
            selectedOption={options.find((opt) => opt.value === value)}
            options={options}
            isDisabled={disabled}
            placeholder={customPlaceholder}
            menuPlacement="auto"
            isSearchable={options.length > NOPT_SEARCH}
            components={{
              Input: Input,
              Option: InternalOption,
              Menu: Menu,
              ValueContainer: ValueContainer,
              DropdownIndicator: DropdownIndicator,
              IndicatorSeparator: null,
            }}
            isDefault={isDefaultVariant}
            onChange={handleChange}
            onInputChange={handleSearchInput}
            ref={(ref) => setSelectRef(ref)}
            isMenuBottom={isMenuBottom}
            setIsMenuBottom={setIsMenuBottom}
            onKeyDown={(event) => {
              if (
                event &&
                event.key === 'Enter' &&
                selectRef &&
                !selectRef.state.isOpen
              )
                selectRef.setState({ menuIsOpen: true });
            }}
            {...rest}
          />
        )}
      </ScrollbarWrapper>
    </SelectContext.Provider>
  );
}

SelectBox.Option = Option;

export default SelectBox;
