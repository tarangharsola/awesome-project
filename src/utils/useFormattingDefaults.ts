import { EditorView } from '@codemirror/view';
import { indentUnit } from '@codemirror/language';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { oneDark } from '@codemirror/theme-one-dark';

/**
 * Provides a set of default CodeMirror extensions for consistent formatting.
 * - Two‑space indentation
 * - Line wrapping
 * - Dark theme (oneDark)
 * - Default syntax highlighting style
 */
export const useFormattingDefaults = () => [
  indentUnit.of('  '), // two spaces per indent level
  EditorView.lineWrapping,
  oneDark,
  defaultHighlightStyle,
];