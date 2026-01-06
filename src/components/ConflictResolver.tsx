{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: useEditor;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ editor }) => {
  const { operations } = editor;
  const resolvedOperations = operations.reduce((acc, operation) => {
    if (operation.type === 'write') {
      const existingOperation = acc.find((o) => o.path === operation.path);
      if (existingOperation) {
        existingOperation.content = operation.content;
      } else {
        acc.push(operation);
      }
    }
    return acc;
  }, []);
  return <div>Conflict Resolver</div>;
};

export default ConflictResolver;