{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: useEditor;
}

const ConflictResolver = ({ editor }: ConflictResolverProps) => {
  const { operations } = editor;
  const conflicts = operations.filter((operation) => operation.type === 'conflict');
  return (
    <div>
      {conflicts.map((conflict, index) => (
        <div key={index}>{conflict.message}</div>
      ))}
    </div>
  );
};

export default ConflictResolver;