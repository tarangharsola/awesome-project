{"import { useState, useEffect } from 'react';
import { Editor } from './Editor';

const useEditor = () => {
  const [editorState, setEditorState] = useState({ text: '' });

  useEffect(() => {
    const handleInput = (event) => {
      setEditorState({ text: event.target.value });
    };

    document.addEventListener('input', handleInput);

    return () => {
      document.removeEventListener('input', handleInput);
    };
  }, []);

  return { editorState, setEditorState };
};

export default useEditor;