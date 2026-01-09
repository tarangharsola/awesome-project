{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: any;
  children: React.ReactNode;
}

const ConflictResolver = ({ editor, children }: ConflictResolverProps) => {
  const { conflict } = useEditor(editor);
  return (
    <div>
      {children}
      <div>Conflict: {conflict}</div>
    </div>
  );
}

export default ConflictResolver;