{"import React from 'react';
import { useLanguage } from '../utils/useLanguage';

interface Props {
  languages: string[];
  selectedLanguage: string;
  onChange: (language: string) => void;
}

const LanguageSelector: React.FC<Props> = ({ languages, selectedLanguage, onChange }) => {
  const { language } = useLanguage();
  return (
    <select value={selectedLanguage} onChange={(e) => onChange(e.target.value)}>
      {languages.map((language) => (
        <option key={language} value={language}>{language}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;