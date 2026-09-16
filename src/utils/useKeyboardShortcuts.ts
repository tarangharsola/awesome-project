import { useEffect } from 'react';

/**
 * Hook to attach keyboard shortcuts to a textarea/editor.
 * Currently supports:
 *   - Ctrl+Shift+F (or Cmd+Shift+F) → format code using provided formatter.
 */
export const useKeyboardShortcuts = (
  editorRef: React.RefObject<HTMLTextAreaElement>,
  language: string,
  onFormatted: (formatted: string) => void
) => {
  useEffect(() => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const handleKeyDown = async (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Ctrl+Shift+F => format code
      if (ctrlKey && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        const original = textarea.value;
        // Dynamically import formatter to avoid loading on initial render
        const { formatCode } = await import('./formatCode');
        const formatted = formatCode(original, language);
        if (formatted !== original) {
          textarea.value = formatted;
          onFormatted(formatted);
        }
      }
    };

    textarea.addEventListener('keydown', handleKeyDown);
    return () => {
      textarea.removeEventListener('keydown', handleKeyDown);
    };
  }, [editorRef, language, onFormatted]);
};