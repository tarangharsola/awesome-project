{"import React from 'react';
import { useEditor } from './useEditor';

interface CursorTrackerProps {
  editor: useEditor;
}

const CursorTracker = ({ editor }: CursorTrackerProps) => {
  const { operations } = editor;
  const cursors = operations.filter((op) => op.type === 'insert' && op.position === operations[0].position);
  return <div>Cursors: {cursors.length}</div);
};

export default CursorTracker;