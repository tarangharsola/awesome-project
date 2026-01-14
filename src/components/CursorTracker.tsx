{"import React from 'react';
import { useEditor } from './useEditor';

interface CursorTrackerProps {
  editor: useEditor;
}

const CursorTracker = ({ editor }: CursorTrackerProps) => {
  const { cursor } = editor;
  return <div>Cursors: {cursor.position}</div);
};

export default CursorTracker;