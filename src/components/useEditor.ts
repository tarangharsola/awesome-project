{"import { useState, useEffect } from 'react';

interface useEditor {
  editorValue: string;
  setEditorValue: (value: string) => void;
}

const useEditor = () => {
  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    // implementation...
  }, []);

  return {
    editorValue,
    setEditorValue,
  };
}

export default useEditor;