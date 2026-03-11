{"import { useState, useEffect } from 'react';
import { Editor } from 'slate-react';

interface EditorState {
  value: any;
  onChange: (value: any) => void;
  placeholder: string;
}

const useEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>({});

  useEffect(() => {
    const editor = new Editor();
    setEditorState({
      value: editor.value,
      onChange: (value) => editor.onChange(value),
      placeholder: editor.placeholder,
    });
  }, []);

  return editorState;
}
export default useEditor;