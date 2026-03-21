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
    const formatted = formatCode(value);
    setFormattedValue(formatted);
  }, [value, language]);

  const handleOnChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <Editor
      value={formattedValue}
      onChange={handleOnChange}
      language={language}
    />
  );
}
export default EditorComponent;