{"import React from 'react';
import { useState } from 'react';
import LanguageSelector from './LanguageSelector';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  languages: string[];
  selectedLanguage: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, languages, selectedLanguage }) => {
  const [formattedValue, setFormattedValue] = useState(value);

  const handleFormat = () => {
    // Format code using a library like prettier
    setFormattedValue(prettier.format(value));
  };

  return (
    <div className="editor">
      <LanguageSelector
        languages={languages}
        selectedLanguage={selectedLanguage}
        onSelect={(language) => onChange(language)}
      />
      <textarea
        value={formattedValue}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={handleFormat}>Format</button>
    </div>
  );

  return Editor;
}
export default Editor;