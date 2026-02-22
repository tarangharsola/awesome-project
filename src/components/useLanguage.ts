{"import React from 'react';
import { useEditor } from './useEditor';

interface Language {
  name: string;
  syntax: string;
}

const languages: Language[] = [
  { name: 'JavaScript', syntax: 'javascript' },
  { name: 'Python', syntax: 'python' },
  { name: 'HTML', syntax: 'html'
];

const useLanguage = () => {
  const editor = useEditor();
  const selectedLanguage = languages.find((lang) => lang.syntax === editor.language);
  return selectedLanguage;
};

export default useLanguage;