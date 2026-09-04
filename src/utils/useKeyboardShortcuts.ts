// src/utils/useKeyboardShortcuts.ts
import { useEffect } from 'react';

export const useKeyboardShortcuts = (
  formatCallback: () => void,
  focusEditor: () => void
) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+Shift+F (or Cmd+Shift+F) to format document
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        formatCallback();
      }
      // Ctrl+S (or Cmd+S) to focus editor (or trigger save placeholder)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        focusEditor();
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [formatCallback, focusEditor]);
};