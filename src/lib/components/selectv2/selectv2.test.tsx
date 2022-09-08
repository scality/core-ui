import { Select, Option } from '../selectv2/Selectv2.component';
import React, { useState } from 'react';
import { render as testingRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Icon } from '../icon/Icon.component';
import { QueryClient, QueryClientProvider } from 'react-query';

const render = (...args) => {
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
    <Option key={i} value={o.value} {...o}>
      {o.label}
    </Option>
  ));
};

const SelectWrapper = (props) => {
  const [value, setValue] = useState(null);
  return (
    <Select value={value} onChange={(value) => setValue(value)} {...props}>
      {props.children}
    </Select>
  );
};

const variants = ['default', 'rounded'];
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
  const toBeClose = (container) => {
    expect(container.getElementsByClassName('sc-select__option').length).toBe(
      0,
    );
  };

  const toBeOpenWith = (container, optionsLength: number) => {
    expect(container.getElementsByClassName('sc-select__option').length).toBe(
      optionsLength,
    );
  };

  const toggleSelect = (container) => {
    userEvent.click(container.querySelector('.sc-select__control'));
  };

  test.each(variants)(
    'should open select on click/Enter/ArrowDown',
    (variant) => {
      const { container } = render(
        <SelectWrapper variant={variant}>{simpleOptions}</SelectWrapper>,
      );
      // should open on click
      toBeClose(container);
      toggleSelect(container); // open

      toBeOpenWith(container, simpleOptions.length);
      toggleSelect(container); // close

      userEvent.tab(); // remove focus

      // should open with Enter/ArrowDown
      ['Enter', 'ArrowDown'].forEach((key) => {
        // should open on arrow down
        toBeClose(container);
        userEvent.tab(); // focus

        userEvent.keyboard(`{${key}}`);
        toBeOpenWith(container, simpleOptions.length);
        toggleSelect(container); // close select

        toBeClose(container);
        userEvent.tab(); // remove focus
      });
    },
  );
  test.each(variants)('should display custom placeholder', (variant) => {
    const placeholder = 'My placeholder...';
    const { container } = render(
      <SelectWrapper variant={variant} placeholder={placeholder}>
        {simpleOptions}
      </SelectWrapper>,
    );
    expect(
      container.querySelector('.sc-select__placeholder'),
    ).toHaveTextContent(placeholder);
  });
  test.each(variants)('should display default value', (variant) => {
    const options = [
      {
        value: 0,
        label: 'Label 0',
      },
    ];
    const { container } = render(
      <Select variant={variant} defaultValue={options[0]} options={options} />,
    );
    expect(container.querySelector('.sc-select__placeholder')).toBeNull();
    expect(
      container.querySelector('.sc-select__single-value'),
    ).toHaveTextContent('Label 0');
  });
  test.each(variants)('select should be disabled', (variant) => {
    const { container } = render(
      <Select variant={variant} disabled defaultValue="0">
        <Option value="0">{'Label 0'}</Option>
      </Select>,
    );
    expect(container.querySelector('input')).toBeDisabled();
  });
  test.each(variants)('should display no options', (variant) => {
    const { container } = render(<Select variant={variant} />);
    toggleSelect(container, variant);
    expect(
      container.querySelector('.sc-select__menu-notice--no-options'),
    ).toHaveTextContent('No options');
  });
  test.each(variants)(
    'should display a search bar if more than 8 options',
    (variant) => {
      const { container } = render(
        <SelectWrapper variant={variant}>
          {optionsWithScrollSearchBar}
        </SelectWrapper>,
      );
      expect(container.querySelector('.sc-select__input')).not.toBeNull();
    },
  );
  test.each(variants)('should display option', (variant) => {
    const { container, getByTestId } = render(
      <Select variant={variant}>
        <Option data-testid="disabledOption" value="0" disabled>
          Label 1
        </Option>
        <Option
          data-testid="option2"
          value="1"
          icon={<Icon name="Deletion-marker" />}
        >
          Label 2
        </Option>
      </Select>,
    );
    toggleSelect(container);
    expect(getByTestId('disabledOption')).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    const icon = getByTestId('option2').querySelector('i');
    expect(icon).not.toBeNull();
    expect(icon).toHaveAttribute('aria-label', 'Deletion-marker ');
  });
  test.each(variants)(
    '<Option/> component should throw if outside <Select/>',
    () => {
      // mock console.error to not display error message on throw
      jest.spyOn(console, 'error');
      console.error.mockImplementation(() => {});
      expect(() => render(<Option />)).toThrowError();
      console.error.mockRestore(); // restore console.error
    },
  );
  test.each(variants)('should highlight text on search', (variant) => {
    const { container, getByTestId } = render(
      <SelectWrapper variant={variant}>
        {optionsWithScrollSearchBar}
      </SelectWrapper>,
    );
    toggleSelect(container);
    userEvent.type(container.querySelector('input'), 'Ite');
    const firstOption = getByTestId('option0');
    expect(firstOption).toHaveClass('sc-select__option--is-focused');
    expect(
      container.querySelector('.sc-highlighted-matching-text'),
    ).toHaveTextContent('Ite');
  });
  test.each(variants)('should select/unselect option', (variant) => {
    const { container, getByTestId } = render(
      <SelectWrapper variant={variant}>{simpleOptions}</SelectWrapper>,
    );
    // select option
    toggleSelect(container); // open select

    toBeOpenWith(container, simpleOptions.length);
    userEvent.click(getByTestId('option0'));
    toBeClose(container); // selecting an option should close select

    // unselect option
    toggleSelect(container); // reopen select

    expect(getByTestId('option0')).toHaveClass(
      'sc-select__option--is-selected',
    );
    // should be focused on the selected option
    expect(getByTestId('option0')).toHaveAttribute('aria-selected', 'true');
    userEvent.click(getByTestId('option1')); // click on another option

    toBeClose(container); // selecting an option should close select

    toggleSelect(container); // reopen select

    expect(getByTestId('option1')).toHaveClass(
      'sc-select__option--is-selected',
    );
    expect(getByTestId('option1')).toHaveAttribute('aria-selected', 'true');
    expect(getByTestId('option0')).not.toHaveClass(
      'sc-select__option--is-selected',
    );
    expect(getByTestId('option0')).not.toHaveAttribute('aria-selected', 'true');
  });
  test.each(variants)('should focus on keyDown/keyUp', (variant) => {
    const { container, getByTestId } = render(
      <SelectWrapper variant={variant}>{simpleOptions}</SelectWrapper>,
    );
    toggleSelect(container);
    userEvent.keyboard('{ArrowDown}');
    expect(getByTestId('option0')).not.toHaveClass(
      'sc-select__option--is-focused',
    );
    expect(getByTestId('option1')).toHaveClass('sc-select__option--is-focused');
    userEvent.keyboard('{ArrowUp}');
    expect(getByTestId('option0')).toHaveClass('sc-select__option--is-focused');
    expect(getByTestId('option1')).not.toHaveClass(
      'sc-select__option--is-focused',
    );
  });
  test.each(variants)('should be able to reset the value', (variant) => {
    const { container } = render(
      <SelectReset variant={variant}>{simpleOptions}</SelectReset>,
    );
    userEvent.click(container.querySelector('button'));
    expect(
      container.querySelector('.sc-select__placeholder'),
    ).toHaveTextContent('Select...');
  });
});
