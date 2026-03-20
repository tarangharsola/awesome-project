{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import CursorTracker from './CursorTracker';

interface EditorProps {
  language: string;
  code: string;
}

const Editor = ({ language, code }: EditorProps) => {
  const [cursor, setCursor] = useState({ id: '', x: 0, y: 0 });
  const { updateCursor } = useEditor();

  useEffect(() => {
    const handleCursorUpdate = (cursor: { id: string; x: number; y: number }) => {
      setCursor(cursor);
    };
    updateCursor(handleCursorUpdate);
    return () => {
      updateCursor(null);
    };
  }, [updateCursor]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
    }}>
      <CursorTracker cursor={cursor} />
      <div style={{
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100vh',
        backgroundColor: 'white',
        padding: '10px',
      }}>
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}>{code}</pre>
      </div>
    </div>
  );
}

export default Editor;