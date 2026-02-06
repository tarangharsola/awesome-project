{"import React from 'react';
import { useEditor } from './useEditor';

interface CursorTrackerProps {
  editor: useEditor;
}

const CursorTracker = ({ editor }: CursorTrackerProps) => {
  const { cursorPositions, users } = editor.state;
  return (
    <div>
      {cursorPositions.map((position, index) => (
        <div key={index}>{users[index].name} at {position}</div>
      ))}
    </div>
  );
};

export default CursorTracker;