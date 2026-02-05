{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: useEditor;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ editor }) => {
  const { operations } = editor;
  const conflicts = operations.filter((op) => op.type === 'conflict');

  if (conflicts.length === 0) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <p>Conflict detected!</p>
    </div>
  );
};

export default ConflictResolver;