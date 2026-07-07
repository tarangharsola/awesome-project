import React, { useState } from 'react';
import { useLanguage } from '../utils/useLanguage';

interface Props {
  languages: string[];
}

const LanguageSelector: React.FC<Props> = ({ languages }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const { formatCode } = useLanguage(selectedLanguage);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <div>
      <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
        {languages.map((language) => (
          <option key={language} value={language}>{language}</option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;