{"import React from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  editor: useEditor;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ editor }) => {
  const { awareness } = editor;
  return (
    <div>
      {awareness.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  );
};

export default AwarenessConsistency;