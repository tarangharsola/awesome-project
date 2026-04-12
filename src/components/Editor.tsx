{"import React from 'react';
import { useState } from 'react';
import LanguageSelector from './LanguageSelector';

interface Props {
  value: string;
  onChange: (value: string) => void;
  languages: string[];
}

const Editor: React.FC<Props> = ({ value, onChange, languages }) => {
  const [language, setLanguage] = useState(languages[0]);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
  };

  const handleValueChange = (value: string) => {
    onChange(value);
  };

  return (
    <div>
      <LanguageSelector languages={languages} selectedLanguage={language} onSelect={handleLanguageChange} />
      <textarea value={value} onChange={(e) => handleValueChange(e.target.value)} />
    </div>
  );

  return Editor;
}

export default Editor;