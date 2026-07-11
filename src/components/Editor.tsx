{"import React from 'react';
import { useEditor } from '../utils/useEditor';

const Editor = () => {
  const editor = useEditor();
  return (
    <div style={{ height: 500, width: 800, border: '1px solid black' }}>
      {editor.children}
    </div>
  );
};

export default Editor;