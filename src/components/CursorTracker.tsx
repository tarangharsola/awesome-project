{"import React from 'react';
import { useEditor } from './useEditor';

interface CursorTrackerProps {
  editor: useEditor;
}

const CursorTracker = ({ editor }: CursorTrackerProps) => {
  const { cursor } = editor;
  return <div>Cursors: {editor.users.map(user => user.name).join(', ')}</div>;
};

export default CursorTracker;