{"import React from 'react';

interface Props {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<Props> = ({ selectedLanguage, onLanguageChange }) => {
  const handleLanguageChange = (language: string) => {
    onLanguageChange(language);
  };
  return (
    <select value={selectedLanguage} onChange={(event) => handleLanguageChange(event.target.value)}>
      <option value='javascript'>JavaScript</option>
      <option value='python'>Python</option>
      <option value='html'>HTML</option>
    </select>
  );
}

export default LanguageSelector;