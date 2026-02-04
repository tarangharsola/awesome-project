{"import React from 'react';
import { useState, useEffect } from 'react';
import EditorComponent from './EditorComponent';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const Editor = ({ value, onChange, language }: EditorProps) => {
  const [editorValue, setEditorValue] = useState(value);
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    onChange(editorValue);
  }, [editorValue, onChange]);

  const handleEditorChange = (newValue: string) => {
    setEditorValue(newValue);
  };

  const handleCursorPositionChange = (newCursorPosition: number) => {
    setCursorPosition(newCursorPosition);
  };

  return (
    <EditorComponent
      value={editorValue}
      onChange={handleEditorChange}
      language={language}
      cursorPosition={cursorPosition}
      onCursorPositionChange={handleCursorPositionChange}
    />
  );
};

export default Editor;