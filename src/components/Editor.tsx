{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';
import { useLanguage } from './useLanguage';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const EditorComponent: React.FC<EditorProps> = ({ value, onChange, language }) => {
  const { formatCode } = useLanguage(language);

  useEffect(() => {
    const formattedCode = formatCode(value);
    onChange(formattedCode);
  }, [value, language]);

  return (
    <Editor
      value={value}
      onChange={onChange}
      language={language}
    />
  );

  return EditorComponent;
}

export default EditorComponent;