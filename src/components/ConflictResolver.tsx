{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: useEditor;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ editor }) => {
  const { conflict } = editor;
  return (
    <div>
      {conflict.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  );
};

export default ConflictResolver;