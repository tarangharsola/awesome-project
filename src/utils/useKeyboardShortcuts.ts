import { useEffect } from 'react';

export const useKeyboardShortcuts = (editorView, actions) => {
  useEffect(() => {
    if (!editorView) return;
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        actions.save?.();
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        actions.format?.();
      }
    };
    editorView.dom.addEventListener('keydown', handler);
    return () => {
      editorView.dom.removeEventListener('keydown', handler);
    };
  }, [editorView, actions]);
};

export default useKeyboardShortcuts;
