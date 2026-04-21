{"import React from 'react';
import { useEditor } from './useEditor';
import CursorTracker from './CursorTracker';

function Editor() {
  const editor = useEditor();
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <CursorTracker />
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        {editor.children}
      </div>
    </div>
  );
}

export default Editor;