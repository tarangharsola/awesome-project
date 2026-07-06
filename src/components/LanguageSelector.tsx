{"import React from 'react'; import { useState } from 'react'; import { useLanguage } from '../utils/useLanguage';

const LanguageSelector = () => {
  const [language, setLanguage] = useState('javascript');
  const { languages, selectLanguage } = useLanguage();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    selectLanguage(event.target.value);
  };

  return (
    <select value={language} onChange={handleLanguageChange}>
      {languages.map((language) => (
        <option key={language} value={language}>{language}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;