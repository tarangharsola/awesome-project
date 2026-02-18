{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

interface EditorProps {
  language: string;
  value: string;
}

const Editor = ({ language, value }: EditorProps) => {
  const [text, setText] = useState(value);
  const { sendText } = useWebSocket();
  const { updateEditor } = useEditor();

  useEffect(() => {
    updateEditor(text);
  }, [text]);

  const handleTextChange = (newText: string) => {
    setText(newText);
    sendText(newText);
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => handleTextChange(e.target.value)} />
    </div>
  );
}

export default Editor;