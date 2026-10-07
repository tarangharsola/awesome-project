import { useEffect } from 'react';

export default function useKeyboardShortcuts(editorRef: React.RefObject<any>, language: string) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Save shortcut: Ctrl/Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        console.log('Save shortcut triggered'); // Placeholder for actual save logic
      }

      // Format shortcut: Ctrl/Cmd+Shift+F
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        if (editorRef.current && typeof editorRef.current.getAction === 'function') {
          const formatAction = editorRef.current.getAction('editor.action.formatDocument');
          if (formatAction) {
            formatAction.run();
          }
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [editorRef, language]);
}
