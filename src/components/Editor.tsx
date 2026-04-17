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
  const { formatCode } = useLanguage(language);

  useEffect(() => {
    setFormattedValue(formatCode(value));
  }, [value, language]);

  const handleValueChange = (newValue: string) => {
    onChange(newValue);
    setFormattedValue(newValue);
  };

  return (
    <Editor
      value={formattedValue}
      onChange={handleValueChange}
      language={language}
    />
  );
};

export default EditorComponent;