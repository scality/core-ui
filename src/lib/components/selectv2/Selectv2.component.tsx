import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  forwardRef,
  ForwardRefExoticComponent,
  ComponentProps,
  RefAttributes,
  useImperativeHandle,
  ReactNode,
  Ref,
  useMemo,
  useCallback,
  useId,
} from 'react';
import { ScrollbarWrapper, Tooltip } from '../../index';
import {
  components,
  GroupTypeBase,
  OptionTypeBase,
  ValueContainerProps,
} from 'react-select';
import { Icon } from '../icon/Icon.component';
import { SelectStyle } from './SelectStyle';
import { FixedSizeList, FixedSizeList as List } from 'react-window';
import { convertRemToPixels } from '../../utils';
import { spacing } from '../../spacing';
import { convertSizeToRem } from '../inputv2/inputv2';
import { useFieldContext } from '../form/Form.component';
import { ConstrainedText } from '../constrainedtext/Constrainedtext.component';
import ReactSelect from 'react-select/src/Select';

// more/equal than NOPT_SEARCH options enable search
const NOPT_SEARCH = 8;
export type OptionProps = {
  title?: string;
  disabled?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  value: string;
  disabledReason?: ReactNode;
};
export type GroupProps = {
  label: string;
  children?: ReactNode;
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
  disabledReason,
  ...rest
}: OptionProps): JSX.Element {
  const optionContext = useContext(OptionContext);
  const groupContext = useContext(GroupContext);
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
      disabledReason: disabledReason,
      groupLabel: groupContext?.label,
      optionProps: { ...rest },
    });
    return () => {
      optionContext.unregister(value);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps --  optionContext is mutable
  }, [children, disabled, icon, value, prevValue, groupContext?.label]);

  return <></>;
}

/**
 * Groups the `Select.Option`s nested inside it under a heading. The heading is
 * a label only: it is not selectable and keyboard focus steps over it.
 */
export function Group({ label, children }: GroupProps): JSX.Element {
  const optionContext = useContext(OptionContext);
  const groupContext = useMemo(() => ({ label }), [label]);

  if (!optionContext)
    throw new Error('Group cannot be rendered outside the Select component');

  return (
    <GroupContext.Provider value={groupContext}>
      {children}
    </GroupContext.Provider>
  );
}

const Input = (props) => {
  return <components.Input {...props} />;
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
              <span
                role={highlightStyle ? 'mark' : undefined}
                key={i}
                className={highlightStyle}
              >
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
    // role="group" has to contain the options it heads, which the flattened
    // rows below rule out -- so each option names its heading instead.
    'aria-describedby': props.data.groupLabel
      ? groupHeadingId(
          props.selectProps.groupIdPrefix,
          props.selectProps.groupIndexByLabel[props.data.groupLabel],
        )
      : undefined,
  };
  return (
    <Tooltip
      overlay={props.data.isDisabled && props.data.disabledReason}
      placement="right"
      overlayStyle={{ marginLeft: '0.5rem', maxWidth: '15rem' }}
    >
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
    </Tooltip>
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

const GroupHeadingRow = ({ label }: { label: ReactNode }) => (
  <div role="presentation" className="sc-select__group-heading">
    {label}
  </div>
);

// react-window unmounts a row once it scrolls out of the window, so the visible
// heading cannot be what an option's aria-describedby points at -- the
// description would come and go with the scroll position. These stay mounted.
const GroupDescriptions = ({
  prefix,
  indexByLabel,
}: {
  prefix: string;
  indexByLabel: Record<string, number>;
}) => (
  <div className="sc-select__group-descriptions">
    {Object.entries(indexByLabel).map(([label, index]) => (
      <div key={label} id={groupHeadingId(prefix, index)}>
        {label}
      </div>
    ))}
  </div>
);

const MenuList = (props) => {
  const listRef = useRef<FixedSizeList<any> | null>(null);
  const { children, getValue } = props;
  const [selectedOption] = getValue();
  const { itemsPerScrollWindow, groupIdPrefix, groupIndexByLabel } =
    props.selectProps;
  const optionHeight =
    convertRemToPixels(
      parseFloat(props.selectProps.isDefault ? spacing.r40 : spacing.r24),
    ) || 32;
  let selectedIndex = 0;
  let focusedIndex = 0;

  // react-window sizes every row alike, so react-select's nested group -- one
  // row holding a whole group -- is flattened here into a heading row plus its
  // options.
  const rows = Array.isArray(children)
    ? children.flatMap((child) => {
        const group = child?.props?.data;
        if (!group?.options) {
          return [child];
        }
        return [
          <GroupHeadingRow
            key={`heading-${group.label}`}
            label={child.props.label}
          />,
          ...child.props.children,
        ];
      })
    : children;

  // A heading row carries no data, and neither does an empty selection -- so
  // the match has to reject undefined rather than let the two meet.
  const isRowFor = (row, option) =>
    Boolean(option) && row?.props?.data === option;

  if (rows && rows.length > 0) {
    selectedIndex = rows.findIndex((row) => isRowFor(row, selectedOption));
    focusedIndex = props.focusedOption
      ? rows.findIndex((row) => isRowFor(row, props.focusedOption))
      : selectedIndex;
  }

  const initialOffset =
    selectedIndex * optionHeight - (itemsPerScrollWindow - 1) * optionHeight;
  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.scrollTo(
        getScrollOffset(
          listRef.current,
          focusedIndex,
          rows.length,
          optionHeight / 2,
        ),
      );
    }
  }, [rows.length, focusedIndex, optionHeight, listRef]);

  const descriptions = Object.keys(groupIndexByLabel).length > 0 && (
    <GroupDescriptions
      prefix={groupIdPrefix}
      indexByLabel={groupIndexByLabel}
    />
  );

  if (rows.length > itemsPerScrollWindow) {
    return (
      <>
        {descriptions}
        {/* @ts-ignore */}
        <List
          ref={listRef}
          className="sc-select__menu-list"
          height={optionHeight * itemsPerScrollWindow + optionHeight / 2}
          itemCount={rows.length}
          itemSize={optionHeight}
          initialScrollOffset={initialOffset}
          // css prop willChange used by react-window causes display issues with tooltip
          style={{ willChange: undefined }}
        >
          {({ index, style }) => {
            return (
              <div className="react-window-option" style={style}>
                {rows[index]}
              </div>
            );
          }}
        </List>
      </>
    );
  }

  return (
    <>
      {descriptions}
      <components.MenuList {...props}>{rows}</components.MenuList>
    </>
  );
};

const ValueContainer = <
  OptionType extends OptionTypeBase,
  IsMulti extends boolean,
  GroupType extends GroupTypeBase<OptionType>,
>({
  children,
  ...props
}: ValueContainerProps<OptionType, IsMulti, GroupType>) => {
  const selectedOption = props.selectProps.selectedOption;
  const icon = selectedOption ? selectedOption.icon : null;
  const ariaProps = {
    innerProps: {
      disabled: true,
      role: props.selectProps.isSearchable ? 'combobox' : 'listbox',
      'aria-expanded': props.selectProps.menuIsOpen,
      'aria-autocomplete': 'list',
      'aria-label': props.selectProps.placeholder,
    },
  };

  return (
    <components.ValueContainer {...props} {...ariaProps}>
      {icon ? <div className="value-container-icon">{icon}</div> : null}
      <div>{children}</div>
    </components.ValueContainer>
  );
};
export interface SelectRef<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean,
  GroupType extends GroupTypeBase<OptionType>,
> {
  select: ReactSelect<OptionType, IsMulti, GroupType> | null;
  focus: () => void;
  blur: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  setValue: (value: string) => void;
  clearValue: () => void;
}

export type SelectProps = {
  id: string;
  placeholder?: string;
  disabled?: boolean;
  children?: ReactNode;
  value?: string;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onChange: (newValue: string) => void;
  variant?: 'default' | 'rounded';
  size?: '1' | '2/3' | '1/2' | '1/3';
  className?: string;
  /** When true (or inside a responsive Form), the control fills its container
   *  down to a min instead of staying fixed at its `size` width. */
  fluid?: boolean;
  /** use menuPositon='fixed' inside modal to avoid display issue */
  menuPosition?: 'fixed' | 'absolute';
  /** number of items visible before the option list becomes scrollable
   * @default 4
   */
  itemsPerScrollWindow?: number;
};

type SelectOptionProps = {
  value: string;
  label: ReactNode;
  isDisabled: boolean;
  icon?: ReactNode;
  optionProps: any;
  disabledReason?: ReactNode;
  groupLabel?: string;
};

type SelectGroupProps = {
  label: string;
  options: SelectOptionProps[];
};

// Membership is keyed on the label, not on runs of adjacent options: the
// registry is a plain object keyed by value, and JS returns numeric-like keys
// in numeric order rather than declaration order.
function groupOptions(options: SelectOptionProps[]): {
  groupedOptions: Array<SelectOptionProps | SelectGroupProps>;
  groupIndexByLabel: Record<string, number>;
} {
  const groupIndexByLabel: Record<string, number> = {};
  if (!options.some((option) => option.groupLabel)) {
    return { groupedOptions: options, groupIndexByLabel };
  }

  const groupedOptions: Array<SelectOptionProps | SelectGroupProps> = [];
  const groupsByLabel: Record<string, SelectGroupProps> = {};

  options.forEach((option) => {
    const { groupLabel } = option;
    if (!groupLabel) {
      groupedOptions.push(option);
      return;
    }
    if (!groupsByLabel[groupLabel]) {
      groupIndexByLabel[groupLabel] = Object.keys(groupIndexByLabel).length;
      groupsByLabel[groupLabel] = { label: groupLabel, options: [] };
      groupedOptions.push(groupsByLabel[groupLabel]);
    }
    groupsByLabel[groupLabel].options.push(option);
  });

  return { groupedOptions, groupIndexByLabel };
}

const groupHeadingId = (prefix: string, index: number) =>
  `${prefix}-group-${index}`;

type SelectComponentType<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean,
  GroupType extends GroupTypeBase<OptionType>,
> = ForwardRefExoticComponent<
  SelectProps & RefAttributes<SelectRef<OptionType, IsMulti, GroupType>>
> & {
  Option: typeof Option;
  Group: typeof Group;
};

const OptionContext = createContext<{
  options: Record<string, SelectOptionProps>;
  register: (option: SelectOptionProps) => void;
  unregister: (value: string) => void;
} | null>(null);

const GroupContext = createContext<{ label: string } | null>(null);

function SelectBox<
  OptionType extends OptionTypeBase,
  IsMulti extends boolean,
  GroupType extends GroupTypeBase<OptionType>,
>({
  placeholder = 'Select...',
  disabled = false,
  value,
  onChange,
  variant = 'default',
  className,
  size = '1',
  id,
  selectRef,
  fluid,
  itemsPerScrollWindow = 4,
  ...rest
}: SelectProps & {
  selectRef?: Ref<SelectRef<OptionType, IsMulti, GroupType>>;
}) {
  const { responsive: responsiveFromFieldContext } = useFieldContext();
  const isFluid = !!(fluid || responsiveFromFieldContext);
  const [keyboardFocusEnabled, setKeyboardFocusEnabled] = useState(false);
  const [searchSelection, setSearchSelection] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [customPlaceholder, setPlaceholder] = useState(placeholder);
  const isDefaultVariant = variant === 'default';
  const [isMenuBottom, setIsMenuBottom] = useState(true);
  const internalSelectRef = useRef<
    ReactSelect<OptionType, IsMulti, GroupType> & {
      setState: (state: { menuIsOpen: boolean }) => void;
      state: { isOpen: boolean };
      select: {
        setValue: (option: SelectOptionProps) => void;
        clearValue: () => void;
      };
    }
  >(null);

  useImperativeHandle(
    selectRef,
    () => ({
      focus: () => {
        if (internalSelectRef.current) {
          internalSelectRef.current.focus();
        }
      },
      blur: () => {
        if (internalSelectRef.current) {
          internalSelectRef.current.blur();
        }
      },
      select: internalSelectRef.current,
      openMenu: () => {
        if (internalSelectRef.current) {
          internalSelectRef.current.setState({ menuIsOpen: true });
        }
      },
      closeMenu: () => {
        if (internalSelectRef.current) {
          internalSelectRef.current.setState({ menuIsOpen: false });
        }
      },
      setValue: (newValue: string) => {
        if (internalSelectRef.current) {
          const option = options.find((opt) => opt.value === newValue);
          if (option) {
            internalSelectRef.current.select.setValue(option);
          }
        }
      },
      clearValue: () => {
        if (internalSelectRef.current && internalSelectRef.current.select) {
          internalSelectRef.current.select.clearValue();
        }
      },
    }),
    [internalSelectRef],
  );

  const options = useOptions();
  // The flat list stays the source of truth -- every lookup by value, and the
  // search threshold, must count real options rather than headings.
  const { groupedOptions, groupIndexByLabel } = useMemo(
    () => groupOptions(options),
    [options],
  );
  const groupIdPrefix = useId();

  const handleChange = (option: SelectOptionProps) => {
    const newValue = option ? option.value : '';
    if (onChange && typeof onChange === 'function' && newValue !== value) {
      onChange(newValue);
    }

    if (options && options.length > NOPT_SEARCH && internalSelectRef.current) {
      internalSelectRef.current.blur();
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
      !isEmptyStringInOptions &&
      value === '' &&
      internalSelectRef.current &&
      internalSelectRef.current.select
    ) {
      internalSelectRef.current.select.clearValue();
    }
  }, [value, isEmptyStringInOptions]);

  return (
    <ScrollbarWrapper>
      {/* Consume Enter so react-select (which renders a real <input>) doesn't
          trigger the browser's implicit <form> submission. display:contents
          keeps this wrapper out of layout — no box, no width/flex impact. */}
      <div
        style={{ display: 'contents' }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') event.preventDefault();
        }}
      >
        {options && (
          <SelectStyle
            inputId={id}
            className={['sc-select', className].join(' ')}
            classNamePrefix="sc-select"
            name="sc-select"
            value={
              searchSelection || options.find((opt) => opt.value === value)
            }
            inputValue={options.length > NOPT_SEARCH ? searchValue : undefined}
            selectedOption={options.find((opt) => opt.value === value)}
            keyboardFocusEnabled={keyboardFocusEnabled}
            options={groupedOptions}
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
            itemsPerScrollWindow={itemsPerScrollWindow}
            groupIdPrefix={groupIdPrefix}
            groupIndexByLabel={groupIndexByLabel}
            onChange={handleChange}
            onInputChange={handleSearchInput}
            // styled-components v6 types the wrapped react-select ref as its
            // StateManager instance; internalSelectRef is typed against the inner
            // Select. The runtime ref is unchanged from v5 — this is a type-only cast.
            ref={
              internalSelectRef as unknown as ComponentProps<
                typeof SelectStyle
              >['ref']
            }
            isMenuBottom={isMenuBottom}
            setIsMenuBottom={setIsMenuBottom}
            onBlur={rest.onBlur}
            onFocus={rest.onFocus}
            onMenuClose={() => setKeyboardFocusEnabled(false)}
            onKeyDown={(event: KeyboardEvent) => {
              if (
                event &&
                event.key === 'Enter' &&
                internalSelectRef.current &&
                !internalSelectRef.current.state.isOpen
              ) {
                internalSelectRef.current.setState({
                  menuIsOpen: true,
                });
              } else {
                setKeyboardFocusEnabled(true);
              }
            }}
            width={convertSizeToRem(size)}
            fluid={isFluid}
            {...rest}
          />
        )}
      </div>
    </ScrollbarWrapper>
  );
}

const SelectWithOptionContext = forwardRef<
  SelectRef<OptionTypeBase, boolean, GroupTypeBase<OptionTypeBase>>,
  SelectProps
>((props, ref) => {
  const [options, setOptions] = useState<Record<string, SelectOptionProps>>({});

  const register = useCallback((option: SelectOptionProps) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option.value]: option,
    }));
  }, []);

  const unregister = useCallback((value: string) => {
    setOptions((prevOptions) => {
      const { [value]: _, ...rest } = prevOptions;
      return rest;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      options,
      register,
      unregister,
    }),
    [options, register, unregister],
  );

  return (
    <OptionContext.Provider value={contextValue}>
      <>
        <SelectBox {...props} selectRef={ref} />
        {props.children}
      </>
    </OptionContext.Provider>
  );
}) as SelectComponentType<
  OptionTypeBase,
  boolean,
  GroupTypeBase<OptionTypeBase>
>;

SelectWithOptionContext.displayName = 'Select';
SelectWithOptionContext.Option = Option;
SelectWithOptionContext.Group = Group;
export const Select = SelectWithOptionContext;
