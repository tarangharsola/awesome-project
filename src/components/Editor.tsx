{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';
import { useLanguage } from './useLanguage';

interface Props {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const EditorComponent: React.FC<Props> = ({ value, onChange, language }) => {
  const [formattedValue, setFormattedValue] = useState(value);
  const [languageState, setLanguageState] = useState(language);

  useEffect(() => {
    setFormattedValue(value);
  }, [value]);

  const handleFormat = () => {
    // Implement formatting logic here
  };

  return (
    <div>
      <Editor
        value={formattedValue}
        onChange={(value) => onChange(value)}
        language={languageState}
      />
      <button onClick={handleFormat}>Format</button>
    </div>
  );

  return EditorComponent;
}

export default EditorComponent;