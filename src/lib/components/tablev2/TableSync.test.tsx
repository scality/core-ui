import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TableSync } from './TableSync';

describe('TableSync', () => {
  it('should render correctly', async () => {
    const onSync = jest.fn();
    render(
      <TableSync onSync={onSync} tooltipOverlay='sync' />
    );
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should call onSync when clicked', async () => {
    const onSync = jest.fn();
    render(
      <TableSync onSync={onSync} tooltipOverlay='sync' />
    );
    await waitFor(() => screen.queryAllByRole('img', { hidden: true }));

    const button = screen.getByRole('button');
    await act(() => fireEvent.click(button));
    expect(onSync).toHaveBeenCalledTimes(1);
  });
});
