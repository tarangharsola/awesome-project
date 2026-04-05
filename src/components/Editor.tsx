{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';
import { useLanguage } from './useLanguage';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const EditorComponent = ({ value, onChange, language }) => {
  const [formattedValue, setFormattedValue] = useState(value);
  const languageData = useLanguage(language);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormattedValue(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Editor
      value={formattedValue}
      onChange={(newValue) => onChange(newValue)}
      language={languageData}
    />
  );

  return EditorComponent;
}
export default EditorComponent;