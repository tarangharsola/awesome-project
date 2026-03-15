{"import React from 'react';
import { useEditor } from './useEditor';
import CursorTracker from './CursorTracker';

const Editor = () => {
  const editor = useEditor();
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <CursorTracker />
      <div style={{ position: 'absolute', left: editor.cursor.x, top: editor.cursor.y, width: 2, height: 2, backgroundColor: editor.cursor.color }} />
    </div>
  );
};

export default Editor;