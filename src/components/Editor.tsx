{"import React from 'react';
import { useState } from 'react';
import LanguageSelector from './LanguageSelector';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  languages: string[];
}

const Editor: React.FC<EditorProps> = ({ value, onChange, languages }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleFormat = () => {
    // Add formatting logic here
  };

  return (
    <div>
      <LanguageSelector languages={languages} selectedLanguage={selectedLanguage} onSelect={handleLanguageChange} />
      <textarea value={value} onChange={(e) => onChange(e.target.value)} />
      <button onClick={handleFormat}>Format</button>
    </div>
  );

  return Editor;
}

export default Editor;