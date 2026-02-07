{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: any;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ editor }) => {
  const { conflicts } = useEditor(editor);
  if (!conflicts.length) return null;

  return (
    <div>
      {conflicts.map((conflict, index) => (
        <div key={index}>{conflict}</div>
      ))}
    </div>
  );
};

export default ConflictResolver;