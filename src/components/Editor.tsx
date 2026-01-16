{"import React from 'react';
import { Editor } from 'react-simple-code-editor';

interface Props {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const EditorComponent: React.FC<Props> = ({ value, onChange, language }) => {
  const handleCodeChange = (newCode: string) => {
    onChange(newCode);
  };

  return (
    <Editor
      value={value}
      onValueChange={handleCodeChange}
      highlight={language}
      padding={10}
      style={{
        fontFamily: 'monospace,
        monospace',
        fontSize: 12,
      }}
    />
  );
}

export default EditorComponent;