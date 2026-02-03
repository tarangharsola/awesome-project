{"import React from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  editor: useEditor;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ editor }) => {
  const { operations } = editor;
  const awareness = operations.filter((op) => op.type === 'awareness');

  if (awareness.length === 0) return null;

  return <div>Awareness consistency: {awareness.length}</div>;
};

export default AwarenessConsistency;