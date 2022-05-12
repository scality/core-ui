import {
  Healthselector,
  optionsDefaultConfiguration,
} from './HealthSelector.component';
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
describe('HealthSelector', () => {
  it('should display correctly without any props and select first option', () => {
    const { getByTestId, getByText } = render(<Healthselector />);
    expect(getByTestId('singleValueLabel')).toHaveTextContent(/Health/i);
    expect(getByTestId('singleValueShortLabel')).toHaveTextContent(/All/i);
    // open the menu
    const mainMenu = getByTestId('singleValueShortLabel');
    userEvent.click(mainMenu);
    const healthyOption = getByText(/healthy only/i);
    expect(healthyOption).toBeInTheDocument();
  });
  it('should call the onChange function when it change', () => {
    const onChange = jest.fn();
    const { getByTestId, getByText } = render(
      <Healthselector onChange={onChange} />,
    );
    const mainMenu = getByTestId('singleValueShortLabel');
    userEvent.click(mainMenu);
    const warningOption = getByText(/warning/i);
    userEvent.click(warningOption);
    expect(onChange).toHaveBeenCalledWith('warning');
  });
  it('should not display hidden options', () => {
    const { getByTestId, queryByText } = render(
      <Healthselector
        options={[
          optionsDefaultConfiguration.all,
          optionsDefaultConfiguration.warning,
          optionsDefaultConfiguration.critical,
          optionsDefaultConfiguration.unknown,
        ]}
      />,
    );
    // open the menu
    const mainMenu = getByTestId('singleValueShortLabel');
    userEvent.click(mainMenu);
    const healthyOption = queryByText(/healthy only/i);
    expect(healthyOption).not.toBeInTheDocument();
  });
});
