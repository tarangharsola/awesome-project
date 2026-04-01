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
    const intervalId = setInterval(() => {
      setFormattedValue(formatCode(value));
    }, 100);
    return () => clearInterval(intervalId);
  }, [value, language]);

  return (
    <Editor
      value={formattedValue}
      onChange={onChange}
      language={language}
    />
  );

  return EditorComponent;
}
export default EditorComponent;