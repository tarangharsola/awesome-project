{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: useEditor;
}

const ConflictResolver = ({ editor }: ConflictResolverProps) => {
  const { operations } = editor;
  const conflicts = operations.filter((op) => op.type === 'insert' && op.position !== operations[0].position);
  return <div>Conflicts: {conflicts.length}</div);
};

export default ConflictResolver;