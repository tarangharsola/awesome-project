{"import { useState, useEffect } from 'react';
import { useCursor } from './useCursor';

interface UseEditorProps {
  value: string;
}

const useEditor = ({ value }: UseEditorProps) => {
  const [editor, setEditor] = useState({ value, cursors: [], conflict: false, reconnection: false, users: [] });
  useEffect(() => {
    const interval = setInterval(() => {
      const newEditor = editor;
      newEditor.cursors = editor.getCursors();
      newEditor.conflict = editor.getConflict();
      newEditor.reconnection = editor.getReconnection();
      newEditor.users = editor.getUsers();
      setEditor(newEditor);
    }, 100);
    return () => clearInterval(interval);
  }, [editor]);
  return editor;
};

export default useEditor;