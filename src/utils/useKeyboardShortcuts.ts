import { useEffect } from 'react';
import { EditorView } from '@codemirror/view';
import { toggleComment } from '@codemirror/comment';
import { formatCode } from './formatCode';

/**
 * Hook that attaches common keyboard shortcuts to a CodeMirror editor.
 * - Ctrl+/      : Toggle line comment
 * - Ctrl+Shift+F: Format the entire document using the language‑specific formatter
 */
const useKeyboardShortcuts = (
  editorRef: React.RefObject<HTMLElement>,
  language: string
) => {
  useEffect(() => {
    const element = editorRef.current;
    if (!element) return;

    const view = (element as any).cmView as EditorView | undefined;
    if (!view) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle comment: Ctrl + /
      if (e.ctrlKey && e.key === '/') {
        view.dispatch({
          effects: toggleComment.of(true),
        });
        e.preventDefault();
        return;
      }

      // Format document: Ctrl + Shift + F
      if (e.ctrlKey && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
        const currentCode = view.state.doc.toString();
        const formatted = formatCode(currentCode, language);
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: formatted },
        });
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editorRef, language]);
};

export default useKeyboardShortcuts;
