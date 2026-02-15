{"import React from 'react';
import { useEditor } from './useEditor';

const AwarenessConsistency = () => {
  const { editorState, dispatch } = useEditor();
  const { awareness } = editorState;

  const handleAwarenessUpdate = (awareness) => {
    dispatch({ type: 'UPDATE_AWARENESS', awareness });
  };

  return (
    <div>
      {awareness.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default AwarenessConsistency;