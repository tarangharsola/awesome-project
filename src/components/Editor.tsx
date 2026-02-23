{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';
import { useCursor } from './useCursor';

interface EditorProps {
  language: string;
  document: string;
}

const Editor = ({ language, document }: EditorProps) => {
  const [text, setText] = useState(document);
  const { sendText } = useWebSocket();
  const { cursor } = useCursor();
  const { languageMap } = useEditor();

  useEffect(() => {
    sendText(text);
  }, [text]);

  const handleTextChange = (newText: string) => {
    setText(newText);
  }

  return (
    <div style={{
      padding: 20,
      backgroundColor: '#f0f0f0',
    }}>
      <textarea
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        style={{
          width: '100%',
          height: 200,
          padding: 10,
          fontSize: 14,
          fontFamily: 'monospace',
        }}
      />
      <CursorTracker cursor={cursor} userId={userId} color={color} />
    </div>
  );
}

export default Editor;