{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';
import { useConflictResolver } from './useConflictResolver';

interface Props {
  documentId: string;
  language: string;
}

const Editor = ({ documentId, language }) => {
  const [text, setText] = useState('');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { sendText, receiveText } = useWebSocket(documentId);
  const { resolveConflict } = useConflictResolver(text, cursor);
  const { updateCursor } = useEditor(setCursor);

  useEffect(() => {
    receiveText((text) => setText(text));
  }, []);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    const newCursor = resolveConflict(newText, cursor);
    setText(newText);
    setCursor(newCursor);
    sendText(newText);
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      padding: 10
    }}>
      <textarea
        value={text}
        onChange={handleTextChange}
        style={{
          width: '100%',
          height: '100%',
          padding: 10
        }}
      />
      <CursorTracker cursor={cursor} user={{ name: 'John Doe', color: '#ff0000' }} />
    </div>
  );
}

export default Editor;