{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: useEditor;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ editor }) => {
  const { operations } = editor;
  const conflicts = operations.filter((operation, index) => {
    const previousOperation = operations[index - 1];
    return previousOperation && previousOperation.type === operation.type && previousOperation.path === operation.path;
  });

  if (conflicts.length === 0) return null;

  return (
    <div>
      {conflicts.map((conflict, index) => (
        <div key={index}>{`Conflict at ${conflict.path}`}</div>
      ))}
    </div>
  );
};

export default ConflictResolver;