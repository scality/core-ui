import { act, renderHook } from '@testing-library/react';
import { useContainerWidth } from './useContainerWidth';

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

  it('should report no width until the container has been measured', () => {
    const { result } = renderHook(() => useContainerWidth());

    expect(result.current.width).toBeUndefined();
  });

  it('should report the container width once it is measured', () => {
    const { result } = renderHook(() => useContainerWidth());

    act(() => result.current.ref(makeNode(800)));

    expect(result.current.width).toBe(800);
  });

  it('should update the width when the container is resized', () => {
    const { result } = renderHook(() => useContainerWidth());
    const node = makeNode(800);
    act(() => result.current.ref(node));
    expect(result.current.width).toBe(800);

    emitResize(node, 500);
    expect(result.current.width).toBe(500);
  });

  it('should round the measured width to the nearest pixel', () => {
    const { result } = renderHook(() => useContainerWidth());
    const node = makeNode(640.4);
    act(() => result.current.ref(node));
    expect(result.current.width).toBe(640);

    emitResize(node, 499.6);
    expect(result.current.width).toBe(500);
  });

  it('should report the same border-box width on the initial read and on resize', () => {
    // The sync read (getBoundingClientRect) and the observer (borderBoxSize)
    // must agree so a measured container's width does not jump after mount.
    const { result } = renderHook(() => useContainerWidth());
    const node = makeNode(800);
    act(() => result.current.ref(node));
    expect(result.current.width).toBe(800);

    emitResize(node, 800);
    expect(result.current.width).toBe(800);
  });

  it('should re-measure the target border-box when borderBoxSize is unavailable', () => {
    let rectWidth = 800;
    const node = document.createElement('div');
    node.getBoundingClientRect = () => ({ width: rectWidth } as DOMRect);

    const { result } = renderHook(() => useContainerWidth());
    act(() => result.current.ref(node));
    expect(result.current.width).toBe(800);

    // Browser without borderBoxSize support: the entry exposes only `target`.
    rectWidth = 500;
    act(() => {
      observations
        .filter((o) => o.node === node)
        .forEach((o) =>
          o.callback([{ target: node }] as never, {} as ResizeObserver),
        );
    });

    expect(result.current.width).toBe(500);
  });

  it('should stop updating width from a node once the ref moves to another node', () => {
    const { result } = renderHook(() => useContainerWidth());
    const firstNode = makeNode(800);
    act(() => result.current.ref(firstNode));

    const secondNode = makeNode(500);
    act(() => result.current.ref(secondNode));
    expect(result.current.width).toBe(500);

    // The detached node no longer drives the width.
    emitResize(firstNode, 800);
    expect(result.current.width).toBe(500);
  });
});
