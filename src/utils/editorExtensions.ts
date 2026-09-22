import { Extension } from '@codemirror/state';
import { indentOnInput } from '@codemirror/language';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { lineNumbers } from '@codemirror/gutter';
import { highlightActiveLine } from '@codemirror/view';
import { Language } from '../types/editor';

/**
 * Returns an array of default CodeMirror extensions for a given language.
 * Includes line numbers, active line highlighting, indentation, and basic keymaps.
 */
export const getDefaultExtensions = (language: Language): Extension[] => {
  const baseExtensions: Extension[] = [
    lineNumbers(),
    highlightActiveLine(),
    indentOnInput(),
    history(),
    EditorView.theme({
      '&': { height: '100%', backgroundColor: '#1e1e1e', color: '#d4d4d4' },
      '.cm-content': { fontFamily: 'monospace', fontSize: '14px' },
    }),
  ];

  // Language‑specific extensions can be added here in the future.
  // For now we only return the base set.
  return baseExtensions.concat([defaultKeymap, ...historyKeymap]);
};
