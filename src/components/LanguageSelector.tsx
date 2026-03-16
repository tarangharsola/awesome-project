{"import React from 'react';
import { useLanguage } from './useLanguage';

interface Props {
  language: string;
}

const LanguageSelector: React.FC<Props> = ({ language }) => {
  const { languages } = useLanguage();
  return (
    <select value={language} onChange={(e) => console.log(e.target.value)}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;