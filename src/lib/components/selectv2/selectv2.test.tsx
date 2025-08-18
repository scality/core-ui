import { act, screen, render as testingRender, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState, useRef } from 'react';
import { Option, Select, SelectRef } from '../selectv2/Selectv2.component';

const render = (args) => {
  return testingRender(args);
};

const generateOptionsData = (n: number) =>
  Array.from(new Array(n), (_, index) => ({
    label: `Item ${index}`,
    value: index.toString(),
    'data-testid': `option${index}`,
  }));

const generateOptions = (n: number) => {
  return generateOptionsData(n).map((o, i) => (
    <Option key={i} {...o} value={o.value}>
      {o.label}
    </Option>
  ));
};
const optionsWithScrollSearchBar = generateOptions(10); // more than 8 options should display searchbar + scrollbar

const simpleOptions = generateOptions(4); // less than 5 options should not displays any scroll/search bar

const SelectWrapper = (props) => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Select value={value} onChange={(value) => setValue(value)} {...props}>
      {props.children || simpleOptions}
    </Select>
  );
};

const SelectReset = (props) => {
  const [value, setValue] = useState('default');

  const handleChange = (value) => {
    setValue(value);
  };
  return (
    <>
      <button onClick={() => setValue('')}>reset</button>
      <Select value={value} onChange={handleChange} {...props}>
        {props.children}
      </Select>
    </>
  );
};

describe('SelectV2', () => {
  const selectors = {
    option: (name: string | RegExp) => screen.getByRole('option', { name }),
    options: () => screen.queryAllByRole('option'),
    select: (withSearch?: boolean, name?: string) => {
      if (withSearch) {
        return screen.getByRole('combobox', { name });
      }
      return screen.getByRole('listbox', { name });
    },
    input: () => screen.getByRole('textbox'),
    noOptions: () => screen.getByText(/No options/i),
    highlightedText: () => screen.getByRole('mark'),
  };

  it('should throw error if <Option/> is outside <Select/>', () => {
    expect(() => render(<Option value="Option 1" />)).toThrowError();
  });

  it('should open/close on click', async () => {
    render(<SelectWrapper />);
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));
    const select = selectors.select();
    expect(select).toBeInTheDocument();
    let options = selectors.options();
    expect(options).toHaveLength(0);

    // should open on click
    await act(() => userEvent.click(select));
    simpleOptions.forEach((opt) => {
      const option = selectors.option(opt.props.label);
      expect(option).toBeInTheDocument();
    });

    await act(() => userEvent.click(select));
    options = selectors.options();
    expect(options).toHaveLength(0);
  });

  it('should open/close with keyboard', async () => {
    render(<SelectWrapper />);
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));
    const select = selectors.select();
    expect(select).toBeInTheDocument();
    const options = selectors.options();
    expect(options).toHaveLength(0);

    // should open on Enter
    userEvent.tab();
    await act(() => userEvent.keyboard('{Enter}'));
    simpleOptions.forEach((opt) => {
      const option = selectors.option(opt.props.label);
      expect(option).toBeInTheDocument();
    });

    // should close on Enter
    userEvent.keyboard('{Enter}');
    expect(options).toHaveLength(0);

    // should open on ArrowDown
    userEvent.tab();
    userEvent.keyboard('{ArrowDown}');
    simpleOptions.forEach((opt) => {
      const option = selectors.option(opt.props.label);
      expect(option).toBeInTheDocument();
    });
  });

  it('should display custom placeholder', async () => {
    const placeholder = 'My placeholder...';
    render(<SelectWrapper placeholder={placeholder} />);
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));
    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  it('should be disabled', async () => {
    render(
      <SelectWrapper value="1" disabled={true}>
        {simpleOptions}
      </SelectWrapper>,
    );
    userEvent.tab();
    const select = selectors.select();
    expect(select).not.toHaveFocus();
    // use input instead of select because select will still trigger the open/close action
    // despite select container not being clickable and input being disabled
    const input = selectors.input();
    await act(() => userEvent.click(input));
    const options = selectors.options();
    expect(options).toHaveLength(0);
  });

  it('should display no option', async () => {
    render(
      <SelectWrapper>
        <></>
      </SelectWrapper>,
    );
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));
    const select = selectors.select();
    await act(() => userEvent.click(select));
    const noOptions = selectors.noOptions();
    expect(noOptions).toBeInTheDocument();
  });

  it('should filter and highlight on search', async () => {
    render(<SelectWrapper>{optionsWithScrollSearchBar} </SelectWrapper>);
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));
    const select = selectors.select(true);
    await act(() => userEvent.click(select));
    const input = selectors.input();

    userEvent.type(input, '2');
    const options = selectors.options();
    expect(options).toHaveLength(1);
    const searchedText = selectors.highlightedText();
    expect(searchedText).toHaveTextContent('2');
  });

  it('should unfocus the search input when the select is closed', async () => {
    render(<SelectWrapper>{optionsWithScrollSearchBar} </SelectWrapper>);
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));
    const select = selectors.select(true);
    await act(() => userEvent.click(select));
    let input = selectors.input();
    expect(input).toHaveFocus();
    const option = selectors.option(/Item 1/);
    await act(() => userEvent.click(option));
    input = selectors.input();
    expect(input).not.toHaveFocus();
  });

  it('should be possible to use searchbar when option is selected', async () => {
    render(
      <SelectWrapper value="1">{optionsWithScrollSearchBar}</SelectWrapper>,
    );
    expect(screen.getByText(/Item 1/)).toBeVisible();
    const select = selectors.select(true);
    await act(() => userEvent.click(select));
    const input = selectors.input();
    userEvent.type(input, '2');
    expect(screen.queryByText(/Item 1/)).not.toBeInTheDocument();
    const options = selectors.options();
    expect(options).toHaveLength(1);
  });

  it('should select/unselect option with keyboard', async () => {
    render(<SelectWrapper />);
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));
    const select = selectors.select();
    userEvent.tab();
    act(() => userEvent.keyboard('{ArrowDown}'));

    // should select first option
    await act(() => userEvent.keyboard('{Enter}'));
    expect(select).toHaveTextContent('Item 0');

    // should select second option
    userEvent.tab();
    await act(() => userEvent.keyboard('{ArrowDown}'));
    await act(() => userEvent.keyboard('{ArrowDown}'));

    await act(() => userEvent.keyboard('{Enter}'));
    expect(select).toHaveTextContent('Item 1');
  });

  it('should scroll to selected value when opening select', async () => {
    render(
      <SelectWrapper value={optionsWithScrollSearchBar[9].props.value}>
        {optionsWithScrollSearchBar}
      </SelectWrapper>,
    );
    const select = selectors.select(true);
    await act(() => userEvent.click(select));
    const option = selectors.option(/Item 9/);
    expect(screen.queryByRole('option', { name: /Item 1/i })).toBeNull();
    expect(option).toBeVisible();
  });

  it('should be able to reset the value', async () => {
    render(<SelectReset>{simpleOptions}</SelectReset>);
    const button = screen.getByText(/reset/);
    await act(() => userEvent.click(button));
    const select = selectors.select();
    expect(select).toHaveTextContent('Select...');
  });

  it('should not be possible to select an option if it is disabled', async () => {
    render(
      <SelectWrapper>
        <Option value="1" disabled>
          Item 1
        </Option>
        <Option value="2">Item 2</Option>
      </SelectWrapper>,
    );
    const select = selectors.select();
    await act(() => userEvent.click(select));
    const option = selectors.option(/Item 1/);

    await act(() => userEvent.click(option));
    const option2 = selectors.option(/Item 2/);
    expect(option2).toBeVisible();
  });

  it('should display a tooltip if the option is disabled with a reason', async () => {
    render(
      <SelectWrapper>
        <Option value="1" disabled disabledReason="This option is disabled">
          Item 1
        </Option>
      </SelectWrapper>,
    );
    const select = selectors.select();
    await act(() => userEvent.click(select));
    const option = selectors.option(/Item 1/);
    expect(option).toHaveAttribute('aria-disabled', 'true');
    await act(() => userEvent.hover(option));
    const tooltip = screen.getByText(/This option is disabled/);
    expect(tooltip).toBeInTheDocument();
  });

  it('should select with the right selector', async () => {
    const accounts = [
      {
        name: 'Account 1',
      },
      {
        name: 'Account 2',
      },
    ];

    const MyWrapper = () => {
      const [value, setValue] = useState('');
      return (
        <Select
          id="select-account"
          value={value}
          onChange={(accountName) => {
            setValue(accountName);
          }}
          size="1/2"
          placeholder="Select Account"
        >
          {accounts.map((account) => (
            <Select.Option key={`${account.name}`} value={account.name}>
              {account.name}
            </Select.Option>
          ))}
        </Select>
      );
    };

    render(<MyWrapper />);

    // If you only have one select, you can use the role, otherwise, you should use the label
    // screen.getByLabelText(/select account/i)
    // In a normal select, we should have a label span attach to it.
    // It's not our case here, so it makes thing difficult to select the right select
    // I workaround this by using setting the aria-label to the select container (cf: test below)
    const singleSelect = screen.getByRole('listbox');
    await act(() => userEvent.click(singleSelect));

    await act(() => userEvent.click(screen.getByRole('option', { name: /account 1/i })));
  });

  it('should be testable if we have several select', async () => {
    const MyWrapperWith2Select = () => {
      const [value, setValue] = useState('');
      const [value2, setValue2] = useState('');
      const accounts = [
        {
          name: 'Account 1',
        },
        {
          name: 'Account 2',
        },
      ];
      const users = [
        {
          name: 'User 1',
        },
        {
          name: 'User 2',
        },
      ];
      return (
        <div>
          <Select
            id="select-account"
            value={value}
            onChange={(accountName) => {
              setValue(accountName);
            }}
            size="1/2"
            placeholder="Select Account"
          >
            {accounts.map((account) => (
              <Select.Option key={`${account.name}`} value={account.name}>
                {account.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            id="select-user"
            value={value2}
            onChange={(accountName) => {
              setValue2(accountName);
            }}
            size="1/2"
            placeholder="Select User"
          >
            {users.map((user) => (
              <Select.Option key={`${user.name}`} value={user.name}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      );
    };

    render(<MyWrapperWith2Select />);

    await act(() => userEvent.click(screen.getByLabelText(/select account/i)));

    await act(() => userEvent.click(screen.getByRole('option', { name: /account 1/i })));

    await act(() => userEvent.click(screen.getByLabelText(/select user/i)));

    await act(() => userEvent.click(screen.getByRole('option', { name: /user 1/i })));
  });

  it('should be testable even if we have several select with the same value, the placeholder should be different', async () => {
    const MyWrapperWith2Select = () => {
      const [value, setValue] = useState('');
      const [value2, setValue2] = useState('');
      const accounts = [
        {
          name: 'Account 1',
        },
        {
          name: 'Account 2',
        },
      ];
      const accounts2 = [
        {
          name: 'Account 1',
        },
        {
          name: 'Account 2',
        },
      ];
      return (
        <div style={{ display: 'flex' }}>
          <Select
            id="select-account"
            value={value}
            onChange={(accountName) => {
              setValue(accountName);
            }}
            size="1/2"
            placeholder="Select Account"
          >
            {accounts.map((account) => (
              <Select.Option key={`${account.name}`} value={account.name}>
                {account.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            id="select-account2"
            value={value2}
            onChange={(accountName) => {
              setValue2(accountName);
            }}
            size="1"
            placeholder="Select Second Account"
          >
            {accounts2.map((user) => (
              <Select.Option key={`${user.name}`} value={user.name}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      );
    };

    render(<MyWrapperWith2Select />);

    await act(() => userEvent.click(screen.getByLabelText(/select account/i)));
    await act(() => userEvent.click(screen.getByLabelText(/Select Second Account/i)));

    /**
     * This is possible because only 1 select can be open at a time
     * If for some reason, you have multiple select open at the same time, you can select the select by its label
     * and check the option from it parent like this :
     * const select = screen.getByLabelText(/select account/i);
     * const selectContainer = select?.parentElement?.parentElement;
     * const option = within(selectContainer).getByRole('option', { name: /account 1/i });
     */
    await act(() => userEvent.click(screen.getByRole('option', { name: /account 1/i })));
  });

  describe('Ref API', () => {
    it('should expose focus method via ref', async () => {
      const RefTestComponent = () => {
        const selectRef = useRef<SelectRef>(null);
        const [value, setValue] = useState<string>('');

        return (
          <div>
            <button onClick={() => selectRef.current?.focus()}>Focus</button>
            <Select
              id="ref-test"
              value={value}
              onChange={(value) => setValue(value)}
              ref={selectRef}
              placeholder="Select with ref"
            >
              {simpleOptions}
            </Select>
          </div>
        );
      };

      render(<RefTestComponent />);
      expect(selectors.input()).not.toHaveFocus();

      await act(() => userEvent.click(screen.getByRole('button', { name: /Focus/i })));
      expect(selectors.input()).toHaveFocus();
    });

    it('should expose openMenu and closeMenu methods via ref', async () => {
      const RefTestComponent = () => {
        const selectRef = useRef<SelectRef>(null);
        const [value, setValue] = useState<string>('');

        return (
          <div>
            <button onClick={() => selectRef.current?.openMenu()}>
              Open Menu
            </button>
            <button onClick={() => selectRef.current?.closeMenu()}>
              Close Menu
            </button>
            <Select
              id="ref-test"
              value={value}
              onChange={(value) => setValue(value)}
              ref={selectRef}
              placeholder="Select with ref"
            >
              {simpleOptions}
            </Select>
          </div>
        );
      };

      render(<RefTestComponent />);
      expect(selectors.options()).toHaveLength(0);

      await act(() => userEvent.click(screen.getByRole('button', { name: /Open Menu/i })));
      expect(selectors.options().length).toBeGreaterThan(0);
      simpleOptions.forEach((opt) => {
        const option = selectors.option(opt.props.label);
        expect(option).toBeInTheDocument();
      });

      await act(() => userEvent.click(screen.getByRole('button', { name: /Close Menu/i })));
      expect(selectors.options()).toHaveLength(0);
    });

    it('should expose setValue and clearValue methods via ref', async () => {
      const handleChange = jest.fn();

      const RefTestComponent = () => {
        const [value, setValue] = useState('');
        const selectRef = useRef<SelectRef>(null);

        return (
          <div>
            <button
              onClick={() => {
                selectRef.current?.setValue('0');
                setValue('0');
              }}
            >
              Set Value
            </button>
            <button
              onClick={() => {
                selectRef.current?.clearValue();
                setValue('');
              }}
            >
              Clear
            </button>
            <Select
              id="ref-test"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                handleChange(newValue);
              }}
              ref={selectRef}
              placeholder="Select with ref"
            >
              {simpleOptions}
            </Select>
          </div>
        );
      };

      render(<RefTestComponent />);

      let select;
      await act(() => {
        select = selectors.select();
      });
      expect(select).toHaveTextContent('Select with ref');

      await act(() => userEvent.click(screen.getByRole('button', { name: /Set Value/i })));
      expect(select).toHaveTextContent('Item 0');

      await act(() => userEvent.click(screen.getByRole('button', { name: /Clear/i })));
      expect(select).toHaveTextContent('Select with ref');
    });

    it('should expose blur method via ref', async () => {
      const RefTestComponent = () => {
        const selectRef = useRef<SelectRef>(null);
        const [value, setValue] = useState<string>('');

        return (
          <div>
            <button onClick={() => selectRef.current?.focus()}>Focus</button>
            <button onClick={() => selectRef.current?.blur()}>Blur</button>
            <Select
              id="ref-test"
              value={value}
              onChange={(value) => setValue(value)}
              ref={selectRef}
              placeholder="Select with ref"
            >
              {simpleOptions}
            </Select>
          </div>
        );
      };

      render(<RefTestComponent />);

      await act(() => userEvent.click(screen.getByRole('button', { name: /Focus/i })));
      expect(selectors.input()).toHaveFocus();

      await act(() => userEvent.click(screen.getByRole('button', { name: /Blur/i })));
      expect(selectors.input()).not.toHaveFocus();
    });
  });
});
