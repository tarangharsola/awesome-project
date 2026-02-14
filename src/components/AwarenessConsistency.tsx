{"import React from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  editor: useEditor;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ editor }) => {
  const { operations } = editor;
  const awareness = operations.filter((operation) => operation.type === 'awareness');

  return (
    <div>
      {awareness.map((awareness, index) => (
        <div key={index}>{`Awareness at ${awareness.path}`}</div>
      ))}
    </div>
  );
};

export default AwarenessConsistency;