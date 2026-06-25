import { act, renderHook } from '@testing-library/react';
import {
  NARROW_BREAKPOINT_PX,
  TABLE_NARROW_BREAKPOINT_PX,
  useContainerWidth,
} from './useContainerWidth';

// jsdom ships no ResizeObserver, so we stub a controllable one: each instance
// registers the (callback, node) pairs it observes, and `emitResize` lets a
// test push a new content-box width as if the element had been resized.
type ResizeCallback = (
  entries: { contentRect: { width: number } }[],
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

const makeNode = (initialWidth: number) => {
  const node = document.createElement('div');
  node.getBoundingClientRect = () => ({ width: initialWidth } as DOMRect);
  return node;
};

const emitResize = (node: Element, width: number) => {
  act(() => {
    observations
      .filter((o) => o.node === node)
      .forEach((o) =>
        o.callback([{ contentRect: { width } }], {} as ResizeObserver),
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

  it('reports the wide layout before the container has been measured', () => {
    const { result } = renderHook(() => useContainerWidth());

    expect(result.current.width).toBeNull();
    expect(result.current.isNarrow).toBe(false);
    expect(result.current.isNarrowerThan(100)).toBe(false);
  });

  it('stays wide for a container measured above the breakpoint', () => {
    const { result } = renderHook(() => useContainerWidth());

    act(() => result.current.ref(makeNode(800)));

    expect(result.current.width).toBe(800);
    expect(result.current.isNarrow).toBe(false);
  });

  it('switches to narrow for a container measured below the breakpoint', () => {
    const { result } = renderHook(() => useContainerWidth());

    act(() => result.current.ref(makeNode(500)));

    expect(result.current.width).toBe(500);
    expect(result.current.isNarrow).toBe(true);
  });

  it('reacts to later resize events in both directions', () => {
    const { result } = renderHook(() => useContainerWidth());
    const node = makeNode(800);
    act(() => result.current.ref(node));
    expect(result.current.isNarrow).toBe(false);

    emitResize(node, 500);
    expect(result.current.isNarrow).toBe(true);

    emitResize(node, 800);
    expect(result.current.isNarrow).toBe(false);
  });

  it('rounds the measured width to the nearest pixel', () => {
    const { result } = renderHook(() => useContainerWidth());
    const node = makeNode(640.4);
    act(() => result.current.ref(node));
    expect(result.current.width).toBe(640);

    emitResize(node, 499.6);
    expect(result.current.width).toBe(500);
  });

  it('compares the measured width against an arbitrary width via isNarrowerThan', () => {
    const { result } = renderHook(() => useContainerWidth());

    act(() => result.current.ref(makeNode(700)));

    expect(result.current.isNarrowerThan(800)).toBe(true);
    expect(result.current.isNarrowerThan(600)).toBe(false);
  });

  it('honours a custom breakpoint', () => {
    const { result } = renderHook(() =>
      useContainerWidth(TABLE_NARROW_BREAKPOINT_PX),
    );

    // 800 is wide for the default 640 breakpoint but narrow for the table one.
    act(() => result.current.ref(makeNode(800)));

    expect(result.current.isNarrow).toBe(true);
  });

  it('requires the container to clear the hysteresis band before leaving narrow', () => {
    const { result } = renderHook(() =>
      useContainerWidth(NARROW_BREAKPOINT_PX, { hysteresis: 80 }),
    );
    const node = makeNode(500);
    act(() => result.current.ref(node));
    expect(result.current.isNarrow).toBe(true);

    // Back above the breakpoint but still inside the band (640..720): stays narrow.
    emitResize(node, 700);
    expect(result.current.isNarrow).toBe(true);

    // Clears breakpoint + hysteresis: now wide.
    emitResize(node, 720);
    expect(result.current.isNarrow).toBe(false);
  });

  it('stops observing the previous node when the ref moves to another element', () => {
    const { result } = renderHook(() => useContainerWidth());
    const firstNode = makeNode(800);
    act(() => result.current.ref(firstNode));

    const secondNode = makeNode(500);
    act(() => result.current.ref(secondNode));
    expect(result.current.isNarrow).toBe(true);

    // The detached node no longer drives the width.
    emitResize(firstNode, 900);
    expect(result.current.width).toBe(500);
  });
});
