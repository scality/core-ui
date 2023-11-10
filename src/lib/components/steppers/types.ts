import { ReactNode } from 'react';

type MAXIMUM_DEPTH = 20;

type GetResults<T> = T extends Step<infer Props> ? Step<Props> : never;

type Length<T extends any[]> = T extends { length: infer L } ? L : never;

type BuildTuple<L extends number, T extends any[] = []> = T extends {
  length: L;
}
  ? T
  : BuildTuple<L, [...T, any]>;

export interface Step<T> {
  label: string;
  Component: (args: T) => ReactNode;
}

export interface StepperContextType {
  next: (props: Record<string, unknown>) => void;
  prev: (props: Record<string, unknown>) => void;
}

export declare type Steps<
  T extends any[],
  Result extends any[] = [],
  Depth extends ReadonlyArray<number> = [],
> = Depth['length'] extends MAXIMUM_DEPTH
  ? Step<unknown>[]
  : T extends []
  ? []
  : T extends [infer Head]
  ? [...Result, GetResults<Head>]
  : T extends [infer Head, ...infer Tail]
  ? Steps<[...Tail], [...Result, GetResults<Head>], [...Depth, 1]>
  : unknown[] extends T
  ? T
  : never;

export type Add<A extends number, B extends number> = Length<
  [...BuildTuple<A>, ...BuildTuple<B>]
>;

export type Subtract<A extends number, B extends number> =
  BuildTuple<A> extends [...infer U, ...BuildTuple<B>] ? Length<U> : -1;

export type ExctractProps<T> = T extends Step<infer Props> ? Props : never;