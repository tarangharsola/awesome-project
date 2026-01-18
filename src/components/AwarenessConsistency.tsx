{"import React from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  editor: any;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ editor }) => {
  const { awareness } = useEditor(editor);
  return <div>Consistency: {awareness}</div>;
}

export default AwarenessConsistency;