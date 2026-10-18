// src/utils/useKeyboardShortcuts.ts
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { toggleLineComment } from '@codemirror/comment';
import { formatCode } from './formatCode';

/**
 * Attaches a set of useful keyboard shortcuts to the given editor view.
 * - Tab: indent
 * - Mod-Shift-f: format the whole document
 * - Mod-/: toggle line comment
 */
export const useKeyboardShortcuts = (view: EditorView | null) => {
  if (!view) return;

  const shortcuts = [
    { key: 'Tab', run: indentWithTab },
    {
      key: 'Mod-Shift-f',
      run: (v: EditorView) => {
        const formatted = formatCode(v.state.doc.toString());
        v.dispatch({
          changes: { from: 0, to: v.state.doc.length, insert: formatted },
        });
        return true;
      },
    },
    { key: 'Mod-/', run: toggleLineComment },
  ];

  view.dispatch({
    effects: EditorView.reconfigure.of(keymap.of(shortcuts)),
  });
};