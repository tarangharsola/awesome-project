{"import React from 'react';
import { useEditor } from './useEditor';

interface EditorProps {
  editor: useEditor;
}

const Editor = ({ editor }: EditorProps) => {
  const { state, dispatch } = editor;
  const { text } = state;

  const handleTextChange = (text: string) => {
    dispatch({ type: 'UPDATE_TEXT', payload: text });
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => handleTextChange(e.target.value)} />
    </div>
  );

  return handleTextChange;
};

export default Editor;