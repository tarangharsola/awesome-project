import { useEffect } from 'react';
import { EditorView } from '@codemirror/view';
export const useKeyboardShortcuts = (
  view: EditorView | null,
  formatCode: () => void,
  toggleLanguage: () => void
) => {
  useEffect(() => {
    if (!view) return;
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        formatCode();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        toggleLanguage();
      }
    };
    view.dom.addEventListener('keydown', handler);
    return () => {
      view.dom.removeEventListener('keydown', handler);
    };
  }, [view, formatCode, toggleLanguage]);
};
export default useKeyboardShortcuts;