import {
  HealthSelector,
  optionsDefaultConfiguration,
} from './HealthSelector.component';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
describe('HealthSelector', () => {
  it('should display correctly without any props and select first option', () => {
    const { getByText } = render(
      <QueryClientProvider client={new QueryClient()}>
        <HealthSelector id="health" onChange={() => {}} />
      </QueryClientProvider>,
    );
    const input = screen.getByRole('textbox');

    // open the menu
    userEvent.click(input);
    const healthyOption = getByText(/healthy only/i);
    expect(healthyOption).toBeInTheDocument();
  });
  it('should call the onChange function when it change', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <QueryClientProvider client={new QueryClient()}>
        <HealthSelector id="health" onChange={onChange} />
      </QueryClientProvider>,
    );
    const input = screen.getByRole('textbox');
    userEvent.click(input);
    const warningOption = getByText(/warning/i);
    userEvent.click(warningOption);
    expect(onChange).toHaveBeenCalledWith('warning');
  });
  it('should not display hidden options', () => {
    const { queryByText } = render(
      <QueryClientProvider client={new QueryClient()}>
        <HealthSelector
          id="health"
          onChange={() => {}}
          options={[
            optionsDefaultConfiguration.all,
            optionsDefaultConfiguration.warning,
            optionsDefaultConfiguration.critical,
            optionsDefaultConfiguration.unknown,
          ]}
        />
      </QueryClientProvider>,
    );

    // open the menu
    const input = screen.getByRole('textbox');
    userEvent.click(input);
    const healthyOption = queryByText(/healthy only/i);
    expect(healthyOption).not.toBeInTheDocument();
  });
});
