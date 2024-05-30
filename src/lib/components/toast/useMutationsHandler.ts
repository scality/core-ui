import { ReactNode, useCallback, useEffect } from 'react';
import { UseMutationOptions, UseMutationResult } from 'react-query';
import { ToastContextState, useToast } from './ToastProvider';

export type MutationConfig<T> = {
  mutation: T;
  name: string;
};

declare type GetResults<T> = T extends MutationConfig<
  MinimalMutationResult<infer TData, infer TError>
>
  ? MutationConfig<MinimalMutationResult<TData, TError>>
  : T extends MinimalMutationResult<infer TData, infer TError>
  ? MutationConfig<MinimalMutationResult<TData, TError>>
  : MutationConfig<MinimalMutationResult<unknown, unknown>>;

declare type GetDescriptionBuilder<T> = T extends MutationConfig<
  MinimalMutationResult<infer TData, infer TError>
>
  ? DescriptionBuilder<TData, TError>
  : T extends MutationConfig<UseMutationOptions<infer TData, infer TError>>
  ? DescriptionBuilder<TData, TError>
  : T extends MinimalMutationResult<infer TData, infer TError>
  ? DescriptionBuilder<TData, TError>
  : never;

/**
 * MutationResults reducer recursively maps type param to results
 */
declare type MutationsResults<T extends unknown[]> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? [GetResults<Head>, ...MutationsResults<Tail>]
  : T extends [infer Head]
  ? [GetResults<Head>]
  : unknown[] extends T
  ? T
  : never;

enum DescriptionBuilderStatus {
  Success = 'success',
  Error = 'error',
}

type DescriptionBuilder<Data = unknown, Error = unknown> = {
  error?: Error;
  data?: Data;
  status: DescriptionBuilderStatus;
  name: string;
};

declare type DescriptionBuilders<T extends any[]> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? [GetDescriptionBuilder<Head>, ...DescriptionBuilders<Tail>]
  : T extends [infer Head]
  ? [GetDescriptionBuilder<Head>]
  : T extends UseMutationOptions<
      infer TMutationFnData,
      infer TError,
      infer TData
    >[]
  ? DescriptionBuilder<
      unknown extends TData ? TMutationFnData : TData,
      TError
    >[]
  : DescriptionBuilder[];

type Props<MainMutationType, T extends any[]> = {
  mainMutation: MutationConfig<MainMutationType>;
  dependantMutations?:
    | readonly [...MutationsResults<T>]
    | MutationConfig<MinimalMutationResult<unknown, unknown>>[];
  messageDescriptionBuilder: (
    mutations: T extends []
      ? [GetDescriptionBuilder<MainMutationType>]
      : [GetDescriptionBuilder<MainMutationType>, ...DescriptionBuilders<T>],
  ) => ReactNode;
  toastProps?: Pick<
    ToastContextState,
    'style' | 'autoDismiss' | 'position' | 'duration' | 'withProgressBar'
  >;
} & (
  | { onMainMutationSuccess?: () => void; onAllMutationsSuccess?: never }
  | { onAllMutationsSuccess?: () => void; onMainMutationSuccess?: never }
);

export type MinimalMutationResult<TData, TError> = Pick<
  UseMutationResult<TData, TError, unknown, unknown>,
  'isError' | 'isIdle' | 'isSuccess' | 'isLoading' | 'error' | 'data'
>;

export const useMutationsHandler = <
  MainMutationType extends MinimalMutationResult<unknown, unknown>,
  T extends any[] | [],
>({
  mainMutation,
  dependantMutations,
  messageDescriptionBuilder,
  toastProps,
  ...rest
}: Props<MainMutationType, T>) => {
  const { showToast } = useToast();
  const mutations = [
    mainMutation,
    ...(dependantMutations ? dependantMutations : []),
  ] as MutationConfig<MinimalMutationResult<unknown, unknown>>[];

  const handleMutationsCompletion = useCallback(async () => {
    const results = await Promise.all(mutations.map((m) => m.mutation));

    const loadingMutations = mutations.filter(
      (_, index) => results[index].isLoading,
    );
    const successMutations = mutations.filter(
      (_, index) => results[index].isSuccess,
    );
    const errorMutations = mutations.filter(
      (_, index) => results[index].isError,
    );

    const mainMutationDesc: GetDescriptionBuilder<MainMutationType> = {
      data: mainMutation.mutation?.data,
      status: DescriptionBuilderStatus.Success,
      name: mainMutation.name,
    } as GetDescriptionBuilder<MainMutationType>;
    const descriptionBuilders = [
      mainMutationDesc,
      ...((dependantMutations?.map(({ mutation, name }) => ({
        data: mutation.data,
        error: mutation.isError && mutation.error,
        status: mutation.isSuccess
          ? DescriptionBuilderStatus.Success
          : DescriptionBuilderStatus.Error,
        name,
      })) as DescriptionBuilders<T>) || ([] as DescriptionBuilders<T>)),
    ] as T extends []
      ? [GetDescriptionBuilder<MainMutationType>]
      : [GetDescriptionBuilder<MainMutationType>, ...DescriptionBuilders<T>];

    if (loadingMutations.length === 0) {
      if (errorMutations.length > 0) {
        if (mainMutation.mutation?.isSuccess) {
          'onMainMutationSuccess' in rest && rest?.onMainMutationSuccess?.();
        }
        showToast({
          open: true,
          status: 'error',
          message: messageDescriptionBuilder(descriptionBuilders),
          ...toastProps,
        });
        return;
      } else if (successMutations.length > 0) {
        'onMainMutationSuccess' in rest && rest?.onMainMutationSuccess?.();
        if (successMutations.length === mutations.length) {
          'onAllMutationsSuccess' in rest && rest?.onAllMutationsSuccess?.();
        }
        showToast({
          open: true,
          status: 'success',
          message: messageDescriptionBuilder(descriptionBuilders),
          ...(toastProps ? toastProps : {}),
        });
      }
    }
  }, [JSON.stringify(mutations)]);

  useEffect(() => {
    handleMutationsCompletion();
  }, [handleMutationsCompletion]);
};
