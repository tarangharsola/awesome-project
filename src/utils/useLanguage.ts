import { useState, useEffect } from 'react';
import { Language } from '../types';

const supportedLanguages: Language[] = ['javascript', 'python', 'html'];

export const useLanguage = (initial?: Language) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('editorLanguage');
    return (saved as Language) || initial || 'javascript';
  });

  useEffect(() => {
    localStorage.setItem('editorLanguage', language);
  }, [language]);

  const changeLanguage = (lang: Language) => {
    if (supportedLanguages.includes(lang)) {
      setLanguage(lang);
    }
  };

  return { language, changeLanguage, supportedLanguages };
};

export default useLanguage;
