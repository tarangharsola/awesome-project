{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: useEditor;
}

const ConflictResolver = ({ editor }: ConflictResolverProps) => {
  const { operations } = editor;
  const conflicts = operations.filter((op) => op.type === 'insert' && op.position !== editor.cursor.position);
  return <div>Conflicts: {conflicts.length}</div);
};

export default ConflictResolver;