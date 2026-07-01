import { useCallback, useRef, useState } from 'react';

export type UseContainerWidthResult<T extends HTMLElement> = {
  /** Callback ref — attach to the element whose width should drive the layout. */
  ref: (node: T | null) => void;
  /** Latest measured border-box width in px, or `undefined` before first measure. */
  width: number | undefined;
};

/**
 * Observes the border-box width of the element the returned `ref` is attached
 * to. It only reports the width — the consumer decides its own threshold, e.g.
 * `(width ?? Infinity) < myBreakpoint` to default to the wide layout until the
 * first measurement lands.
 *
 * `width` starts as `undefined` (not `null`) so a raw `width < breakpoint`
 * comparison is wide-first even without TypeScript: `undefined < n` is `false`,
 * whereas `null` coerces to `0` and would report narrow before the first
 * measure.
 *
 * `ref` is a *callback* ref (not a ref object) so the observer attaches whenever
 * the node mounts — including when the measured element only appears after an
 * async loading state, where a `useEffect([])` would have run too early (while
 * the node was still null) and never observed it.
 */
export function useContainerWidth<T extends HTMLElement = HTMLDivElement>(): UseContainerWidthResult<T> {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback((node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (!node || typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      // Border-box width (matches the element's CSS width and the sync read
      // below); where borderBoxSize is unsupported, re-measure the border box
      // from the target rather than fall back to contentRect's content box,
      // which would disagree with the sync read on padded elements.
      const observedWidth =
        entry?.borderBoxSize?.[0]?.inlineSize ??
        entry?.target.getBoundingClientRect().width;
      if (typeof observedWidth === 'number') {
        setWidth(Math.round(observedWidth));
      }
    });
    observer.observe(node);
    observerRef.current = observer;
    setWidth(Math.round(node.getBoundingClientRect().width));
  }, []);

  return { ref, width };
}
