{"import React from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  editor: useEditor;
}

const AwarenessConsistency = ({ editor }: AwarenessConsistencyProps) => {
  const { state, dispatch } = editor;
  const { cursors } = state;

  const handleCursorUpdate = (cursor: any) => {
    dispatch({ type: 'UPDATE_CURSOR', payload: cursor });
  };

  return (
    <div>
      {cursors.map((cursor, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: cursor.x,
          top: cursor.y,
          width: 2,
          height: 2,
          backgroundColor: cursor.color
        }}>
        </div>
      ))}
    </div>
  );

  return handleCursorUpdate;
};

export default AwarenessConsistency;