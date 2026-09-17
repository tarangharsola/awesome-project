import { useEffect } from 'react';
import { EditorInstance } from '../types/editor';

interface ShortcutParams {
  editor: EditorInstance | null;
  formatDocument: () => void;
}

export const useKeyboardShortcuts = ({ editor, formatDocument }: ShortcutParams) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Format document: Ctrl/Cmd + S
      if (ctrlKey && e.key === 's') {
        e.preventDefault();
        formatDocument();
        return;
      }

      // Trigger autocomplete: Ctrl/Cmd + Space
      if (ctrlKey && e.key === ' ') {
        e.preventDefault();
        if (editor && typeof editor.triggerAutocomplete === 'function') {
          editor.triggerAutocomplete();
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor, formatDocument]);
};
