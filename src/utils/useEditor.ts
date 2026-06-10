{"import { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';

const useEditor = () => {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const editor = new Editor(document.getElementById('editor'));
    setEditor(editor);
  }, []);

  return { editor };
};

export default useEditor;