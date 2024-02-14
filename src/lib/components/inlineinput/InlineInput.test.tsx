import React, { PropsWithChildren } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  UseMutationResult,
} from 'react-query';
import { ToastProvider } from '../toast/ToastProvider';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InlineInput } from './InlineInput';

const queryClient = new QueryClient();
const Wrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ToastProvider>
  );
};

const ChangeMutationProvider = ({
  onChange,
  children,
}: {
  onChange: (value: string) => void;
  children: ({
    changeMutation,
  }: {
    changeMutation: UseMutationResult<unknown, unknown, { value: string }>;
  }) => JSX.Element;
}) => {
  const changeMutation = useMutation<unknown, unknown, { value: string }>({
    mutationFn: ({ value }) => {
      return new Promise((resolve) => {
        onChange(value);
        resolve(null);
      });
    },
  });
  return <>{children({ changeMutation })}</>;
};

const selectors = {
  confirmationModal: () => screen.getByRole('dialog', { name: /Confirm/i }),
};

describe('InlineInput', () => {
  describe('when the user clicks accepts the edit', () => {
    test('without confirmation modal', async () => {
      //S
      const mock = jest.fn();
      render(
        <ChangeMutationProvider onChange={mock}>
          {({ changeMutation }) => (
            <InlineInput
              id="test"
              defaultValue={'test'}
              changeMutation={changeMutation}
            />
          )}
        </ChangeMutationProvider>,
        { wrapper: Wrapper },
      );

      //E
      /// First focus the edit button
      await userEvent.tab();
      /// Then press enter to edit the input
      await userEvent.keyboard('{enter}');
      /// Then type a new value
      await userEvent.type(document.activeElement, 'new value');
      /// Then press enter to confirm the new value
      await userEvent.keyboard('{enter}');
      await waitForElementToBeRemoved(() => screen.getByRole('textbox'));

      //V
      expect(mock).toHaveBeenCalledWith('testnew value');
      expect(mock).toHaveBeenCalledTimes(1);
      expect(screen.getByText('testnew value')).toBeInTheDocument();
    });

    test('with confirmation modal', async () => {
      //S
      const mock = jest.fn();
      render(
        <ChangeMutationProvider onChange={mock}>
          {({ changeMutation }) => (
            <InlineInput
              id="test"
              defaultValue={'test'}
              changeMutation={changeMutation}
              confirmationModal={{
                title: <div>Confirm</div>,
                body: <div>Are you sure?</div>,
              }}
            />
          )}
        </ChangeMutationProvider>,
        { wrapper: Wrapper },
      );

      //E
      /// First focus the edit button
      await userEvent.tab();
      /// Then press enter to edit the input
      await userEvent.keyboard('{enter}');
      /// Then type a new value
      await userEvent.type(document.activeElement, 'new value');
      /// Then press enter to confirm the new value
      await userEvent.keyboard('{enter}');
      /// Expect the confirmation modal to be opened
      await waitFor(() =>
        expect(selectors.confirmationModal()).toBeInTheDocument(),
      );
      /// Click the confirm button
      await userEvent.click(screen.getByRole('button', { name: /confirm/i }));
      /// Wait for modal to be closed
      await waitForElementToBeRemoved(() => selectors.confirmationModal());

      //V
      expect(mock).toHaveBeenCalledWith('testnew value');
      expect(mock).toHaveBeenCalledTimes(1);
      expect(screen.getByText('testnew value')).toBeInTheDocument();
    });
  });

  describe('when the user clicks reset the edit', () => {
    test('without confirmation modal', async () => {
      //S
      const mock = jest.fn();
      render(
        <ChangeMutationProvider onChange={mock}>
          {({ changeMutation }) => (
            <InlineInput
              id="test"
              defaultValue={'test'}
              changeMutation={changeMutation}
            />
          )}
        </ChangeMutationProvider>,
        { wrapper: Wrapper },
      );

      //E
      /// First focus the edit button
      await userEvent.tab();
      /// Then press enter to edit the input
      await userEvent.keyboard('{enter}');
      /// Then type a new value
      await userEvent.type(document.activeElement, 'new value');
      /// Then press escape to cancel the new value
      await userEvent.keyboard('{esc}');

      //V
      expect(mock).not.toHaveBeenCalled();
      expect(screen.getByText('test')).toBeInTheDocument();
    });
    test('with confirmation modal', async () => {
      //S
      const mock = jest.fn();
      render(
        <ChangeMutationProvider onChange={mock}>
          {({ changeMutation }) => (
            <InlineInput
              id="test"
              defaultValue={'test'}
              changeMutation={changeMutation}
              confirmationModal={{
                title: <div>Confirm</div>,
                body: <div>Are you sure?</div>,
              }}
            />
          )}
        </ChangeMutationProvider>,
        { wrapper: Wrapper },
      );

      //E
      /// First focus the edit button
      await userEvent.tab();
      /// Then press enter to edit the input
      await userEvent.keyboard('{enter}');
      /// Then type a new value
      await userEvent.type(document.activeElement, 'new value');
      /// Then press enter to confirm the new value
      await userEvent.keyboard('{enter}');
      /// Expect the confirmation modal to be opened
      await waitFor(() =>
        expect(selectors.confirmationModal()).toBeInTheDocument(),
      );
      /// Click the cancel button
      await userEvent.click(
        within(selectors.confirmationModal()).getByRole('button', {
          name: /Cancel/i,
        }),
      );

      //V
      expect(mock).not.toHaveBeenCalled();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('textbox').value).toBe('testnew value');
    });
  });
});
