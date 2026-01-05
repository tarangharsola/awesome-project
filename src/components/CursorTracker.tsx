{"import React from 'react';
import { useCursor } from './useCursor';
import { EditorView } from 'prosemirror-view';

interface Props {
  view: EditorView;
}

const CursorTracker: React.FC<Props> = ({ view }) => {
  const cursor = useCursor(view);

  return (
    <div className='cursor-tracker'>
      <span className='cursor-indicator' style={{
        left: `${cursor.x}px`,
        top: `${cursor.y}px`,
        backgroundColor: cursor.color,
      }} />
    </div>
  );
}

export default CursorTracker;