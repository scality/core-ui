import { screen, render as testingRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Option, Select } from '../selectv2/Selectv2.component';

const render = (args) => {
  return testingRender(
    <QueryClientProvider client={new QueryClient()}>
      {args}
    </QueryClientProvider>,
  );
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
const users = [
  {
    label: 'User 1',
    value: '1',
  },
  {
    label: 'User 2',
    value: '2',
  },
];

const basicOptions = () => {
  return users.map((user, index) => (
    <Option key={index} value={user.value}>
      {user.label}
    </Option>
  ));
};
const SelectWrapper = (props) => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Select value={value} onChange={(value) => setValue(value)} {...props}>
      {props.children || basicOptions()}
    </Select>
  );
};

const optionsWithScrollSearchBar = generateOptions(10); // more than 8 options should display searchbar + scrollbar

const simpleOptions = generateOptions(4); // less than 5 options should not displays any scroll/search bar

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
  };

  it('should throw error if <Option/> is outside <Select/>', () => {
    expect(() => render(<Option value="Option 1" />)).toThrowError();
  });

  it('should open/close on click', () => {
    render(<SelectWrapper />);
    const select = selectors.select();
    expect(select).toBeInTheDocument();
    let options = selectors.options();
    expect(options).toHaveLength(0);

    // should open on click
    userEvent.click(select);
    users.forEach((user) => {
      const option = selectors.option(user.label);
      expect(option).toBeInTheDocument();
    });

    userEvent.click(select);
    options = selectors.options();
    expect(options).toHaveLength(0);
  });

  it('should open/close with keyboard', () => {
    render(<SelectWrapper />);
    const select = selectors.select();
    expect(select).toBeInTheDocument();
    const options = selectors.options();
    expect(options).toHaveLength(0);

    // should open on Enter
    userEvent.tab();
    userEvent.keyboard('{Enter}');
    users.forEach((user) => {
      const option = selectors.option(user.label);
      expect(option).toBeInTheDocument();
    });

    // should close on Enter
    userEvent.keyboard('{Enter}');
    expect(options).toHaveLength(0);

    // should open on ArrowDown
    userEvent.tab();
    userEvent.keyboard('{ArrowDown}');
    users.forEach((user) => {
      const option = selectors.option(user.label);
      expect(option).toBeInTheDocument();
    });
  });

  it('should display custom placeholder', () => {
    const placeholder = 'My placeholder...';
    render(<SelectWrapper placeholder={placeholder} />);
    const input = selectors.input();
    expect(input).toBeInTheDocument();
    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  // This test is failing as Select is not working as expected
  // TODO Work on Select component to display default value when it is defined and value is not
  it('should display default value', () => {
    const defaultUser = users[0];
    render(<SelectWrapper defaultValue={defaultUser.value} />);
    const select = selectors.select();
    expect(select).toHaveTextContent(defaultUser.label);
  });

  it('should be disabled', () => {
    render(<SelectWrapper disabled />);
    // select input instead of select as disabled attribute is on input
    const input = selectors.input();
    expect(input).toBeDisabled();
  });

  it('should display no option', () => {
    render(
      <SelectWrapper>
        <></>
      </SelectWrapper>,
    );
    const select = selectors.select();
    userEvent.click(select);
    const noOptions = selectors.noOptions();
    expect(noOptions).toBeInTheDocument();
  });

  it('should display a search bar if more than 8 options', () => {
    render(<SelectWrapper>{optionsWithScrollSearchBar} </SelectWrapper>);
    const select = selectors.select(true);
    userEvent.click(select);
    const input = selectors.input();
    // An input exists even when the search bar is not displayed with a readOnly attribute
    // Search bar input does not have the readOnly attribute and is focused at the opening of the select
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute('readOnly');
    expect(input).toHaveFocus();
  });

  it('should filter and highlight on search', () => {
    render(<SelectWrapper>{generateOptions(10)} </SelectWrapper>);
    const select = selectors.select(true);
    userEvent.click(select);
    const input = selectors.input();
    expect(input).toBeInTheDocument();
    userEvent.type(input, '2');

    const option = selectors.option(/2/);
    expect(option).toHaveTextContent('Item 2');
    // select with classname is the easiest way to test the highlight (as there is a lot of layer with no specific role)
    expect(
      option.querySelector('.sc-highlighted-matching-text'),
    ).toHaveTextContent('2');
  });

  it('should select/unselect option with keyboard', () => {
    render(<SelectWrapper></SelectWrapper>);
    const select = selectors.select();
    userEvent.tab();
    userEvent.keyboard('{ArrowDown}');
    let options = selectors.options();

    // select first option
    expect(options[0]).toHaveClass('sc-select__option--is-focused');
    userEvent.keyboard('{Enter}');
    expect(select).toHaveTextContent('User 1');

    // reopen select, the previous selected option should have selected class
    userEvent.tab();
    userEvent.keyboard('{ArrowDown}');
    userEvent.keyboard('{ArrowDown}');
    options = selectors.options();
    expect(options[0]).toHaveClass('sc-select__option--is-selected');
    expect(options[1]).toHaveClass('sc-select__option--is-focused');
    userEvent.keyboard('{Enter}');
    expect(select).toHaveTextContent('User 2');
  });

  it('should be able to reset the value', () => {
    render(<SelectReset>{simpleOptions}</SelectReset>);
    const button = screen.getByText(/reset/);
    userEvent.click(button);
    const select = selectors.select();
    expect(select).toHaveTextContent('Select...');
  });

  it('should not trigger onChange when defaultValue is empty string', () => {
    const onChange = jest.fn();
    render(
      <SelectWrapper
        id="test-select-empty-string"
        value={''}
        onChange={onChange}
        defaultValue=""
      />,
    );
    expect(onChange).toBeCalledTimes(0);
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
    await userEvent.click(singleSelect);

    await userEvent.click(screen.getByRole('option', { name: /account 1/i }));
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

    await userEvent.click(screen.getByLabelText(/select account/i));

    await userEvent.click(screen.getByRole('option', { name: /account 1/i }));

    await userEvent.click(screen.getByLabelText(/select user/i));

    await userEvent.click(screen.getByRole('option', { name: /user 1/i }));
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

    await userEvent.click(screen.getByLabelText(/select account/i));
    await userEvent.click(screen.getByLabelText(/Select Second Account/i));

    /**
     * This is possible because only 1 select can be open at a time
     * If for some reason, you have multiple select open at the same time, you can select the select by its label
     * and check the option from it parent like this :
     * const select = screen.getByLabelText(/select account/i);
     * const selectContainer = select?.parentElement?.parentElement;
     * const option = within(selectContainer).getByRole('option', { name: /account 1/i });
     */
    await userEvent.click(screen.getByRole('option', { name: /account 1/i }));
  });
});
