import { act, render, screen } from '@testing-library/react';
import { CoreUiThemeProvider } from '../coreuithemeprovider/CoreUiThemeProvider';
import { coreUIAvailableThemes } from '../../style/theme';
import { TextArea } from './TextArea.component';

// jsdom does no layout: stub ResizeObserver so tests can emit width changes,
// and drive scrollHeight from a variable to simulate content re-wrapping.
type ResizeCallback = (
  entries: { borderBoxSize: { inlineSize: number }[] }[],
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

const emitResize = (node: Element, width: number) => {
  act(() => {
    observations
      .filter((o) => o.node === node)
      .forEach((o) => o.callback([{ borderBoxSize: [{ inlineSize: width }] }]));
  });
};

let contentHeight = 0;

const renderTextArea = (props: Parameters<typeof TextArea>[0]) =>
  render(
    <CoreUiThemeProvider theme={coreUIAvailableThemes.darkRebrand}>
      <TextArea aria-label="code" {...props} />
    </CoreUiThemeProvider>,
  );

describe('TextArea autoGrow', () => {
  const originalResizeObserver = global.ResizeObserver;
  const originalScrollHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'scrollHeight',
  );

  beforeAll(() => {
    // @ts-expect-error assigning a stub to the global
    global.ResizeObserver = ResizeObserverMock;
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get: () => contentHeight,
    });
  });

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver;
    if (originalScrollHeight) {
      Object.defineProperty(
        HTMLElement.prototype,
        'scrollHeight',
        originalScrollHeight,
      );
    }
  });

  beforeEach(() => {
    observations = [];
    contentHeight = 0;
  });

  it('fits the content height on mount', () => {
    contentHeight = 60;
    renderTextArea({ value: 'a\nb\nc', readOnly: true, autoGrow: true });
    expect(screen.getByLabelText('code').style.height).toBe('60px');
  });

  it('re-fits the height when its width changes and lines re-wrap', () => {
    contentHeight = 60;
    renderTextArea({ value: 'a long line', readOnly: true, autoGrow: true });
    const textarea = screen.getByLabelText('code');
    emitResize(textarea, 500);

    contentHeight = 120;
    emitResize(textarea, 250);

    expect(textarea.style.height).toBe('120px');
  });

  it('re-fits on the first observed width, in case layout changed since mount', () => {
    contentHeight = 60;
    renderTextArea({ value: 'a long line', readOnly: true, autoGrow: true });
    const textarea = screen.getByLabelText('code');

    contentHeight = 120;
    emitResize(textarea, 250);

    expect(textarea.style.height).toBe('120px');
  });

  it('does not observe resizes when autoGrow is off', () => {
    renderTextArea({ value: 'text', readOnly: true });
    expect(observations).toHaveLength(0);
  });
});
