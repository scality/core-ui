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
  UNSAFE_RouteContext,
  useRoutes,
  type RouteMatch,
  type RouteObject,
  type RoutesProps,
} from 'react-router';

type Entry = { depth: number; order: number; pattern: string };

type RoutePatternRegistry = {
  pattern: string | null;
  register: (depth: number, pattern: string) => () => void;
};

// A micro-app may bundle its own copy of core-ui, so the context object lives
// on globalThis for the host's provider to reach the remotes' routes. Its value
// is shared across core-ui versions: change its shape only under a new key.
const CONTEXT_KEY = Symbol.for('@scality/core-ui/route-pattern-context/v1');

const RoutePatternContext = ((
  globalThis as typeof globalThis & {
    [CONTEXT_KEY]?: Context<RoutePatternRegistry | null>;
  }
)[CONTEXT_KEY] ??= createContext<RoutePatternRegistry | null>(null));

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

const RoutePatternReporter = () => {
  const register = useContext(RoutePatternContext)?.register;
  const { matches } = useContext(UNSAFE_RouteContext);
  const pattern = toRoutePattern(matches);

  useLayoutEffect(() => {
    if (register && pattern) {
      return register(matches.length, pattern);
    }
  }, [register, matches.length, pattern]);

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
 * pattern to the closest `RoutePatternProvider`, across nested and federated
 * routers.
 */
export const Routes = ({ children, location }: RoutesProps) =>
  useRoutes(withReporter(createRoutesFromChildren(children)), location);

/**
 * Returns the full pattern of the deepest route rendered by core-ui `Routes`
 * under the closest `RoutePatternProvider`, such as
 * `/platform/nodes/:name/overview`, or `null` when none matches.
 */
export const useCurrentRoutePattern = () =>
  useContext(RoutePatternContext)?.pattern ?? null;
