import { useEffect } from 'react';

type ShortcutHandler = () => void;

interface ShortcutMap {
  format?: ShortcutHandler; // Typically Ctrl+Shift+F or Cmd+Shift+F
  save?: ShortcutHandler;   // Typically Ctrl+S or Cmd+S
  [key: string]: ShortcutHandler | undefined;
}

/**
 * Hook that registers global keyboard shortcuts for the editor.
 * It listens for keydown events and triggers the appropriate handler.
 *
 * Supported shortcuts (cross‑platform):
 *   - Format:   Ctrl+Shift+F / Cmd+Shift+F
 *   - Save:     Ctrl+S / Cmd+S
 */
export const useKeyboardShortcuts = (handlers: ShortcutMap) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Format shortcut
      if (ctrlKey && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        handlers.format && handlers.format();
        return;
      }

      // Save shortcut
      if (ctrlKey && !e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handlers.save && handlers.save();
        return;
      }
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [handlers]);
};
