import { useEffect } from 'react';

export function useKeyboardShortcuts(
  editorElement: HTMLElement | null,
  formatCallback: () => void
) {
  useEffect(() => {
    if (!editorElement) return;
    const handler = (e: KeyboardEvent) => {
      // Ctrl+Shift+F (or Cmd+Shift+F) triggers formatting
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        formatCallback();
      }
    };
    editorElement.addEventListener('keydown', handler);
    return () => {
      editorElement.removeEventListener('keydown', handler);
    };
  }, [editorElement, formatCallback]);
}
