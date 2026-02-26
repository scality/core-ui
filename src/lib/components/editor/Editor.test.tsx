import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { coreUIAvailableThemes } from '../../style/theme';
import { createEditorTheme, isDarkBackground } from './editorTheme';
import {
  Editor,
  isEditAttempt,
  createReadOnlyTooltipExtension,
} from './Editor.component';
import React from "react";

const mockJsonSchema = jest.fn(() => []);

jest.mock('@uiw/react-codemirror', () => {
  const MockCodeMirror = (props: {
    value?: string;
    readOnly?: boolean;
    height?: string;
    width?: string;
    onChange?: (value: string) => void;
  }) => (
    <textarea
      data-testid="codemirror-editor"
      value={props.value}
      readOnly={props.readOnly}
      style={{ height: props.height, width: props.width }}
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  );
  MockCodeMirror.displayName = 'MockCodeMirror';
  return { __esModule: true, default: MockCodeMirror };
});

jest.mock('codemirror-json-schema', () => ({
  jsonSchema: (...args: unknown[]) => (mockJsonSchema as (...a: unknown[]) => unknown).apply(null, args),
}));

const darkTheme = coreUIAvailableThemes.darkRebrand;
const lightTheme = coreUIAvailableThemes.artescaLight;

const renderWithTheme = (ui: React.ReactElement, theme = darkTheme) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

beforeEach(() => {
  mockJsonSchema.mockClear();
});

describe('isDarkBackground', () => {
  it('returns true for dark themes', () => {
    expect(isDarkBackground(darkTheme)).toBe(true);
    expect(isDarkBackground(coreUIAvailableThemes.ring9dark)).toBe(true);
    expect(isDarkBackground(coreUIAvailableThemes['G-Dark'])).toBe(true);
  });

  it('returns false for light themes', () => {
    expect(isDarkBackground(lightTheme)).toBe(false);
  });
});

describe('Editor', () => {
  it('renders with dark theme', () => {
    renderWithTheme(<Editor value='{"key": "value"}' />, darkTheme);
    expect(screen.getByTestId('codemirror-editor')).toBeInTheDocument();
  });

  it('renders with light theme', () => {
    renderWithTheme(<Editor value='{"key": "value"}' />, lightTheme);
    expect(screen.getByTestId('codemirror-editor')).toBeInTheDocument();
  });

  it('renders in read-only mode', () => {
    renderWithTheme(<Editor value='{"key": "value"}' readOnly />);
    expect(screen.getByTestId('codemirror-editor')).toHaveAttribute('readonly');
  });

  it('displays the provided value', () => {
    const json = '{"hello": "world"}';
    renderWithTheme(<Editor value={json} />);
    expect(screen.getByTestId('codemirror-editor')).toHaveValue(json);
  });

  it('renders with custom dimensions', () => {
    renderWithTheme(<Editor value="" height="200px" width="500px" />);
    const editor = screen.getByTestId('codemirror-editor');
    expect(editor).toHaveStyle({ height: '200px', width: '500px' });
  });

  it('accepts language string shorthand', () => {
    renderWithTheme(<Editor value='{"key": "value"}' language="json" />);
    expect(screen.getByTestId('codemirror-editor')).toBeInTheDocument();
  });

  it('calls jsonSchema extension when schema is provided', () => {
    const schema = {
      type: 'object' as const,
      properties: { name: { type: 'string' as const } },
    };
    renderWithTheme(
      <Editor value='{"name": "test"}' language={{ name: 'json', schema }} />,
    );
    expect(mockJsonSchema).toHaveBeenCalledWith(schema);
  });

  it('does not call jsonSchema extension without schema', () => {
    renderWithTheme(<Editor value='{}' language="json" />);
    expect(mockJsonSchema).not.toHaveBeenCalled();
  });

  it('triggers onChange callback', () => {
    const handleChange = jest.fn();
    renderWithTheme(<Editor value='{"a": 1}' onChange={handleChange} />);
    fireEvent.change(screen.getByTestId('codemirror-editor'), {
      target: { value: '{"a": 2}' },
    });
    expect(handleChange).toHaveBeenCalledWith('{"a": 2}');
  });
});

describe('isEditAttempt', () => {
  const makeEvent = (overrides: Partial<KeyboardEvent> = {}): KeyboardEvent =>
    ({
      ctrlKey: false,
      metaKey: false,
      altKey: false,
      ...overrides,
    }) as unknown as KeyboardEvent;

  it('detects regular character typing', () => {
    expect(isEditAttempt(makeEvent({ key: 'a' }))).toBe(true);
    expect(isEditAttempt(makeEvent({ key: '1' }))).toBe(true);
    expect(isEditAttempt(makeEvent({ key: ' ' }))).toBe(true);
    expect(isEditAttempt(makeEvent({ key: '{' }))).toBe(true);
  });

  it('detects edit keys (Backspace, Delete, Enter, Tab)', () => {
    expect(isEditAttempt(makeEvent({ key: 'Backspace' }))).toBe(true);
    expect(isEditAttempt(makeEvent({ key: 'Delete' }))).toBe(true);
    expect(isEditAttempt(makeEvent({ key: 'Enter' }))).toBe(true);
    expect(isEditAttempt(makeEvent({ key: 'Tab' }))).toBe(true);
  });

  it('detects cut and paste shortcuts', () => {
    expect(isEditAttempt(makeEvent({ key: 'x', ctrlKey: true }))).toBe(true);
    expect(isEditAttempt(makeEvent({ key: 'v', ctrlKey: true }))).toBe(true);
    expect(isEditAttempt(makeEvent({ key: 'x', metaKey: true }))).toBe(true);
    expect(isEditAttempt(makeEvent({ key: 'v', metaKey: true }))).toBe(true);
  });

  it('ignores copy, select-all, and undo shortcuts', () => {
    expect(isEditAttempt(makeEvent({ key: 'c', ctrlKey: true }))).toBe(false);
    expect(isEditAttempt(makeEvent({ key: 'a', ctrlKey: true }))).toBe(false);
    expect(isEditAttempt(makeEvent({ key: 'z', ctrlKey: true }))).toBe(false);
  });

  it('ignores navigation and modifier keys', () => {
    expect(isEditAttempt(makeEvent({ key: 'ArrowLeft' }))).toBe(false);
    expect(isEditAttempt(makeEvent({ key: 'ArrowUp' }))).toBe(false);
    expect(isEditAttempt(makeEvent({ key: 'Escape' }))).toBe(false);
    expect(isEditAttempt(makeEvent({ key: 'Shift' }))).toBe(false);
    expect(isEditAttempt(makeEvent({ key: 'Control' }))).toBe(false);
    expect(isEditAttempt(makeEvent({ key: 'F1' }))).toBe(false);
  });
});

describe('createEditorTheme', () => {
  it('returns two extensions for dark theme', () => {
    const result = createEditorTheme(darkTheme);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
  });

  it('returns two extensions for light theme', () => {
    const result = createEditorTheme(lightTheme);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
  });

  it('handles all available themes without errors', () => {
    Object.values(coreUIAvailableThemes).forEach((theme) => {
      expect(() => createEditorTheme(theme)).not.toThrow();
    });
  });
});

describe('createReadOnlyTooltipExtension', () => {
  let parent: HTMLDivElement;

  beforeEach(() => {
    parent = document.createElement('div');
    document.body.appendChild(parent);
  });

  afterEach(() => {
    parent.remove();
  });

  it('shows tooltip with ARIA attributes on edit attempt', () => {
    const view = new EditorView({
      state: EditorState.create({
        doc: 'hello',
        extensions: [createReadOnlyTooltipExtension()],
      }),
      parent,
    });

    jest
      .spyOn(view, 'coordsAtPos')
      .mockReturnValue({ top: 10, bottom: 20, left: 30, right: 40 });

    view.dom.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'a', bubbles: true }),
    );

    const tooltip = parent.querySelector('.cm-readonly-tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip?.getAttribute('role')).toBe('status');
    expect(tooltip?.getAttribute('aria-live')).toBe('polite');
    expect(tooltip?.textContent).toBe('Cannot edit in read-only editor');

    view.destroy();
  });

  it('dismisses tooltip after 2 seconds', () => {
    jest.useFakeTimers();

    const view = new EditorView({
      state: EditorState.create({
        doc: 'hello',
        extensions: [createReadOnlyTooltipExtension()],
      }),
      parent,
    });

    jest
      .spyOn(view, 'coordsAtPos')
      .mockReturnValue({ top: 10, bottom: 20, left: 30, right: 40 });

    view.dom.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'a', bubbles: true }),
    );
    expect(parent.querySelector('.cm-readonly-tooltip')).not.toBeNull();

    jest.advanceTimersByTime(2000);
    expect(parent.querySelector('.cm-readonly-tooltip')).toBeNull();

    view.destroy();
    jest.useRealTimers();
  });

  it('cleans up DOM elements on destroy', () => {
    const view = new EditorView({
      state: EditorState.create({
        doc: 'hello',
        extensions: [createReadOnlyTooltipExtension()],
      }),
      parent,
    });

    jest
      .spyOn(view, 'coordsAtPos')
      .mockReturnValue({ top: 10, bottom: 20, left: 30, right: 40 });

    view.dom.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'a', bubbles: true }),
    );
    expect(parent.querySelector('.cm-readonly-tooltip')).not.toBeNull();

    view.destroy();
    expect(parent.querySelector('.cm-readonly-tooltip')).toBeNull();
  });

  it('does not show tooltip for navigation keys', () => {
    const view = new EditorView({
      state: EditorState.create({
        doc: 'hello',
        extensions: [createReadOnlyTooltipExtension()],
      }),
      parent,
    });

    jest
      .spyOn(view, 'coordsAtPos')
      .mockReturnValue({ top: 10, bottom: 20, left: 30, right: 40 });

    view.dom.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
    );

    expect(parent.querySelector('.cm-readonly-tooltip')).toBeNull();

    view.destroy();
  });
});
