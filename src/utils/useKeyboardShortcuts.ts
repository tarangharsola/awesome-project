import { keymap } from '@codemirror/view';
import { EditorView } from '@codemirror/view';

/**
 * Returns a CodeMirror keymap extension that adds common editor shortcuts.
 * - Mod-s: placeholder for future save functionality.
 * - Mod-Shift-f: formats the document by trimming trailing whitespace on each line.
 * Additional shortcuts can be added here as needed.
 */
export const useKeyboardShortcuts = () => {
  const formatDocument = (view: EditorView) => {
    const doc = view.state.doc.toString();
    const formatted = doc
      .split('\n')
      .map((line) => line.replace(/\s+$/u, '')) // trim trailing spaces
      .join('\n');
    if (formatted !== doc) {
      view.dispatch({
        changes: { from: 0, to: doc.length, insert: formatted },
      });
    }
    return true;
  };

  const savePlaceholder = (view: EditorView) => {
    // In a full app this would trigger a save to the server or local storage.
    // Keeping it as a no‑op for now but returning true prevents the default browser action.
    return true;
  };

  return keymap.of([
    { key: 'Mod-s', run: savePlaceholder },
    { key: 'Mod-Shift-f', run: formatDocument },
    // Existing shortcuts can be spread here if needed.
  ]);
};
