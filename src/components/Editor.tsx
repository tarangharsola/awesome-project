{"import React from 'react';
import { useEditor } from './useEditor';

interface EditorProps {
  editor: any;
}

const Editor: React.FC<EditorProps> = ({ editor }) => {
  const { value, onChange } = useEditor(editor);
  return <textarea value={value} onChange={onChange} />;
}

export default Editor;