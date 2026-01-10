{"import React from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  editor: useEditor;
}

const AwarenessConsistency = ({ editor }: AwarenessConsistencyProps) => {
  const { operations } = editor;
  const consistency = operations.reduce((acc, op) => acc && op.type === 'insert', true);
  return <div>Consistency: {consistency ? 'true' : 'false'}</div>;
};

export default AwarenessConsistency;