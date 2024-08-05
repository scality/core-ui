import { render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { Props, Toggle } from './Toggle.component';
import userEvent from '@testing-library/user-event';

describe('Toggle', () => {
  const selectors = {
    toggle: () => screen.getByRole('checkbox'),
    label: (text: string | RegExp) => screen.getByText(text),
  };
  const RenderToggle = (props: Omit<Props, 'onChange' | 'toggle'>) => {
    const [toggle, setToggle] = useState<boolean>(false);
    const handleClick = () => {
      setToggle(!toggle);
    };
    return <Toggle {...props} toggle={toggle} onChange={handleClick} />;
  };

  it('should render the Toggle component with label', () => {
    render(<RenderToggle label="Test" />);
    const toggle = selectors.toggle();
    expect(toggle).toBeInTheDocument();
    const label = selectors.label(/Test/);
    expect(label).toBeInTheDocument();
  });

  it('should toggle the switch on click on checkbox or label', () => {
    render(<RenderToggle label="Test"></RenderToggle>);
    const toggle = selectors.toggle();
    userEvent.click(toggle);
    expect(toggle).toBeChecked();
    const label = selectors.label('Test');
    userEvent.click(label);
    expect(toggle).not.toBeChecked();
  });

  it('should toggle the switch when pressing the space key or enter key', () => {
    render(<RenderToggle />);
    const toggle = selectors.toggle();
    userEvent.tab();
    userEvent.keyboard('{space}');
    expect(toggle).toBeChecked();
    userEvent.keyboard('{enter}');
    expect(toggle).not.toBeChecked();
  });

  it('should not toggle the switch when disabled', () => {
    render(<RenderToggle disabled={true} />);
    const toggle = selectors.toggle();
    // toBeDisabled is not working for some reason
    userEvent.tab();
    expect(toggle).not.toHaveFocus();
    userEvent.click(toggle);
    expect(toggle).not.toBeChecked();
  });
});
