{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: useEditor;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ editor }) => {
  const { conflicts } = editor;
  return (
    <div>
      {conflicts.map((conflict, index) => (
        <div key={index}>{conflict.message}</div>
      ))}
    </div>
  );
};

export default ConflictResolver;