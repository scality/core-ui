import HealthSelector from './Healthselector.component'
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

describe('HealthSelector', () => {

 test('it should display the default health selector', () => { 

    const warningAction = jest.fn();

    const items = [
        {
          label: 'All',
          onClick: () => {},
          selected: true,
        },
        {
          label: 'Ok',
          onClick: () => {},
          selected: false,
        },
        {
          label: 'Warning',
          onClick: warningAction,
          selected: false,
        },
        {
          label: 'Critical',
          onClick: () => {},
          selected: false,
        },
      ];

      // verify that the default text is displayed
    const { getByText, queryByText } = render(<HealthSelector items={items} />);
    const selectorText = getByText(/all/i);
    expect(selectorText).toBeInTheDocument();

    // verify that the dropdown is not displayed
    let warningText = queryByText(/warning/i);
    let OkText = queryByText(/ok/i);
    expect(warningText).not.toBeInTheDocument();
    expect(OkText).not.toBeInTheDocument();
    // click on button and verify that the dropdown is displayed
    fireEvent.click(selectorText);
    warningText = getByText(/warning/i);
    OkText = getByText(/ok/i);
    expect(warningText).toBeInTheDocument();
    expect(OkText).toBeInTheDocument();

    // verify that action are called on click
    expect(warningAction).not.toHaveBeenCalled();
    fireEvent.click(warningText);
    expect(warningAction).toHaveBeenCalled();
 })

 test('it should display the default health selector without the ok item if the isOkHidden on', () => { 

    const warningAction = jest.fn();

    const items = [
        {
          label: 'All',
          onClick: () => {},
          selected: true,
        },
        {
          label: 'Ok',
          onClick: () => {},
          selected: false,
        },
        {
          label: 'Warning',
          onClick: warningAction,
          selected: false,
        },
        {
          label: 'Critical',
          onClick: () => {},
          selected: false,
        },
      ];

      // verify that the default text is displayed
    const { getByText, queryByText } = render(<HealthSelector items={items} isOkHidden />);
    const selectorText = getByText(/all/i);
    expect(selectorText).toBeInTheDocument();

    // verify that the dropdown is not displayed
    let warningText = queryByText(/warning/i);
    let OkText = queryByText(/ok/i);
    expect(warningText).not.toBeInTheDocument();
    expect(OkText).not.toBeInTheDocument();
    // click on button and verify that the dropdown is displayed without the ok item
    fireEvent.click(selectorText);
    warningText = getByText(/warning/i);
    OkText = queryByText(/ok/i);
    expect(warningText).toBeInTheDocument();
    expect(OkText).not.toBeInTheDocument();

    // verify that action are called on click
    expect(warningAction).not.toHaveBeenCalled();
    fireEvent.click(warningText);
    expect(warningAction).toHaveBeenCalled();
 })


});
