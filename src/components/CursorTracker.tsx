{"import React from 'react';
import { useEditor } from './useEditor';

interface CursorTrackerProps {
  editor: any;
  children: React.ReactNode;
}

const CursorTracker = ({ editor, children }: CursorTrackerProps) => {
  const { cursors } = useEditor(editor);
  return (
    <div>
      {children}
      {cursors.map((cursor, index) => (
        <div key={index}>{cursor.name} - {cursor.position}</div>
      ))}
    </div>
  );
}

export default CursorTracker;