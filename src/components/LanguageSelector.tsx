{"import React from 'react';
import { useLanguage } from './useLanguage';

interface Props {
  onChange: (language: string) => void;
}

const LanguageSelector = ({ onChange }) => {
  const { language, languages } = useLanguage();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select value={language} onChange={handleSelect}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;