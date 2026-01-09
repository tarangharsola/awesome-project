{"import React from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  editor: any;
  children: React.ReactNode;
}

const AwarenessConsistency = ({ editor, children }: AwarenessConsistencyProps) => {
  const { awareness } = useEditor(editor);
  return (
    <div>
      {children}
      <div>Consistency: {awareness}</div>
    </div>
  );
}

export default AwarenessConsistency;