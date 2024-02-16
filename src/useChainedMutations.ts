/* eslint @typescript-eslint/no-unused-vars: 0 */
import { useRef } from 'react';

/**
 * This is a generic type representing a chained mutation.
 * It takes three generic parameters :
 * @template TVariables - The type of variables for the mutation.
 * @template TData - The type of data returned by the mutation.
 * @template TKey - The type of the mutation key.
 */
type ChainedMutation<
  TVariables = unknown,
  TData = unknown,
  TKey extends string = '',
> = {
  mutate: (
    variables: TVariables,
    mutationOptions: { onSuccess: (data: TData) => void },
  ) => void;
  isSuccess: boolean;
  data: TData;
  key: TKey;
};

/**
 * This is a utility type that infers types for ChainedMutation.
 * It takes a generic type T as an argument and returns a ChainedMutation with correct types.
 * @template T - Generic type.
 */
declare type InferChainedMutation<T> = T extends ChainedMutation<
  infer TVariables,
  infer TData,
  infer TKey
>
  ? ChainedMutation<TVariables, TData, TKey>
  : ChainedMutation<unknown, unknown, ''>;

/**
 * It takes an array of chained mutations and returns an array with types inferred from each mutation
 * If the input type is an empty array, the result type will also be an empty array.
 * If the input type is an array with one element, the result type will be an array with one element of type `InferChainedMutation<Head>`.
 * If the input type is an array with multiple elements, the result type will be an array with multiple elements, each of type `InferChainedMutation<Tail>`.
 * If the input type is not a valid array type, the result type will be `unknown[]`.
 */
type ChainedMutationsResults<T extends unknown[]> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? [InferChainedMutation<Head>, ...ChainedMutationsResults<Tail>]
  : T extends [infer Head]
  ? [InferChainedMutation<Head>]
  : unknown[] extends T
  ? T
  : never;

/**
 * Extracts the variable type from a ChainedMutation type.
 * @template T - The ChainedMutation type.
 * @returns The variable type extracted from the ChainedMutation type.
 */
type ExtractVariables<T> = T extends ChainedMutation<
  infer TVariables,
  infer TData,
  infer TKey
>
  ? TVariables
  : never;

/**
 * Extracts the data type from a ChainedMutation type.
 * @template T - The ChainedMutation type.
 * @returns The data type extracted from the ChainedMutation type.
 */
type ExtractData<T> = T extends ChainedMutation<
  infer TVariables,
  infer TData,
  infer TKey
>
  ? TData
  : never;

/**
 * Extracts the key type from a ChainedMutation type.
 * @template T - The ChainedMutation type.
 * @returns The key type extracted from the ChainedMutation type.
 */
type ExtractKey<T> = T extends ChainedMutation<
  infer TVariables,
  infer TData,
  infer TKey
>
  ? TKey
  : never;

/**
 * Extracts the data types from a chained mutation tuple.
 * @template T - The chained mutation tuple.
 * @returns The extracted data types.
 */
type ExtractDataFromChainedMutaionTuple<T> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? [ExtractData<Head>, ...ExtractDataFromChainedMutaionTuple<Tail>]
  : T extends [infer Head]
  ? [ExtractData<Head>]
  : never;

/**
 * Computes the variables for the next builder based on the results of the chained mutation tuple.
 * @template ChainedMutationTupleResult The type of the results of the chained mutation tuple.
 * @template TNextVariables The type of the variables for the next chaied mutation.
 * @param results The results of the chained mutation tuple.
 * @returns The variables for the next chained mutation.
 */
type ComputeVariablesForNextBuilder<
  ChainedMutationTupleResult extends unknown[],
  TNextVariables,
> = (results: ChainedMutationTupleResult) => TNextVariables;

/**
 * Computes the variables for the next step in a chained mutation.
 * @template T - The tuple of mutation steps.
 * @param {T} - The tuple of mutation steps.
 * @returns {Record<string, unknown>} - The computed variables for the next step.
 */
type ComputeVariablesForNext<T extends unknown[]> = T extends []
  ? Record<string, unknown>
  : T extends [...infer Head, infer Tail]
  ? ComputeVariablesForNext<Head> &
      Record<
        ExtractKey<Tail>,
        ComputeVariablesForNextBuilder<
          ExtractDataFromChainedMutaionTuple<Head>,
          ExtractVariables<Tail>
        >
      >
  : T extends [infer Head]
  ? Record<
      ExtractKey<Head>,
      ComputeVariablesForNextBuilder<[], ExtractVariables<Head>>
    >
  : Record<string, unknown>;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const useChainedMutations = <T extends any[]>({
  mutations,
  computeVariablesForNext,
}: {
  mutations: readonly [...ChainedMutationsResults<T>];
  computeVariablesForNext: ComputeVariablesForNext<T>;
}): {
  mutate: () => void;
  computeVariablesForNext: ComputeVariablesForNext<T>;
  mutationsWithRetry: (ChainedMutation & {
    status: 'loading' | 'success' | 'error';
    retry: () => void;
  })[];
} => {
  const mutationsWithRetry = useRef<
    (ChainedMutation & {
      status: 'loading' | 'success' | 'error';
      retry: () => void;
    })[]
    //@ts-expect-error initial value
  >(mutations);
  const go = (results: unknown[] = []) => {
    const index = results.length;
    const compute = computeVariablesForNext[
      mutations[index].key
    ] as ComputeVariablesForNextBuilder<unknown[], unknown>;

    const mutateAndTriggerNext = () => {
      mutations[index].mutate(compute(results), {
        onSuccess: (data: unknown) => {
          if (index < mutations.length - 1) {
            go([...results, data]);
          }
        },
      });
    };
    mutationsWithRetry.current[index].retry = () => {
      mutateAndTriggerNext();
    };
    mutateAndTriggerNext();
  };
  return {
    mutate: () => go(),
    mutationsWithRetry: mutationsWithRetry.current,
    computeVariablesForNext,
  };
};
