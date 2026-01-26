{"import React from 'react';
import { useEditor } from './useEditor';

interface EditorProps {
  editor: useEditor;
}

const Editor = ({ editor }: EditorProps) => {
  const { operations } = editor;
  return <div>{operations.map((op, index) => <div key={index}>{op.type} {op.position}</div>)}</div);
};

export default Editor;