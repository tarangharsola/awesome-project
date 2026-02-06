{"import React from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  editor: useEditor;
}

const AwarenessConsistency = ({ editor }: AwarenessConsistencyProps) => {
  const { cursorPositions, users } = editor.state;
  return (
    <div>
      {cursorPositions.map((position, index) => (
        <div key={index}>{users[index].name} at {position}</div>
      ))}
    </div>
  );
};

export default AwarenessConsistency;