import { useEffect } from 'react';
import { useEditor } from './useEditor';

/**
 * Hook that registers global keyboard shortcuts for the editor.
 * - Ctrl/Cmd + S : Save (currently logs to console, can be extended).
 * - Ctrl/Cmd + Shift + F : Format the document using the editor's format method.
 */
export function useKeyboardShortcuts() {
  const editor = useEditor();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Save shortcut
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        console.log('Save shortcut triggered');
        // Extend with actual save logic if needed
        return;
      }

      // Format shortcut
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        if (editor && typeof editor.format === 'function') {
          editor.format();
        }
        return;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [editor]);
}
