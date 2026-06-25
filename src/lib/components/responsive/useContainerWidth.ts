import { useCallback, useRef, useState } from 'react';

/**
 * Container width (in px) below which a screen should switch to its compact
 * layout. The trigger is the *container* width, not the viewport, so screens
 * stay usable when a host side-panel shrinks the available space without
 * changing the viewport width.
 */
export const NARROW_BREAKPOINT_PX = 640;

/**
 * Tables carry several columns and a search/action toolbar, so they feel
 * cramped at a wider width than a single-column detail form does. List screens
 * pass this higher breakpoint to drop secondary columns / shrink the toolbar
 * earlier than detail panels switch to their compact layout.
 */
export const TABLE_NARROW_BREAKPOINT_PX = 820;

export type UseContainerWidthOptions = {
  /**
   * Hysteresis band (px). Once narrow, the container must grow back to
   * `breakpoint + hysteresis` before it is considered wide again. Prevents
   * flicker when the container is dragged to rest right on a breakpoint.
   * Defaults to 0 (no band).
   */
  hysteresis?: number;
};

export type UseContainerWidthResult<T extends HTMLElement> = {
  /** Callback ref — attach to the element whose width should drive the layout. */
  ref: (node: T | null) => void;
  /** Latest measured border-box width in px, or `null` before first measure. */
  width: number | null;
  /** True when `width` is below the hook's `breakpoint`. Wide-first until measured. */
  isNarrow: boolean;
  /** True when `width` is below `px`. Lets one container drive several tiers. */
  isNarrowerThan: (px: number) => boolean;
};

/**
 * Observes the width of the element the returned `ref` is attached to.
 *
 * Width starts as `null` (not yet measured) so the first paint defaults to the
 * wide layout; the observer then measures and flips to narrow when needed,
 * avoiding a visible flash on full-width screens.
 *
 * `ref` is a *callback* ref (not a ref object) so the observer attaches whenever
 * the node mounts — including when the measured element only appears after an
 * async loading state, where a `useEffect([])` would have run too early (while
 * the node was still null) and never observed it.
 */
export function useContainerWidth<T extends HTMLElement = HTMLDivElement>(
  breakpoint: number = NARROW_BREAKPOINT_PX,
  options: UseContainerWidthOptions = {},
): UseContainerWidthResult<T> {
  const { hysteresis = 0 } = options;
  const [width, setWidth] = useState<number | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const isNarrowRef = useRef(false);

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
        const rounded = Math.round(observedWidth);
        setWidth((prev) => (prev === rounded ? prev : rounded));
      }
    });
    observer.observe(node);
    observerRef.current = observer;
    setWidth(Math.round(node.getBoundingClientRect().width));
  }, []);

  // Hysteresis: once narrow, require width >= breakpoint + hysteresis to leave
  // narrow; once wide, require width < breakpoint to enter narrow. With
  // hysteresis = 0 this is a plain `width < breakpoint`.
  let isNarrow = isNarrowRef.current;
  if (width !== null) {
    if (isNarrow) {
      if (width >= breakpoint + hysteresis) isNarrow = false;
    } else if (width < breakpoint) {
      isNarrow = true;
    }
    isNarrowRef.current = isNarrow;
  }

  const isNarrowerThan = useCallback(
    (px: number) => width !== null && width < px,
    [width],
  );

  return { ref, width, isNarrow, isNarrowerThan };
}
