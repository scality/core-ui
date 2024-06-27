import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SearchInput, Props } from './SearchInput.component';
import { QueryClient, QueryClientProvider } from 'react-query';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

const SearchInputRender = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchInput {...props} />
    </QueryClientProvider>
  );
};

describe('SearchInput', () => {
  const selectors = {
    searchInput: () => screen.getByRole('searchbox'),
    //? queryBy is used to avoid the error when the element is not found
    clearButton: () => screen.queryByRole('button'),
  };
  it('should render the SearchInput component', () => {
    render(<SearchInputRender value="" onChange={() => {}} />);

    const searchInput = selectors.searchInput();
    expect(searchInput).toBeInTheDocument();
  });

  it('should render the SearchInput component with placeholder', () => {
    render(
      <SearchInputRender value="" onChange={() => {}} placeholder="Search" />,
    );

    const searchInput = screen.queryByPlaceholderText('Example: Search');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render the SearchInput component with disabled prop', () => {
    render(<SearchInputRender value="" onChange={() => {}} disabled />);

    const searchInput = selectors.searchInput();
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toBeDisabled();
  });

  it('should change value instantly but call the onChange function with a 300ms delay after the end of typing', async () => {
    const onChange = jest.fn();
    render(<SearchInputRender value="" onChange={onChange} />);
    const searchInput = selectors.searchInput();
    userEvent.type(searchInput, 'test');
    expect(searchInput).toHaveValue('test');
    expect(onChange).not.toHaveBeenCalled();
    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalled();
      },
      { timeout: 350 },
    );
  });

  it('should have a clear button when the input is not empty', () => {
    render(<SearchInputRender value="" onChange={() => {}} />);

    // clear button should not be rendered as value is empty
    let clearButton = selectors.clearButton();
    expect(clearButton).not.toBeInTheDocument();

    const searchInput = selectors.searchInput();
    userEvent.type(searchInput, 'test');

    // clear button should now be rendered
    clearButton = selectors.clearButton();
    expect(clearButton).toBeInTheDocument();
  });

  it('should call the onReset function when the clear button is clicked and clear the input value', async () => {
    const onReset = jest.fn();
    render(
      <SearchInputRender value="test" onChange={() => {}} onReset={onReset} />,
    );
    const searchInput = selectors.searchInput();
    const clearButton = selectors.clearButton();
    expect(clearButton).toBeInTheDocument();
    clearButton && userEvent.click(clearButton);
    expect(onReset).toHaveBeenCalled();
    expect(searchInput).toHaveValue('');
  });

  // ? Should we test the autocomplete prop? (It is a browser feature so should be no)
  // ? Should the clear button be hidden/disabled when the input is disabled?
  // ? And should the text be greyed out?
});
