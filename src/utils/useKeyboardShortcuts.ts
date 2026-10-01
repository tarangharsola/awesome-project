import { useEffect } from 'react';

/**
 * Registers global keyboard shortcuts for the editor.
 * - Ctrl/Cmd + S → dispatches a custom "editor-save" event with current content.
 * - Ctrl/Cmd + Shift + F → dispatches a custom "editor-format" event.
 * The editor instance is expected to expose a `state.doc.toString()` method.
 */
export const useKeyboardShortcuts = (editor: any) => {
  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Save shortcut
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        const content = editor.state?.doc?.toString?.() ?? '';
        const saveEvent = new CustomEvent('editor-save', { detail: { content } });
        window.dispatchEvent(saveEvent);
        return;
      }

      // Format shortcut (Ctrl/Cmd + Shift + F)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        const formatEvent = new Event('editor-format');
        window.dispatchEvent(formatEvent);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);
};
