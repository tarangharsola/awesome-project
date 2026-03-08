{"import React from 'react';
import { useState, useEffect } from 'react';
import EditorComponent from './EditorComponent';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value);
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    onChange(editorValue);
  }, [editorValue, onChange]);

  const handleTextChange = (newValue: string) => {
    setEditorValue(newValue);
  };

  const handleCursorPositionChange = (newCursorPosition: number) => {
    setCursorPosition(newCursorPosition);
  };

  return (
    <EditorComponent
      value={editorValue}
      onChange={handleTextChange}
      cursorPosition={cursorPosition}
      onChangeCursorPosition={handleCursorPositionChange}
    />
  );
};

export default Editor;