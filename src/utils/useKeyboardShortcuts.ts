import { useEffect } from 'react';
import { editor } from 'monaco-editor';
import { formatCode } from '../utils/formatCode';

/**
 * Hook to attach common keyboard shortcuts to the Monaco editor instance.
 * - Ctrl+Shift+F / Cmd+Shift+F: Format the current document using the project's formatter.
 * - Ctrl+L / Cmd+L: Cycle through supported languages (JavaScript → Python → HTML).
 */
export const useKeyboardShortcuts = (
  editorInstance: editor.IStandaloneCodeEditor | null,
  getLanguage: () => string,
  setLanguage: (lang: string) => void
) => {
  useEffect(() => {
    if (!editorInstance) return;

    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrl = isMac ? e.metaKey : e.ctrlKey;

      // Format shortcut: Ctrl+Shift+F (or Cmd+Shift+F)
      if (ctrl && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        const code = editorInstance.getValue();
        const formatted = formatCode(code, getLanguage());
        if (formatted !== null) {
          editorInstance.setValue(formatted);
        }
        return;
      }

      // Language cycle shortcut: Ctrl+L (or Cmd+L)
      if (ctrl && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        const supported = ['javascript', 'python', 'html'];
        const current = getLanguage();
        const idx = supported.indexOf(current);
        const next = supported[(idx + 1) % supported.length];
        setLanguage(next);
        return;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [editorInstance, getLanguage, setLanguage]);
};
