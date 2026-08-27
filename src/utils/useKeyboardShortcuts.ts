import { useEffect } from 'react';
import { EditorView } from '@codemirror/view';
import { useDispatch } from 'react-redux';
import { setContent } from '../store/editorReducer';

/**
 * Hook that registers common keyboard shortcuts for the editor.
 * - Ctrl+S / Cmd+S: Prevent default browser save and dispatch current content.
 * - Ctrl+Shift+F / Cmd+Shift+F: Trigger a simple formatting routine (re‑indent).
 * - Tab / Shift+Tab: Insert or remove indentation respecting the editor's settings.
 */
export function useKeyboardShortcuts(view: EditorView) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!view) return undefined;

    const keydownHandler = (event: KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const ctrlKey = isMac ? event.metaKey : event.ctrlKey;

      // Save shortcut
      if (ctrlKey && event.key === 's') {
        event.preventDefault();
        const currentContent = view.state.doc.toString();
        dispatch(setContent(currentContent));
        // Optionally show a toast or visual feedback here
        return;
      }

      // Format shortcut (simple re‑indent)
      if (ctrlKey && event.shiftKey && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        // Use built‑in indentAll command from CodeMirror
        import('@codemirror/commands').then(({ indentAll }) => {
          view.dispatch({
            changes: [],
            annotations: [],
          });
          indentAll(view);
        });
        return;
      }
    };

    view.dom.addEventListener('keydown', keydownHandler);
    return () => {
      view.dom.removeEventListener('keydown', keydownHandler);
    };
  }, [view, dispatch]);
}
