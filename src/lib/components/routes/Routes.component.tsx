import { useContext, useLayoutEffect, useSyncExternalStore } from 'react';
import {
  createRoutesFromChildren,
  Outlet,
  UNSAFE_RouteContext,
  useRoutes,
  type RouteMatch,
  type RouteObject,
  type RoutesProps,
} from 'react-router';

type Entry = { depth: number; order: number; pattern: string };

type RoutePatternStore = {
  entries: Map<symbol, Entry>;
  listeners: Set<() => void>;
  current: string | null;
  order: number;
};

// Every micro-app bundles its own copy of core-ui, so the store lives on
// globalThis for the host and its remotes to share one. Its shape is shared
// across core-ui versions: change it only under a new key version.
const STORE_KEY = Symbol.for('@scality/core-ui/route-pattern/v1');

const getStore = (): RoutePatternStore => {
  const global = globalThis as typeof globalThis & {
    [STORE_KEY]?: RoutePatternStore;
  };
  global[STORE_KEY] ??= {
    entries: new Map(),
    listeners: new Set(),
    current: null,
    order: 0,
  };
  return global[STORE_KEY];
};

const refresh = (store: RoutePatternStore) => {
  let deepest: Entry | undefined;
  store.entries.forEach((entry) => {
    if (
      !deepest ||
      entry.depth > deepest.depth ||
      (entry.depth === deepest.depth && entry.order > deepest.order)
    ) {
      deepest = entry;
    }
  });
  const next = deepest?.pattern ?? null;
  if (next !== store.current) {
    store.current = next;
    store.listeners.forEach((listener) => listener());
  }
};

const register = (depth: number, pattern: string) => {
  const store = getStore();
  const id = Symbol();
  store.entries.set(id, { depth, pattern, order: ++store.order });
  refresh(store);
  return () => {
    store.entries.delete(id);
    refresh(store);
  };
};

const subscribe = (listener: () => void) => {
  const { listeners } = getStore();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => getStore().current;

/** Builds the full route pattern, such as `/nodes/:name/overview`, from the matches of nested routes. */
export const toRoutePattern = (matches: RouteMatch[]): string | null => {
  if (!matches.length) {
    return null;
  }
  const paths = matches.map(({ route }, index) => {
    const path = route.path ?? '';
    return index < matches.length - 1 ? path.replace(/\/?\*$/, '') : path;
  });
  return '/' + paths.join('/').split('/').filter(Boolean).join('/');
};

const RoutePatternReporter = () => {
  const { matches } = useContext(UNSAFE_RouteContext);
  const pattern = toRoutePattern(matches);

  useLayoutEffect(() => {
    if (pattern) {
      return register(matches.length, pattern);
    }
  }, [matches.length, pattern]);

  return null;
};

const withReporter = (routes: RouteObject[]): RouteObject[] =>
  routes.map(({ Component, element, children, ...route }) => {
    const content = Component ? <Component /> : element || <Outlet />;
    return {
      ...route,
      element: (
        <>
          <RoutePatternReporter />
          {content}
        </>
      ),
      children: children && withReporter(children),
    } as RouteObject;
  });

/**
 * Drop-in replacement for react-router's `Routes` that reports the matched route
 * pattern, so the host can read it with `useCurrentRoutePattern` across nested
 * and federated routers.
 */
export const Routes = ({ children, location }: RoutesProps) =>
  useRoutes(withReporter(createRoutesFromChildren(children)), location);

/**
 * Returns the full pattern of the deepest route rendered by core-ui `Routes`
 * anywhere on the page, such as `/platform/nodes/:name/overview`, or `null`
 * when none matches.
 */
export const useCurrentRoutePattern = () =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
