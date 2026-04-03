{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';
import { useLanguage } from './useLanguage';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const EditorComponent: React.FC<EditorProps> = ({ value, onChange, language }) => {
  const [formattedValue, setFormattedValue] = useState(value);
  const [languageState, setLanguageState] = useState(language);

  useEffect(() => {
    setLanguageState(language);
  }, [language]);

  const handleFormat = () => {
    // implement formatting logic here
  };

  return (
    <Editor
      value={formattedValue}
      onChange={(value) => {
        onChange(value);
        setFormattedValue(value);
      }}
      language={languageState}
      onFormat={handleFormat}
    />
  );

  return EditorComponent;
}
export default EditorComponent;