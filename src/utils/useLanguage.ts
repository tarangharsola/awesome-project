{"import { useState } from 'react';
import { useEditor } from './useEditor';

interface Language {
  name: string;
  syntax: string;
}

const languages: Language[] = [
  { name: 'JavaScript', syntax: 'javascript' },
  { name: 'Python', syntax: 'python' },
  { name: 'HTML', syntax: 'html' }
];

const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const { editor } = useEditor();
  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    editor.setLanguage(language.syntax);
  };
  return { selectedLanguage, handleLanguageChange };
};

export default useLanguage;