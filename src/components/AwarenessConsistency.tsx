{"import React from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  editor: useEditor;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ editor }) => {
  const { operations } = editor;
  const consistentOperations = operations.reduce((acc, operation) => {
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
  return <div>Awareness Consistency</div>;
};

export default AwarenessConsistency;