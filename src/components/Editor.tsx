{"import React from 'react';
import { useEditor } from './useEditor';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const Editor = ({ value, onChange, language }: EditorProps) => {
  const { editorRef, handleKeyDown, handleKeyUp } = useEditor(value, onChange);

  return (
    <div className="editor" ref={editorRef} contentEditable={true} suppressContentEditableWarning={true} onInput={handleKeyDown} onKeyUp={handleKeyUp}>
      <pre>{value}</pre>
    </div>
  );
}

export default Editor;