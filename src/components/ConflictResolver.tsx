{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: useEditor;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ editor }) => {
  const { operations } = editor;
  const conflicts = operations.filter((op) => op.type === 'conflict');

  if (conflicts.length === 0) return null;

  return <div>Conflicts detected: {conflicts.length}</div>;
};

export default ConflictResolver;