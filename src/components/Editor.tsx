{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';
import { useWebSocket } from './useWebSocket';

interface EditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

const EditorComponent: React.FC<EditorProps> = ({ language, value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);

  const { send, receive } = useWebSocket();

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleEditorChange = (newValue: string) => {
    setEditorValue(newValue);
    onChange(newValue);
  };

  const handleCursorPositionChange = (newCursorPosition: number) => {
    setCursorPosition(newCursorPosition);
    setCursorVisible(true);
  };

  return (
    <Editor
      value={editorValue}
      onChange={handleEditorChange}
      language={language}
      onCursorPositionChange={handleCursorPositionChange}
    />
  );
}

export default EditorComponent;