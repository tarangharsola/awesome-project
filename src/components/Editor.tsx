{"import React from 'react';
import { useEditor } from './useEditor';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: EditorProps) => {
  const { editorRef, handleEditorChange } = useEditor(value, onChange);
  return (
    <div ref={editorRef} contentEditable='true' suppressContentEditableWarning={true}>
      {value}
    </div>
  );
};

export default Editor;