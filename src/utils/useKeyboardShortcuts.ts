import { useEffect } from 'react';
import { EditorView } from '@codemirror/view';
import { formatCode } from './formatCode';

/**
 * Hook to attach common keyboard shortcuts to a CodeMirror editor.
 * - Ctrl+S / Cmd+S: triggers optional onSave callback.
 * - Ctrl+Shift+F / Cmd+Shift+F: formats the whole document.
 */
export const useKeyboardShortcuts = (view: EditorView | null, onSave?: () => void) => {
  useEffect(() => {
    if (!view) return;
    const handler = (event: KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const ctrl = isMac ? event.metaKey : event.ctrlKey;

      // Save shortcut
      if (ctrl && event.key === 's') {
        event.preventDefault();
        onSave?.();
        return;
      }

      // Format shortcut
      if (ctrl && event.shiftKey && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        const formatted = formatCode(view.state.doc.toString());
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: formatted },
        });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [view, onSave]);
};
