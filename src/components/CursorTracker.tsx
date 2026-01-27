{"import React from 'react';
import { useEditor } from './useEditor';

interface CursorTrackerProps {
  editor: useEditor;
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ editor }) => {
  const { cursors } = editor;
  return <div>Cursors: {JSON.stringify(cursors)}</div);
};

export default CursorTracker;