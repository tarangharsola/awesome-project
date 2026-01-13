{"import React from 'react';
import { Editor } from 'react-simple-editor';
import { MonacoEditor } from 'react-monaco-editor';

interface Props {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const EditorComponent: React.FC<Props> = ({ value, onChange, language }) => {
  const handleEditorChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <MonacoEditor
      value={value}
      onChange={handleEditorChange}
      language={language}
      theme="vs-dark"
      options={{
        selectOnLineNumbers: true,
        fontSize: 14,
        lineNumbers: "on",
        minimap: {
          enabled: false,
        },
        scrollbar: {
          vertical: "visible",
          horizontal: "visible",
        },
      }}
    />
  );
}

export default EditorComponent;