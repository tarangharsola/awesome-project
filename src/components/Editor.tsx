{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-code-editor';
import { languages } from 'prismjs';
import "prismjs/themes/prism.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const EditorComponent: React.FC<EditorProps> = ({ value, onChange, language }) => {
  const [formattedValue, setFormattedValue] = useState(value);

  useEffect(() => {
    setFormattedValue(value);
  }, [value]);

  const handleFormat = () => {
    const formatted = value.replace(/\n/g, "\n\n");
    setFormattedValue(formatted);
  };

  return (
    <div className="editor">
      <Editor
        value={formattedValue}
        onChange={(value) => onChange(value)}
        language={language}
        highlight={languages[language]}
        padding={10}
        style={{
          fontSize: 12,
          fontFamily: "monospace",
          backgroundColor: "#f0f0f0",
          padding: 10,
        }}
      />
      <button onClick={handleFormat}>Format</button>
    </div>
  );

  return EditorComponent;
}
export default EditorComponent;