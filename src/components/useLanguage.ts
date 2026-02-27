{"import React from 'react';
import { useEditor } from './useEditor';

interface Language {
  id: string;
  name: string;
}

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: Language;
  onChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onChange }) => {
  const { editor } = useEditor();
  const handleLanguageChange = (language: Language) => {
    onChange(language);
    editor.setLanguage(language.id);
  };
  return (
    <select value={selectedLanguage.id} onChange={(e) => handleLanguageChange(languages.find((lang) => lang.id === e.target.value))}>
      {languages.map((language) => (
        <option key={language.id} value={language.id}>{language.name}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;