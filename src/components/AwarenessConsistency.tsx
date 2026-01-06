{"import React from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  editor: any;
  user: any;
}

const AwarenessConsistency = ({ editor, user }: AwarenessConsistencyProps) => {
  const { state, dispatch } = useEditor(editor);
  const { cursor, selection } = state;
  const { id, name, color } = user;

  const handleCursorChange = (newCursor: any) => {
    dispatch({ type: 'UPDATE_CURSOR', payload: newCursor });
  };

  return (
    <div>
      <h2>Awareness Consistency</h2>
      <p>Cursors: {cursor.join(', ')}</p>
      <p>Selection: {selection.join(', ')}</p>
      <button onClick={() => handleCursorChange([10, 20])}>Update Cursor</button>
    </div>
  );
}

export default AwarenessConsistency;