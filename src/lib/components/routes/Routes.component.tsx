import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type Context,
  type ReactNode,
} from 'react';
import {
  createRoutesFromChildren,
  Outlet,
  useRoutes,
  type RouteObject,
  type RoutesProps,
} from 'react-router';

type Entry = { depth: number; order: number; pattern: string };

type RoutePatternRegistry = {
  pattern: string | null;
  register: (depth: number, pattern: string) => () => void;
};

type RouteScope = { depth: number; prefix: string };

// A micro-app may bundle its own copy of core-ui, so these context objects live
// on globalThis for the host's routes and provider to reach the remotes' routes.
// Their values are shared across core-ui versions: change a shape only under a
// new key.
const sharedContext = <T,>(name: string, defaultValue: T): Context<T> => {
  const key = Symbol.for(`@scality/core-ui/${name}`);
  const global = globalThis as typeof globalThis &
    Record<symbol, Context<T> | undefined>;
  return (global[key] ??= createContext(defaultValue));
};

const RoutePatternContext = sharedContext<RoutePatternRegistry | null>(
  'route-pattern-context/v1',
  null,
);

const RouteScopeContext = sharedContext<RouteScope>('route-scope-context/v1', {
  depth: 0,
  prefix: '',
});

/** Joins a route path to the pattern of its parent routes, such as `/nodes` and `:name/*` into `/nodes/:name/*`. */
export const joinRoutePath = (prefix: string, path = '') =>
  '/' + `${prefix}/${path}`.split('/').filter(Boolean).join('/');

const withoutSplat = (pattern: string) => pattern.replace(/\/?\*$/, '');

const deepestPattern = (entries: Map<symbol, Entry>) => {
  let deepest: Entry | undefined;
  entries.forEach((entry) => {
    if (
      !deepest ||
      entry.depth > deepest.depth ||
      (entry.depth === deepest.depth && entry.order > deepest.order)
    ) {
      deepest = entry;
    }
  });
  return deepest?.pattern ?? null;
};

/**
 * Collects the route patterns reported by core-ui `Routes` below it, so
 * `useCurrentRoutePattern` can tell which page is shown. Render it once, around
 * the host app's routes.
 */
export const RoutePatternProvider = ({ children }: { children: ReactNode }) => {
  const entries = useRef(new Map<symbol, Entry>());
  const order = useRef(0);
  const [pattern, setPattern] = useState<string | null>(null);

  const register = useCallback((depth: number, routePattern: string) => {
    const id = Symbol();
    entries.current.set(id, {
      depth,
      pattern: routePattern,
      order: ++order.current,
    });
    setPattern(deepestPattern(entries.current));
    return () => {
      entries.current.delete(id);
      setPattern(deepestPattern(entries.current));
    };
  }, []);

  const value = useMemo(() => ({ pattern, register }), [pattern, register]);

  return (
    <RoutePatternContext.Provider value={value}>
      {children}
    </RoutePatternContext.Provider>
  );
};

const RoutePatternReporter = ({ depth, pattern }: Omit<Entry, 'order'>) => {
  const register = useContext(RoutePatternContext)?.register;

  useLayoutEffect(() => {
    if (register) {
      return register(depth, pattern);
    }
  }, [register, depth, pattern]);

  return null;
};

// react-router resolves an absolute path against the enclosing Routes, not the
// URL root, so `base` is the pattern of the routes around that Routes.
const withReporter = (
  routes: RouteObject[],
  parent: RouteScope,
  base: string,
): RouteObject[] =>
  routes.map(({ Component, element, children, ...route }) => {
    const pattern = joinRoutePath(
      route.path?.startsWith('/') ? base : parent.prefix,
      route.path,
    );
    const scope = { depth: parent.depth + 1, prefix: withoutSplat(pattern) };
    const content = Component ? <Component /> : element || <Outlet />;
    return {
      ...route,
      element: (
        <RouteScopeContext.Provider value={scope}>
          <RoutePatternReporter depth={scope.depth} pattern={pattern} />
          {content}
        </RouteScopeContext.Provider>
      ),
      children: children && withReporter(children, scope, base),
    } as RouteObject;
  });

/**
 * Drop-in replacement for react-router's `Routes` that reports the matched route
 * pattern to the closest `RoutePatternProvider`, across nested and federated
 * routers. Every router between the host and the page must use it: a level
 * rendered by react-router's `Routes` is missing from the pattern.
 */
export const Routes = ({ children, location }: RoutesProps) => {
  const parent = useContext(RouteScopeContext);
  return useRoutes(
    withReporter(createRoutesFromChildren(children), parent, parent.prefix),
    location,
  );
};

/**
 * Returns the full pattern of the deepest route rendered by core-ui `Routes`
 * under the closest `RoutePatternProvider`, such as
 * `/platform/nodes/:name/overview`, or `null` when none matches.
 */
export const useCurrentRoutePattern = () =>
  useContext(RoutePatternContext)?.pattern ?? null;
