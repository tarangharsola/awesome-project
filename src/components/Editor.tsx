{"import React, { useState, useEffect } from 'react';
import { Editor as CodeMirror } from 'react-codemirror-editor';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, language }) => {
  const [code, setCode] = useState(value);

  useEffect(() => {
    onChange(code);
  }, [code, onChange]);

  const handleCodeChange = (code: string) => {
    setCode(code);
  };

  return (
    <CodeMirror
      value={code}
      onChange={handleCodeChange}
      options={{
        mode: language,
        lineNumbers: true,
        theme: 'monokai'
      }}
    />
  );

  return Editor;
}

export default Editor;