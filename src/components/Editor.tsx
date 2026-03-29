{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editors';
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
    setLanguageState(language);
  }, [language]);

  const handleFormat = () => {
    const formattedValue = formatCode(value);
    setFormattedValue(formattedValue);
  };

  return (
    <Editor
      value={formattedValue}
      onChange={(value) => onChange(value)}
      language={languageState}
      onFormat={handleFormat}
    />
  );

  return EditorComponent;
}
export default EditorComponent;