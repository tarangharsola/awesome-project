{"import React from 'react';
import { useEditor } from './useEditor';

interface EditorProps {
  editor: any;
  user: any;
}

const Editor = ({ editor, user }: EditorProps) => {
  const { state, dispatch } = useEditor(editor);
  const { cursor, selection } = state;
  const { id, name, color } = user;

  const handleTextChange = (newText: any) => {
    dispatch({ type: 'UPDATE_TEXT', payload: newText });
  };

  return (
    <div>
      <h2>Editor</h2>
      <textarea value={state.text} onChange={(e) => handleTextChange(e.target.value)}></textarea>
      <p>Cursors: {cursor.join(', ')}</p>
      <p>Selection: {selection.join(', ')}</p>
    </div>
  );
}

export default Editor;