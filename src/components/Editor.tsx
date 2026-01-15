{"import React from 'react';
import { useEditor } from './useEditor';

interface EditorProps {
  editor: useEditor;
}

const Editor: React.FC<EditorProps> = ({ editor }) => {
  const { value } = editor;
  return (
    <div>
      <textarea value={value} onChange={(e) => editor.setValue(e.target.value)} />
    </div>
  );
};

export default Editor;