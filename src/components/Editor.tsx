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
    const language = useLanguage();
    setLanguageState(language);
  }, []);

  const handleFormat = () => {
    const formattedValue = formatCode(value, languageState);
    setFormattedValue(formattedValue);
  };

  return (
    <div className="editor">
      <Editor
        value={formattedValue}
        onChange={(value) => onChange(value)}
        language={languageState}
        onFormat={handleFormat}
      />
    </div>
  );

  return EditorComponent;
}
export default EditorComponent;