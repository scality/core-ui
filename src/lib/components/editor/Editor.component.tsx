import { json } from '@codemirror/lang-json';
import type { Extension } from '@codemirror/state';
import { EditorView, ViewPlugin } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import { jsonSchema as jsonSchemaExtension } from 'codemirror-json-schema';
import type { JSONSchema7 } from 'json-schema';
import { useMemo, useRef } from 'react';
import { useTheme } from 'styled-components';
import type { CoreUITheme } from '../../style/theme';
import { createEditorTheme } from './editorTheme';

const EDIT_KEYS = new Set(['Backspace', 'Delete', 'Enter', 'Tab']);

export function isEditAttempt(e: KeyboardEvent): boolean {
  const isTyping = !e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1;
  const isCutPaste = (e.ctrlKey || e.metaKey) && (e.key === 'x' || e.key === 'v');
  return isTyping || EDIT_KEYS.has(e.key) || isCutPaste;
}

export function createReadOnlyTooltipExtension(): Extension {
  return ViewPlugin.define((view) => {
    let tooltip: HTMLDivElement | null = null;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    let wrapper: HTMLDivElement | null = null;

    const dismiss = () => {
      tooltip?.remove();
      tooltip = null;
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = null;
    };

    const show = () => {
      if (hideTimer) clearTimeout(hideTimer);

      const head = view.state.selection.main.head;
      const coords = view.coordsAtPos(head);
      if (!coords) return;

      if (!wrapper) {
        wrapper = document.createElement('div');
        Object.assign(wrapper.style, {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: '100',
        });
        view.dom.parentElement?.appendChild(wrapper);
      }

      const parentRect =
        wrapper.offsetParent?.getBoundingClientRect() ??
        view.dom.getBoundingClientRect();

      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'cm-readonly-tooltip';
        tooltip.textContent = 'Cannot edit in read-only editor';
        tooltip.setAttribute('role', 'status');
        tooltip.setAttribute('aria-live', 'polite');
        Object.assign(tooltip.style, {
          position: 'absolute',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        });
        wrapper.appendChild(tooltip);
      }

      tooltip.style.left = `${coords.left - parentRect.left}px`;
      tooltip.style.top = `${coords.bottom - parentRect.top + 4}px`;

      hideTimer = setTimeout(dismiss, 2000);
    };

    const handler = (e: KeyboardEvent) => {
      if (isEditAttempt(e)) show();
    };

    view.dom.addEventListener('keydown', handler, true);

    return {
      destroy() {
        view.dom.removeEventListener('keydown', handler, true);
        dismiss();
        wrapper?.remove();
      },
    };
  });
}

export interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  language?: 'json' | { name: 'json'; schema?: JSONSchema7 };
  height?: string;
  width?: string;
}

export const Editor = ({
  value,
  onChange,
  readOnly = false,
  language = 'json',
  height = '400px',
  width = '100%',
}: EditorProps) => {
  const theme = useTheme() as CoreUITheme;

  const editorTheme = useMemo(() => createEditorTheme(theme), [theme]);

  const langName = typeof language === 'string' ? language : language.name;
  const schema = typeof language === 'object' ? language.schema : undefined;

  const readOnlyTooltipExt = useRef<Extension | null>(null);
  if (!readOnlyTooltipExt.current) {
    readOnlyTooltipExt.current = createReadOnlyTooltipExtension();
  }

  const extensions = useMemo(() => {
    const exts: Extension[] = [];
    if (langName === 'json') {
      if (schema) {
        exts.push(...jsonSchemaExtension(schema));
      } else {
        exts.push(json());
      }
    }
    if (readOnly) {
      exts.push(readOnlyTooltipExt.current!);
    }
    return exts;
  }, [langName, schema, readOnly]);

  return (
    <CodeMirror
      value={value}
      height={height}
      width={width}
      extensions={extensions}
      onChange={onChange}
      readOnly={readOnly}
      theme={editorTheme}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        autocompletion: true,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        indentOnInput: true,
        bracketMatching: true,
        closeBrackets: true,
      }}
    />
  );
};
