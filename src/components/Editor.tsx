{"import React from 'react';
import { useEditor } from './useEditor';
import CursorTracker from './CursorTracker';

const Editor = () => {
  const editor = useEditor();
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <CursorTracker />
      <textarea value={editor.value} onChange={editor.onChange} />
    </div>
  );
};

export default Editor;