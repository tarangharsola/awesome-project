import { useEffect, useRef } from 'react';

type ShortcutHandler = () => void;

/**
 * Hook to register global keyboard shortcuts.
 * Shortcuts are expressed in a simplified notation similar to CodeMirror's:
 *   - "Mod" represents Ctrl on Windows/Linux and Cmd on macOS.
 *   - Modifiers can be combined with "-" (e.g., "Shift-Mod-f").
 */
export const useKeyboardShortcuts = () => {
  const shortcutsRef = useRef<Record<string, ShortcutHandler>>({});

  const registerShortcut = (combo: string, handler: ShortcutHandler) => {
    shortcutsRef.current[combo] = handler;
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const mod = isMac ? e.metaKey : e.ctrlKey;
      const key = e.key.toLowerCase();

      const parts: string[] = [];
      if (mod) parts.push('Mod');
      if (e.shiftKey) parts.push('Shift');
      if (e.altKey) parts.push('Alt');
      parts.push(key);
      const combo = parts.join('-');

      const handler = shortcutsRef.current[combo];
      if (handler) {
        e.preventDefault();
        handler();
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  return { registerShortcut };
};