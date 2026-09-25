import { useEffect } from 'react';
import { EditorView } from '@codemirror/view';
import { formatCode } from './formatCode';

/**
 * Hook that attaches common keyboard shortcuts to a CodeMirror editor view.
 * - Ctrl+S / Cmd+S : Prevent default and emit a "save" event via WebSocket.
 * - Ctrl+Shift+F / Cmd+Shift+F : Format the current document.
 */
export const useKeyboardShortcuts = (viewRef: React.MutableRefObject<EditorView | null>) => {
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const keydown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const ctrl = isMac ? e.metaKey : e.ctrlKey;

      // Save shortcut
      if (ctrl && e.key === 's') {
        e.preventDefault();
        // Emit a custom event that higher level components can listen to.
        const saveEvent = new CustomEvent('editor-save', { detail: { content: view.state.doc.toString() } });
        window.dispatchEvent(saveEvent);
        return;
      }

      // Format shortcut
      if (ctrl && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        const formatted = formatCode(view.state.doc.toString(), view.state.facet);
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: formatted },
        });
      }
    };

    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [viewRef]);
};
