import { Extension } from '@codemirror/state';
import { indentUnit } from '@codemirror/language';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import { highlightActiveLine } from '@codemirror/view';

// Provides a consistent set of default editor extensions for formatting and UI.
export const useFormattingDefaults = (): Extension => {
  return [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightActiveLine(),
    indentUnit.of('  '), // 2 spaces indentation
  ];
};
