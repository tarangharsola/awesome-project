import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

interface EditorProps {
  roomId: string;
  language: string;
}

const Editor: React.FC<EditorProps> = ({ roomId, language }) => {
  const { editorState, setEditorState } = useEditor();
  const { sendText, receiveText } = useWebSocket();

  useEffect(() => {
    receiveText(roomId);
  }, [roomId]);

  const handleTextChange = (text: string) => {
    setEditorState(text);
    sendText(roomId, text);
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        padding: 10,
        border: '1px solid #ccc',
      }}
    >
      <textarea
        value={editorState}
        onChange={(e) => handleTextChange(e.target.value)}
        style={{
          height: '90vh',
          width: '100%',
          padding: 10,
          fontSize: 14,
          fontFamily: 'monospace',
        }}
      />
    </div>
  );
};

export default Editor;