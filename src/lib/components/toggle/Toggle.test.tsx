/**
 * - Test the Toggle component
 * - Should render the Toggle component
 * - Should render the Toggle component with a label
 * - Should toggle the switch on click
 * - Should toggle the switch when pressing the space key or enter key
 * - Should not toggle the switch when disabled
 * - Should not toggle the switch when disabled and pressing the space key or enter key
 *
 *
 *
 */
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Toggle } from './Toggle.component';

describe('Toggle', () => {
  let toggle = false;
  const handleClick = () => {
    toggle = !toggle;
  };
  beforeEach(() => {
    toggle = false;
  });
  it('should render the Toggle component with label', () => {
    render(<Toggle onChange={() => {}} toggle label="Test"></Toggle>);
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeInTheDocument();
    const label = screen.getByText('Test');
    expect(label).toBeInTheDocument();
  });

  it('should toggle the switch on click on checkbox or label', () => {
    render(
      <Toggle onChange={handleClick} toggle={toggle} label="Test"></Toggle>,
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(toggle).toBe(true);
    const label = screen.getByText('Test');
    fireEvent.click(label);
    expect(toggle).toBe(false);
  });

  it('should toggle the switch when pressing the space key or enter key', () => {
    render(
      <Toggle onChange={handleClick} toggle={toggle} label="Test"></Toggle>,
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.keyDown(checkbox, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(toggle).toBe(true);
    fireEvent.keyDown(checkbox, { key: ' ', code: 'Space', charCode: 32 });
    expect(toggle).toBe(false);
  });

  it('should not toggle the switch when disabled', () => {
    render(<Toggle onChange={() => {}} toggle disabled label="Test"></Toggle>);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(toggle).toBe(false);
    fireEvent.keyDown(checkbox, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(toggle).toBe(false);
  });
});
