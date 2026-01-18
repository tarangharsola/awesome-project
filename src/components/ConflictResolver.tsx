{"import React from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverProps {
  editor: any;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ editor }) => {
  const { conflict } = useEditor(editor);
  return <div>Conflict: {conflict}</div>;
}

export default ConflictResolver;