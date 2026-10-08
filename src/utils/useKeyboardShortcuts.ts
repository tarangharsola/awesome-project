import { useEffect } from 'react';

type Options = {
  onSave?: () => void;
  onFormat?: () => void;
};

/**
 * Hook that attaches common editor keyboard shortcuts to a DOM element.
 * - Ctrl/Cmd + S → save (prevent default browser Save dialog)
 * - Ctrl/Cmd + Shift + F → format document
 */
export const useKeyboardShortcuts = (
  element: HTMLElement | null,
  options: Options = {}
) => {
  useEffect(() => {
    if (!element) return;
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const ctrl = isMac ? e.metaKey : e.ctrlKey;

      // Save shortcut
      if (ctrl && e.key.toLowerCase() === 's') {
        e.preventDefault();
        options.onSave?.();
        return;
      }

      // Format shortcut (Ctrl+Shift+F)
      if (ctrl && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        options.onFormat?.();
        return;
      }
    };
    element.addEventListener('keydown', handler);
    return () => element.removeEventListener('keydown', handler);
  }, [element, options.onSave, options.onFormat]);
};

export default useKeyboardShortcuts;
