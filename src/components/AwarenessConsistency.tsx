{"import React from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  editor: useEditor;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ editor }) => {
  const { operations } = editor;
  const awareness = operations.filter((op) => op.type === 'awareness');

  if (awareness.length === 0) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <p>Awareness consistency achieved!</p>
    </div>
  );
};

export default AwarenessConsistency;