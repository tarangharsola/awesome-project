{"import React from 'react';
import { useState } from 'react';

function LanguageSelector({ language, onChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage);
    onChange(newLanguage);
  };

  return (
    <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
      <option value='javascript'>JavaScript</option>
      <option value='python'>Python</option>
      <option value='html'>HTML</option>
    </select>
  );
}

export default LanguageSelector;