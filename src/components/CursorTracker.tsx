{"import React from 'react';
import { useEditor } from './useEditor';

interface CursorTrackerProps {
  editor: useEditor;
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ editor }) => {
  const { cursor } = editor;
  return (
    <div>
      {cursor.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  );
};

export default CursorTracker;