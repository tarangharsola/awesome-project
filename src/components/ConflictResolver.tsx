{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: useEditor;
}

const ConflictResolver = ({ editor }: ConflictResolverProps) => {
  const { conflicts } = editor.state;
  return (
    <div>
      {conflicts.map((conflict, index) => (
        <div key={index}>{conflict.user.name} at {conflict.position}</div>
      ))}
    </div>
  );
};

export default ConflictResolver;