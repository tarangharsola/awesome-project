import { useEffect } from 'react';

interface ShortcutHandlers {
  onFormat?: () => void;
  onSave?: () => void;
}

export const useKeyboardShortcuts = (handlers: ShortcutHandlers) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      // Ctrl+Shift+F => format document
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        handlers.onFormat?.();
        return;
      }
      // Ctrl+S => save (placeholder, can be extended)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handlers.onSave?.();
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [handlers]);
};