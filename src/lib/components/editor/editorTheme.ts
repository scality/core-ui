import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { getLuminance } from 'polished';
import type { Extension } from '@codemirror/state';
import type { CoreUITheme } from '../../style/theme';
import { lineColor5 } from '../../style/theme';

export function isDarkBackground(theme: CoreUITheme): boolean {
  try {
    return getLuminance(theme.backgroundLevel1) < 0.5;
  } catch {
    return true;
  }
}

function getSyntaxColors(theme: CoreUITheme, isDark: boolean) {
  if (isDark) {
    return {
      property: theme.statusHealthy,
      string: lineColor5,
      number: lineColor5,
      boolean: lineColor5,
      null: theme.textSecondary,
      bracket: theme.textPrimary,
      punctuation: theme.textPrimary,
    };
  }
  return {
    property: '#4078F2',
    string: '#50A14F',
    number: '#986801',
    boolean: '#0184BC',
    null: '#0184BC',
    bracket: '#383A42',
    punctuation: '#383A42',
  };
}

export function createEditorTheme(theme: CoreUITheme): Extension {
  const isDark = isDarkBackground(theme);
  const syntax = getSyntaxColors(theme, isDark);

  const editorViewTheme = EditorView.theme(
    {
      '&': {
        backgroundColor: theme.backgroundLevel1,
        color: theme.textPrimary,
      },
      '.cm-content': {
        caretColor: theme.textPrimary,
        fontFamily: "'Courier New', monospace",
        fontSize: '12px',
      },
      '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: theme.textPrimary,
      },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
        {
          backgroundColor: theme.highlight,
        },
      '.cm-gutters': {
        backgroundColor: theme.backgroundLevel1,
        color: theme.textSecondary,
        border: 'none',
        borderRight: `1px solid ${theme.border}`,
      },
      '.cm-activeLineGutter': {
        backgroundColor: theme.backgroundLevel3,
      },
      '.cm-activeLine': {
        backgroundColor: theme.backgroundLevel3,
      },
      '.cm-foldPlaceholder': {
        backgroundColor: 'transparent',
        border: 'none',
        color: theme.textSecondary,
      },
      '.cm-diagnostic-error': {
        borderLeftColor: theme.statusCritical,
      },
      '.cm-diagnostic-warning': {
        borderLeftColor: theme.statusWarning,
      },
      '.cm-lintRange-error': {
        backgroundImage: 'none',
        textDecoration: `underline wavy ${theme.statusCritical}`,
      },
      '.cm-lintRange-warning': {
        backgroundImage: 'none',
        textDecoration: `underline wavy ${theme.statusWarning}`,
      },
      '.cm-tooltip': {
        backgroundColor: theme.backgroundLevel3,
        color: theme.textPrimary,
        border: `1px solid ${theme.border}`,
      },
      '.cm-tooltip-lint': {
        backgroundColor: theme.backgroundLevel3,
      },
      '.cm-panels': {
        backgroundColor: theme.backgroundLevel4,
        color: theme.textPrimary,
      },
      '.cm-readonly-tooltip': {
        backgroundColor: theme.backgroundLevel3,
        color: theme.textPrimary,
        border: `1px solid ${theme.border}`,
      },
    },
    { dark: isDark },
  );

  const highlightStyle = HighlightStyle.define([
    { tag: tags.propertyName, color: syntax.property },
    { tag: tags.string, color: syntax.string },
    { tag: tags.number, color: syntax.number },
    { tag: tags.bool, color: syntax.boolean },
    { tag: tags.null, color: syntax.null },
    { tag: tags.punctuation, color: syntax.punctuation },
    { tag: tags.brace, color: syntax.bracket },
    { tag: tags.squareBracket, color: syntax.bracket },
  ]);

  return [editorViewTheme, syntaxHighlighting(highlightStyle)];
}
