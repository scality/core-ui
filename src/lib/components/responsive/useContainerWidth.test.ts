import { act, renderHook } from '@testing-library/react';
import {
  NARROW_BREAKPOINT_PX,
  TABLE_NARROW_BREAKPOINT_PX,
  useContainerWidth,
} from './useContainerWidth';

// jsdom ships no ResizeObserver, so we stub a controllable one: each instance
// registers the (callback, node) pairs it observes, and `emitResize` lets a
// test push a new border-box width as if the element had been resized.
type ResizeCallback = (
  entries: { borderBoxSize: { inlineSize: number }[] }[],
  observer: ResizeObserver,
) => void;

let observations: { callback: ResizeCallback; node: Element }[] = [];

class ResizeObserverMock {
  callback: ResizeCallback;
  constructor(callback: ResizeCallback) {
    this.callback = callback;
  }
  observe(node: Element) {
    observations.push({ callback: this.callback, node });
  }
  unobserve(node: Element) {
    observations = observations.filter((o) => o.node !== node);
  }
  disconnect() {
    observations = observations.filter((o) => o.callback !== this.callback);
  }
}

// jsdom does no layout, so getBoundingClientRect always reports 0; stub it to
// return the border-box width the hook reads on the initial sync measurement.
const makeNode = (width: number) => {
  const node = document.createElement('div');
  node.getBoundingClientRect = () => ({ width } as DOMRect);
  return node;
};

const emitResize = (node: Element, width: number) => {
  act(() => {
    observations
      .filter((o) => o.node === node)
      .forEach((o) =>
        o.callback(
          [{ borderBoxSize: [{ inlineSize: width }] }],
          {} as ResizeObserver,
        ),
      );
  });
};

describe('useContainerWidth', () => {
  const originalResizeObserver = global.ResizeObserver;

  beforeAll(() => {
    // @ts-expect-error assigning a stub to the global
    global.ResizeObserver = ResizeObserverMock;
  });

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver;
  });

  beforeEach(() => {
    observations = [];
  });

  // Tests below call useContainerWidth() with no breakpoint argument, so they
  // exercise the default breakpoint (NARROW_BREAKPOINT_PX) and derive their
  // widths from it to keep the relationship explicit.
  const WIDE = NARROW_BREAKPOINT_PX + 160;
  const NARROW = NARROW_BREAKPOINT_PX - 140;

  it('should return false for isNarrow and isNarrowerThan() before the container is measured', () => {
    const { result } = renderHook(() => useContainerWidth());

    expect(result.current.width).toBeNull();
    expect(result.current.isNarrow).toBe(false);
    expect(result.current.isNarrowerThan(NARROW)).toBe(false);
  });

  it('should return false for isNarrow when the container is wider than the default breakpoint', () => {
    const { result } = renderHook(() => useContainerWidth());

    act(() => result.current.ref(makeNode(WIDE)));

    expect(result.current.width).toBe(WIDE);
    expect(result.current.isNarrow).toBe(false);
  });

  it('should return true for isNarrow when the container is narrower than the default breakpoint', () => {
    const { result } = renderHook(() => useContainerWidth());

    act(() => result.current.ref(makeNode(NARROW)));

    expect(result.current.width).toBe(NARROW);
    expect(result.current.isNarrow).toBe(true);
  });

  it('should toggle isNarrow when the container is resized across the default breakpoint', () => {
    const { result } = renderHook(() => useContainerWidth());
    const node = makeNode(WIDE);
    act(() => result.current.ref(node));
    expect(result.current.isNarrow).toBe(false);

    emitResize(node, NARROW);
    expect(result.current.isNarrow).toBe(true);

    emitResize(node, WIDE);
    expect(result.current.isNarrow).toBe(false);
  });

  it('should round the measured width to the nearest pixel', () => {
    const { result } = renderHook(() => useContainerWidth());
    const node = makeNode(640.4);
    act(() => result.current.ref(node));
    expect(result.current.width).toBe(640);

    emitResize(node, 499.6);
    expect(result.current.width).toBe(500);
  });

  it('should return true from isNarrowerThan(px) only when the measured width is below px', () => {
    const { result } = renderHook(() => useContainerWidth());

    act(() => result.current.ref(makeNode(700)));

    expect(result.current.isNarrowerThan(800)).toBe(true);
    expect(result.current.isNarrowerThan(600)).toBe(false);
  });

  it('should use the breakpoint argument instead of the default breakpoint', () => {
    const { result } = renderHook(() =>
      useContainerWidth(TABLE_NARROW_BREAKPOINT_PX),
    );

    // WIDE is above the default breakpoint but below the table breakpoint,
    // so it is wide by default yet narrow once the table breakpoint is passed.
    act(() => result.current.ref(makeNode(WIDE)));

    expect(result.current.isNarrow).toBe(true);
  });

  it('should stay narrow until the width clears the breakpoint plus the hysteresis band', () => {
    const hysteresis = 80;
    const { result } = renderHook(() =>
      useContainerWidth(NARROW_BREAKPOINT_PX, { hysteresis }),
    );
    const node = makeNode(NARROW);
    act(() => result.current.ref(node));
    expect(result.current.isNarrow).toBe(true);

    // Back above the breakpoint but still inside the band: stays narrow.
    emitResize(node, NARROW_BREAKPOINT_PX + hysteresis - 1);
    expect(result.current.isNarrow).toBe(true);

    // Clears breakpoint + hysteresis: now wide.
    emitResize(node, NARROW_BREAKPOINT_PX + hysteresis);
    expect(result.current.isNarrow).toBe(false);
  });

  it('should report the same border-box width on the initial read and on resize', () => {
    // The sync read (getBoundingClientRect) and the observer (borderBoxSize)
    // must agree so a measured container does not flip isNarrow after mount.
    const { result } = renderHook(() => useContainerWidth());
    const node = makeNode(WIDE);
    act(() => result.current.ref(node));
    expect(result.current.width).toBe(WIDE);

    emitResize(node, WIDE);
    expect(result.current.width).toBe(WIDE);
  });

  it('should re-measure the target border-box when borderBoxSize is unavailable', () => {
    let rectWidth = WIDE;
    const node = document.createElement('div');
    node.getBoundingClientRect = () => ({ width: rectWidth } as DOMRect);

    const { result } = renderHook(() => useContainerWidth());
    act(() => result.current.ref(node));
    expect(result.current.width).toBe(WIDE);

    // Browser without borderBoxSize support: the entry exposes only `target`.
    rectWidth = NARROW;
    act(() => {
      observations
        .filter((o) => o.node === node)
        .forEach((o) =>
          o.callback([{ target: node }] as never, {} as ResizeObserver),
        );
    });

    expect(result.current.width).toBe(NARROW);
    expect(result.current.isNarrow).toBe(true);
  });

  it('should stop updating width from a node once the ref moves to another node', () => {
    const { result } = renderHook(() => useContainerWidth());
    const firstNode = makeNode(WIDE);
    act(() => result.current.ref(firstNode));

    const secondNode = makeNode(NARROW);
    act(() => result.current.ref(secondNode));
    expect(result.current.width).toBe(NARROW);

    // The detached node no longer drives the width.
    emitResize(firstNode, WIDE);
    expect(result.current.width).toBe(NARROW);
  });
});
