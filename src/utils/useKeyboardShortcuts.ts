import { useEffect } from 'react';
import * as monaco from 'monaco-editor';

type Params = {
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
  onSave?: () => void;
};

export const useKeyboardShortcuts = ({ editorRef, onSave }: Params) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Prevent browser's default Save dialog and trigger custom save
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        onSave?.();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSave]);
};