import { PropsWithChildren, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  UseMutationResult,
} from 'react-query';
import {
  act,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CoreUiThemeProvider } from '../coreuithemeprovider/CoreUiThemeProvider';
import { coreUIAvailableThemes } from '../../style/theme';
import { ToastProvider } from '../toast/ToastProvider';
import { InlineInput } from './InlineInput';

const queryClient = new QueryClient();
const Wrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ToastProvider>
    </CoreUiThemeProvider>
  );
};

const MutationProvider = ({
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

const renderInlineInput = (
  ui: (args: {
    changeMutation: UseMutationResult<unknown, unknown, { value: string }>;
  }) => JSX.Element,
  onChange: jest.Mock = jest.fn(),
) => {
  render(
    <MutationProvider onChange={onChange}>
      {({ changeMutation }) => ui({ changeMutation })}
    </MutationProvider>,
    { wrapper: Wrapper },
  );
  return { onChange };
};

const openEditMode = async (currentValue = 'test') => {
  await userEvent.click(screen.getByRole('button', { name: /edit/i }));
  // input renders once isEditing becomes true
  await waitFor(() =>
    expect(screen.getByRole('textbox')).toHaveValue(currentValue),
  );
};

const typeNewValue = async (newValue: string) => {
  const input = screen.getByRole('textbox');
  await userEvent.clear(input);
  await userEvent.type(input, newValue);
};

describe('InlineInput', () => {
  it('renders the current value as a trigger in view mode', () => {
    renderInlineInput(({ changeMutation }) => (
      <InlineInput
        id="test"
        defaultValue="test"
        changeMutation={changeMutation}
      />
    ));
    expect(screen.getByRole('button', { name: /edit/i })).toHaveTextContent(
      'test',
    );
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  describe('submitting', () => {
    it('commits the new value on Enter (no modal)', async () => {
      const mock = jest.fn();
      renderInlineInput(
        ({ changeMutation }) => (
          <InlineInput
            id="test"
            defaultValue="test"
            changeMutation={changeMutation}
          />
        ),
        mock,
      );

      await openEditMode('test');
      await typeNewValue('new value');
      await act(() => userEvent.keyboard('{Enter}'));

      await waitFor(() =>
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument(),
      );
      expect(mock).toHaveBeenCalledWith('new value');
      expect(mock).toHaveBeenCalledTimes(1);
    });

    it('commits the new value on blur when value changed', async () => {
      const mock = jest.fn();
      renderInlineInput(
        ({ changeMutation }) => (
          <InlineInput
            id="test"
            defaultValue="test"
            changeMutation={changeMutation}
          />
        ),
        mock,
      );

      await openEditMode('test');
      await typeNewValue('renamed');
      await userEvent.tab();

      await waitFor(() => expect(mock).toHaveBeenCalledWith('renamed'));
    });

    it('does not commit on blur when value is unchanged', async () => {
      const mock = jest.fn();
      renderInlineInput(
        ({ changeMutation }) => (
          <InlineInput
            id="test"
            defaultValue="test"
            changeMutation={changeMutation}
          />
        ),
        mock,
      );

      await openEditMode('test');
      await userEvent.tab();

      expect(mock).not.toHaveBeenCalled();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });

  describe('cancelling', () => {
    it('reverts to the original value on Escape', async () => {
      const mock = jest.fn();
      renderInlineInput(
        ({ changeMutation }) => (
          <InlineInput
            id="test"
            defaultValue="test"
            changeMutation={changeMutation}
          />
        ),
        mock,
      );

      await openEditMode('test');
      await typeNewValue('new value');
      await act(() => userEvent.keyboard('{Escape}'));

      expect(mock).not.toHaveBeenCalled();
      expect(screen.getByRole('button', { name: /edit/i })).toHaveTextContent(
        'test',
      );
    });
  });

  describe('validation', () => {
    it('shows an error and blocks submit when check returns hasError', async () => {
      const mock = jest.fn();
      renderInlineInput(
        ({ changeMutation }) => (
          <InlineInput
            id="test"
            defaultValue="test"
            changeMutation={changeMutation}
            check={(value) =>
              value.length < 3
                ? { hasError: true, message: 'Too short' }
                : { hasError: false }
            }
          />
        ),
        mock,
      );

      await openEditMode('test');
      await typeNewValue('ab');
      expect(screen.getByText('Too short')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');

      await act(() => userEvent.keyboard('{Enter}'));
      expect(mock).not.toHaveBeenCalled();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders the error as an alert chip when helperTextPlacement is "bottom"', async () => {
      renderInlineInput(({ changeMutation }) => (
        <InlineInput
          id="test"
          defaultValue="test"
          changeMutation={changeMutation}
          helperTextPlacement="bottom"
          check={(value) =>
            value.length < 3
              ? { hasError: true, message: 'Too short' }
              : { hasError: false }
          }
        />
      ));

      await openEditMode('test');
      await typeNewValue('ab');

      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('Too short');
      expect(alert).toHaveAttribute('id', 'test-error');
    });

    it('does not render an alert role for the default "right" placement', async () => {
      renderInlineInput(({ changeMutation }) => (
        <InlineInput
          id="test"
          defaultValue="test"
          changeMutation={changeMutation}
          check={(value) =>
            value.length < 3
              ? { hasError: true, message: 'Too short' }
              : { hasError: false }
          }
        />
      ));

      await openEditMode('test');
      await typeNewValue('ab');

      expect(screen.getByText('Too short')).toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('confirmation modal', () => {
    const renderConfirm = ({ pendingValue, isOpen, onConfirm, onCancel }: {
      pendingValue: string;
      isOpen: boolean;
      onConfirm: () => void;
      onCancel: () => void;
    }) =>
      isOpen ? (
        <div role="dialog" aria-label="Confirm">
          <p>Rename to {pendingValue}?</p>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      ) : null;

    it('opens the modal on submit and calls mutate on Confirm', async () => {
      const mock = jest.fn();
      renderInlineInput(
        ({ changeMutation }) => (
          <InlineInput
            id="test"
            defaultValue="test"
            changeMutation={changeMutation}
            confirmationModal={(args) =>
              renderConfirm({
                pendingValue: args.pendingValue,
                isOpen: args.isOpen,
                onConfirm: args.onConfirm,
                onCancel: args.onCancel,
              })
            }
          />
        ),
        mock,
      );

      await openEditMode('test');
      await typeNewValue('renamed');
      await act(() => userEvent.keyboard('{Enter}'));

      const modal = await screen.findByRole('dialog', { name: /confirm/i });
      expect(modal).toHaveTextContent('Rename to renamed?');
      expect(mock).not.toHaveBeenCalled();

      await userEvent.click(within(modal).getByRole('button', { name: /confirm/i }));

      await waitFor(() => expect(mock).toHaveBeenCalledWith('renamed'));
      expect(
        screen.queryByRole('dialog', { name: /confirm/i }),
      ).not.toBeInTheDocument();
    });

    it('closes the modal without mutating on Cancel', async () => {
      const mock = jest.fn();
      renderInlineInput(
        ({ changeMutation }) => (
          <InlineInput
            id="test"
            defaultValue="test"
            changeMutation={changeMutation}
            confirmationModal={(args) =>
              renderConfirm({
                pendingValue: args.pendingValue,
                isOpen: args.isOpen,
                onConfirm: args.onConfirm,
                onCancel: args.onCancel,
              })
            }
          />
        ),
        mock,
      );

      await openEditMode('test');
      await typeNewValue('renamed');
      await act(() => userEvent.keyboard('{Enter}'));

      const modal = await screen.findByRole('dialog', { name: /confirm/i });
      await userEvent.click(within(modal).getByRole('button', { name: /cancel/i }));

      expect(mock).not.toHaveBeenCalled();
      expect(
        screen.queryByRole('dialog', { name: /confirm/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe('review fixes', () => {
    it('shows a toast when the mutation fails (no modal)', async () => {
      const FailingMutationProvider = ({
        children,
      }: {
        children: ({
          changeMutation,
        }: {
          changeMutation: UseMutationResult<unknown, Error, { value: string }>;
        }) => JSX.Element;
      }) => {
        const changeMutation = useMutation<unknown, Error, { value: string }>({
          mutationFn: () => Promise.reject(new Error('boom')),
        });
        return <>{children({ changeMutation })}</>;
      };

      render(
        <FailingMutationProvider>
          {({ changeMutation }) => (
            <InlineInput
              id="test"
              defaultValue="test"
              changeMutation={
                changeMutation as unknown as UseMutationResult<
                  unknown,
                  unknown,
                  { value: string }
                >
              }
            />
          )}
        </FailingMutationProvider>,
        { wrapper: Wrapper },
      );

      await openEditMode('test');
      await typeNewValue('renamed');
      await act(() => userEvent.keyboard('{Enter}'));

      const toast = await screen.findByRole('status');
      expect(toast).toHaveTextContent(
        'An error occurred while updating the value',
      );
    });

    it('submit follows the visible validation state (uses pendingValue, not trimmed)', async () => {
      const mock = jest.fn();
      renderInlineInput(
        ({ changeMutation }) => (
          <InlineInput
            id="test"
            defaultValue="test"
            changeMutation={changeMutation}
            check={(value) =>
              value.length < 3
                ? { hasError: true, message: 'Too short' }
                : { hasError: false }
            }
          />
        ),
        mock,
      );

      await openEditMode('test');
      // pendingValue " ab " (length 4) → no visible error → submit must proceed
      await typeNewValue(' ab ');
      expect(screen.queryByText('Too short')).not.toBeInTheDocument();

      await act(() => userEvent.keyboard('{Enter}'));
      await waitFor(() => expect(mock).toHaveBeenCalledWith('ab'));
    });

    it('does not submit on blur while a mutation is in flight', async () => {
      let resolveMutation: (() => void) | undefined;
      const mock = jest.fn();
      const SlowMutationProvider = ({
        children,
      }: {
        children: ({
          changeMutation,
        }: {
          changeMutation: UseMutationResult<unknown, unknown, { value: string }>;
        }) => JSX.Element;
      }) => {
        const changeMutation = useMutation<unknown, unknown, { value: string }>(
          {
            mutationFn: ({ value }) => {
              mock(value);
              return new Promise<void>((resolve) => {
                resolveMutation = resolve;
              });
            },
          },
        );
        return <>{children({ changeMutation })}</>;
      };

      render(
        <SlowMutationProvider>
          {({ changeMutation }) => (
            <InlineInput
              id="test"
              defaultValue="test"
              changeMutation={changeMutation}
            />
          )}
        </SlowMutationProvider>,
        { wrapper: Wrapper },
      );

      await openEditMode('test');
      await typeNewValue('renamed');
      await act(() => userEvent.keyboard('{Enter}'));

      // Mutation in-flight; blur the still-present input.
      const input = screen.queryByRole('textbox');
      if (input) {
        await act(() => userEvent.tab());
      }

      expect(mock).toHaveBeenCalledTimes(1);

      await act(async () => {
        resolveMutation?.();
      });
    });

    it('does not enter edit mode while the confirmation modal is open', async () => {
      renderInlineInput(({ changeMutation }) => (
        <InlineInput
          id="test"
          defaultValue="test"
          changeMutation={changeMutation}
          confirmationModal={({ isOpen, pendingValue }) =>
            isOpen ? (
              <div role="dialog" aria-label="Confirm">
                {pendingValue}
              </div>
            ) : null
          }
        />
      ));

      await openEditMode('test');
      await typeNewValue('renamed');
      await act(() => userEvent.keyboard('{Enter}'));

      await screen.findByRole('dialog', { name: /confirm/i });
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

      const trigger = screen.getByLabelText(/edit/i);
      await userEvent.click(trigger);

      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('disables the trigger while the mutation is loading', () => {
      const loadingMutation = {
        isLoading: true,
        isError: false,
        isSuccess: false,
        isIdle: false,
        status: 'loading',
        error: null,
        mutate: jest.fn(),
        mutateAsync: jest.fn(),
        reset: jest.fn(),
        data: undefined,
        variables: undefined,
        context: undefined,
        failureCount: 0,
        failureReason: null,
        isPaused: false,
      } as unknown as UseMutationResult<unknown, unknown, { value: string }>;

      render(
        <InlineInput
          id="test"
          defaultValue="test"
          changeMutation={loadingMutation}
        />,
        { wrapper: Wrapper },
      );

      const trigger = screen.getByLabelText(/edit/i);
      expect(trigger).toHaveAttribute('aria-disabled', 'true');
      expect(trigger).toHaveAttribute('aria-busy', 'true');
      expect(trigger).toHaveAttribute('role', 'button');
    });

    it('marks the trigger as aria-disabled while the confirmation modal is open', async () => {
      renderInlineInput(({ changeMutation }) => (
        <InlineInput
          id="test"
          defaultValue="test"
          changeMutation={changeMutation}
          confirmationModal={({ isOpen }) =>
            isOpen ? <div role="dialog" aria-label="Confirm" /> : null
          }
        />
      ));

      await openEditMode('test');
      await typeNewValue('renamed');
      await act(() => userEvent.keyboard('{Enter}'));

      await screen.findByRole('dialog', { name: /confirm/i });
      const trigger = screen.getByLabelText(/edit/i);
      expect(trigger).toHaveAttribute('role', 'button');
      expect(trigger).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('external defaultValue updates', () => {
    it('does not overwrite the user input mid-edit when defaultValue changes', async () => {
      const Harness = () => {
        const [defaultValue, setDefaultValue] = useState('initial');
        const changeMutation = useMutation<unknown, unknown, { value: string }>(
          {
            mutationFn: () => Promise.resolve(null),
          },
        );
        return (
          <>
            <button onClick={() => setDefaultValue('server-update')}>
              update
            </button>
            <InlineInput
              id="test"
              defaultValue={defaultValue}
              changeMutation={changeMutation}
            />
          </>
        );
      };

      render(<Harness />, { wrapper: Wrapper });

      await openEditMode('initial');
      await typeNewValue('user typing');

      await userEvent.click(screen.getByRole('button', { name: 'update' }));

      expect(screen.getByRole('textbox')).toHaveValue('user typing');
    });
  });
});
