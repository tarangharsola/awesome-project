{"import { useState, useEffect } from 'react';

interface EditorProps {
  editor: any;
}

const useEditor = (editor: EditorProps) => {
  const [value, setValue] = useState('');
  const [onChange, setOnChange] = useState(() => () => {});
  useEffect(() => {
    const handleEditorChange = () => {
      setValue(editor.value);
    };
    editor.addEventListener('change', handleEditorChange);
    return () => {
      editor.removeEventListener('change', handleEditorChange);
    };
  }, [editor]);
  useEffect(() => {
    const handleEditorChange = () => {
      setOnChange(() => editor.onChange);
    };
    editor.addEventListener('change', handleEditorChange);
    return () => {
      editor.removeEventListener('change', handleEditorChange);
    };
  }, [editor]);
  return { value, onChange };
};

export default useEditor;