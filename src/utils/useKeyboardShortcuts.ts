import { useEffect } from 'react';
import { formatCode } from './formatCode';
import { Editor } from '@monaco-editor/react'; // Assuming Monaco is used

interface ShortcutOptions {
  editorRef: React.MutableRefObject<Editor | null>;
  onSave?: () => void;
}

/**
 * Registers common keyboard shortcuts for the editor.
 * - Ctrl+S / Cmd+S: triggers optional onSave callback.
 * - Ctrl+Shift+F / Cmd+Shift+F: formats the current document.
 */
export const useKeyboardShortcuts = ({ editorRef, onSave }: ShortcutOptions) => {
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Save shortcut
      if (ctrlKey && e.key === 's') {
        e.preventDefault();
        if (onSave) onSave();
        return;
      }

      // Format shortcut
      if (ctrlKey && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
        e.preventDefault();
        const editor = editorRef.current?.getEditor?.();
        if (!editor) return;
        const model = editor.getModel();
        if (!model) return;
        const original = model.getValue();
        const language = model.getModeId();
        try {
          const formatted = await formatCode(original, language as any);
          const fullRange = model.getFullModelRange();
          editor.executeEdits('format', [{ range: fullRange, text: formatted }]);
        } catch (err) {
          console.error('Formatting failed', err);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editorRef, onSave]);
};
