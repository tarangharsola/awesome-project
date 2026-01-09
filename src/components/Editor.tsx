{"import React from 'react';
import { useCursor, useEditor } from './useEditor';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: EditorProps) => {
  const { cursor, editor } = useEditor(value);
  return (
    <div>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} />
      <div>Cursor: {cursor.position}</div>
    </div>
  );
}

export default Editor;