{"import React from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  editor: useEditor;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ editor }) => {
  const { operations } = editor;
  const { awareness } = operations;

  if (!awareness.length) return null;

  return (
    <div>
      {awareness.map((user, index) => (
        <div key={index}>{user.name} ({user.color})</div>
      ))}
    </div>
  );
};

export default AwarenessConsistency;