{"import React from 'react';
import { useLanguage } from './useLanguage';

interface Props {
  language: string;
}

const LanguageSelector = ({ language }) => {
  const { languages, selectLanguage } = useLanguage();
  return (
    <select value={language} onChange={(event) => selectLanguage(event.target.value)}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;