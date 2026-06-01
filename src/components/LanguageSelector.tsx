{"import React from 'react';
import { useLanguage } from './useLanguage';

const LanguageSelector = () => {
  const { language, handleLanguageChange } = useLanguage();

  const handleLanguageSelect = (event) => {
    handleLanguageChange(event.target.value);
  };

  return (
    <select value={language} onChange={handleLanguageSelect}>
      {LANGUAGE_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;