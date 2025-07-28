import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { TableSync } from './TableSync';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('TableSync', () => {
  it('should render correctly', () => {
    const onSync = jest.fn();
    render(
      <QueryClientProvider client={new QueryClient()}>
        <TableSync onSync={onSync} />
      </QueryClientProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should call onSync when clicked', () => {
    const onSync = jest.fn();
    render(
      <QueryClientProvider client={new QueryClient()}>
        <TableSync onSync={onSync} />
      </QueryClientProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onSync).toHaveBeenCalledTimes(1);
  });
});
