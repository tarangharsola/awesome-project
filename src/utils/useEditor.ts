{"import { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import WebSocket from './WebSocket';

function useEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'editor') {
        setEditorState(data.editor);
      } else if (data.type === 'cursor') {
        setCursorPosition(data.cursorPosition);
      }
    };
    return () => ws.close();
  }, []);

  const handleCursorChange = (position) => {
    setCursorPosition(position);
  };

  return {
    editorState,
    cursorPosition,
    handleCursorChange
  };
}

export default useEditor;