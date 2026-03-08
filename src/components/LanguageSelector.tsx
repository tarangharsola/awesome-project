{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  language: string;
  onChange: (language: string) => void;
}

const LanguageSelector = ({ language, onChange }: LanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
    setSelectedLanguage(event.target.value);
  };

  return (
    <select value={selectedLanguage} onChange={handleLanguageChange}>
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="html">HTML</option>
    </select>
  );
};

export default LanguageSelector;