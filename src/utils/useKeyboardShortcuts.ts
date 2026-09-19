import { useEffect } from 'react';

type Callbacks = {
  save?: () => void;
  format?: () => void;
};

/**
 * Attaches keyboard shortcuts to a Monaco editor instance.
 * - Ctrl/Cmd+S → save (copies current code to clipboard)
 * - Ctrl/Cmd+Shift+F → format (runs the provided format callback)
 */
export default function useKeyboardShortcuts(
  editor: monaco.editor.IStandaloneCodeEditor | null,
  callbacks: Callbacks
) {
  useEffect(() => {
    if (!editor) return;
    const domNode = editor.getDomNode();
    if (!domNode) return;

    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Save shortcut
      if (ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        callbacks.save?.();
        return;
      }

      // Format shortcut (Ctrl/Cmd+Shift+F)
      if (ctrlKey && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        callbacks.format?.();
        return;
      }
    };

    domNode.addEventListener('keydown', handler);
    return () => {
      domNode.removeEventListener('keydown', handler);
    };
  }, [editor, callbacks]);
}
