{"import React from 'react';
import { Editor } from '@monaco-editor/react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const EditorComponent = ({ value, onChange, language }: Props) => {
  const handleEditorChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <Editor
      value={value}
      onChange={handleEditorChange}
      language={language}
      theme="vs-dark"
      height="100vh"
      width="100%"
    />
  );
};

export default EditorComponent;