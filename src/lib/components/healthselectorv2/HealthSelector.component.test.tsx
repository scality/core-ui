import {
  HealthSelector,
  optionsDefaultConfiguration,
} from './HealthSelector.component';
import { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getWrapper } from '../../testUtils';
describe('HealthSelector', () => {
  it('should display correctly without any props and select first option', async () => {
    const { Wrapper } = getWrapper();
    const { getByText } = render(
      <Wrapper>
        <HealthSelector id="health" onChange={() => {}} />
      </Wrapper>,
    );
    await waitFor(() => screen.findByRole('img', { hidden: true }));
    const input = screen.getByRole('textbox');

    // open the menu
    await act(() => userEvent.click(input));
    const healthyOption = getByText(/healthy/i);
    expect(healthyOption).toBeInTheDocument();
  });
  it('should call the onChange function when it change', async () => {
    const { Wrapper } = getWrapper();
    const onChange = jest.fn();
    const { getByText } = render(
      <Wrapper>
        <HealthSelector id="health" onChange={onChange} />
      </Wrapper>,
    );
    const input = screen.getByRole('textbox');
    await act(() => userEvent.click(input));
    const warningOption = getByText(/warning/i);
    await act(() => userEvent.click(warningOption));
    expect(onChange).toHaveBeenCalledWith('warning');
  });
  it('should not display hidden options', async () => {
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
    await act(() => userEvent.click(input));
    const healthyOption = queryByText(/healthy/i);
    expect(healthyOption).not.toBeInTheDocument();
  });
});
