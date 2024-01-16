import { act, renderHook } from '@testing-library/react-hooks';
import { useToast } from './ToastProvider';
import { useMutationsHandler } from './useMutationsHandler';

jest.mock('./ToastProvider', () => ({
  useToast: jest.fn(),
}));

const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;

const mutationResultMock = {
  context: undefined,
  data: ['mockData'],
  failureCount: 0,
  error: null,
  mutate: jest.fn(),
  mutateAsync: jest.fn(),
  reset: jest.fn(),
  variables: undefined,
};

describe('useMutationsHandler', () => {
  const mainMutation = {
    mutation: {
      isError: false,
      isIdle: false,
      isLoading: false,
      isPaused: false,
      isSuccess: true,
      status: 'success',
      ...mutationResultMock,
    },
    name: 'mutation1',
  };

  const dependantMutations = [
    {
      mutation: {
        isLoading: false,
        isSuccess: true,
        isError: false,
        isIdle: false,
        status: 'success',
        ...mutationResultMock,
      },
      name: 'mutation2',
    },
    {
      mutation: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        isIdle: true,
        status: 'idle',
        ...mutationResultMock,
      },
      name: 'mutation3',
    },
  ] as const;

  const messageDescriptionBuilder = jest.fn(() => 'message');

  it('should call onMainMutationSuccess when a primary mutation succeeds', async () => {
    const showToast = jest.fn();
    const onMainMutationSuccess = jest.fn();

    mockUseToast.mockImplementation(() => ({
      showToast,
    }));

    const { waitFor } = renderHook(() =>
      useMutationsHandler({
        mainMutation,
        dependantMutations,
        messageDescriptionBuilder,
        onMainMutationSuccess,
      }),
    );

    await act(async () => {
      await waitFor(() => {
        expect(onMainMutationSuccess).toHaveBeenCalled();
      });
    });
  });

  it('should show a success toast when all mutations succeed', async () => {
    const showToast = jest.fn();

    mockUseToast.mockImplementation(() => ({
      showToast,
    }));

    const { waitFor } = renderHook(() =>
      useMutationsHandler({
        mainMutation,
        dependantMutations,
        messageDescriptionBuilder,
      }),
    );

    await act(async () => {
      await waitFor(() => {
        expect(showToast).toHaveBeenCalledWith({
          open: true,
          status: 'success',
          message: 'message',
        });
      });
    });
  });

  it('should show an error toast when at least one mutation fails', async () => {
    const showToast = jest.fn();

    mockUseToast.mockImplementation(() => ({
      showToast,
    }));

    const mutationsWithError = [
      {
        mutation: {
          isLoading: false,
          isSuccess: false,
          isIdle: false,
          isError: true,
          stauts: 'error',
          ...mutationResultMock,
        },
        name: 'mutation4',
      },
    ] as const;

    const { waitFor } = renderHook(() =>
      useMutationsHandler({
        mainMutation,
        dependantMutations: mutationsWithError,
        messageDescriptionBuilder,
      }),
    );

    await act(async () => {
      await waitFor(() => {
        expect(showToast).toHaveBeenCalledWith({
          open: true,
          status: 'error',
          message: 'message',
        });
      });
    });
  });

  it('should call onAllSuccess when all mutations succeeds', async () => {
    const showToast = jest.fn();
    const otherMutations = [
      {
        mutation: {
          isLoading: false,
          isSuccess: true,
          isError: false,
          isIdle: false,
          status: 'success',
          ...mutationResultMock,
        },
        name: 'mutation2',
      },
    ] as const;
    const onAllMutationsSuccess = jest.fn();

    mockUseToast.mockImplementation(() => ({
      showToast,
    }));

    const { waitFor } = renderHook(() =>
      useMutationsHandler({
        mainMutation,
        dependantMutations: otherMutations,
        messageDescriptionBuilder,
        onAllMutationsSuccess,
      }),
    );

    await act(async () => {
      await waitFor(() => {
        expect(onAllMutationsSuccess).toHaveBeenCalled();
      });
    });
  });

  it('should not call onAllSuccess when all mutations failed', async () => {
    const showToast = jest.fn();
    const firstMutation = {
      mutation: {
        isError: true,
        isIdle: false,
        isLoading: false,
        isPaused: false,
        isSuccess: false,
        status: 'error',
        ...mutationResultMock,
      },
      name: 'mutation1',
    };
    const otherMutations = [
      {
        mutation: {
          isLoading: false,
          isSuccess: false,
          isError: true,
          isIdle: false,
          status: 'error',
          ...mutationResultMock,
        },
        name: 'mutation2',
      },
    ] as const;
    const onAllMutationsSuccess = jest.fn();

    mockUseToast.mockImplementation(() => ({
      showToast,
    }));

    const { waitFor } = renderHook(() =>
      useMutationsHandler({
        mainMutation: firstMutation,
        dependantMutations: otherMutations,
        messageDescriptionBuilder,
        onAllMutationsSuccess,
      }),
    );

    await act(async () => {
      await waitFor(() => {
        expect(onAllMutationsSuccess).not.toHaveBeenCalled();
      });
    });
  });
});
