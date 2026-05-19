import { PropsWithChildren } from 'react';
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
import { InlineInput } from './InlineInput';

const queryClient = new QueryClient();
const Wrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
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
      expect(trigger).toHaveAttribute('data-disabled', 'true');
    });
  });
});
