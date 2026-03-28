{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editors';
import LanguageSelector from './LanguageSelector';

interface EditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

const EditorComponent: React.FC<EditorProps> = ({ language, value, onChange }) => {
  const [formattedValue, setFormattedValue] = useState(value);

  useEffect(() => {
    setFormattedValue(value);
  }, [value]);

  const handleFormat = () => {
    // implement formatting logic here
  };

  return (
    <div className="editor">
      <LanguageSelector languages={languages} selectedLanguage={language} onSelect={handleFormat} />
      <Editor
        value={formattedValue}
        onChange={(value) => onChange(value)}
        language={language}
      />
    </div>
  );

  return EditorComponent;
}
export default EditorComponent;