{"import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

interface Props {
  value: Value;
  onChange: (value: Value) => void;
  language: string;
}

const EditorComponent = ({ value, onChange, language }: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      onChange(insertText(value, event.target.selectionStart, '\t'));
    }
  };

  return (
    <Editor
      value={value}
      onChange={onChange}
      placeholder='Type something...
      language={language}
      onKeyDown={handleKeyDown}
    />
  );
};

export default EditorComponent;