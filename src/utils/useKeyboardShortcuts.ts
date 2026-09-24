import { useEffect } from 'react';

interface ShortcutHandlers {
  onSave?: () => void;
  onFormat?: () => void;
  // Extend with more handlers as needed
}

/**
 * Attaches global keyboard shortcuts for the editor.
 * - Ctrl+S / Cmd+S : Save (calls onSave)
 * - Ctrl+Shift+F / Cmd+Shift+F : Format (calls onFormat)
 */
export const useKeyboardShortcuts = ({ onSave, onFormat }: ShortcutHandlers) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Save shortcut
      if (ctrlKey && !e.shiftKey && e.key === 's') {
        e.preventDefault();
        if (onSave) onSave();
        return;
      }

      // Format shortcut
      if (ctrlKey && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        if (onFormat) onFormat();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSave, onFormat]);
};