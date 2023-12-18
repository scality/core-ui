import {
  HealthSelector,
  optionsDefaultConfiguration,
} from './HealthSelector.component';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getWrapper } from '../../testUtils';
describe('HealthSelector', () => {
  it('should display correctly without any props and select first option', () => {
    const { Wrapper } = getWrapper();
    const { getByText } = render(
      <Wrapper>
        <HealthSelector id="health" onChange={() => {}} />
      </Wrapper>,
    );
    const input = screen.getByRole('textbox');

    // open the menu
    userEvent.click(input);
    const healthyOption = getByText(/healthy/i);
    expect(healthyOption).toBeInTheDocument();
  });
  it('should call the onChange function when it change', () => {
    const { Wrapper } = getWrapper();
    const onChange = jest.fn();
    const { getByText } = render(
      <Wrapper>
        <HealthSelector id="health" onChange={onChange} />
      </Wrapper>,
    );
    const input = screen.getByRole('textbox');
    userEvent.click(input);
    const warningOption = getByText(/warning/i);
    userEvent.click(warningOption);
    expect(onChange).toHaveBeenCalledWith('warning');
  });
  it('should not display hidden options', () => {
    const { Wrapper } = getWrapper();
    const { queryByText } = render(
      <Wrapper>
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
      </Wrapper>,
    );

    // open the menu
    const input = screen.getByRole('textbox');
    userEvent.click(input);
    const healthyOption = queryByText(/healthy/i);
    expect(healthyOption).not.toBeInTheDocument();
  });
});
