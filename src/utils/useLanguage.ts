{"import { useState, useEffect } from 'react';

interface LanguageState {
  language: string;
  setLanguage: (language: string) => void;
}

const useLanguage = (): LanguageState => {
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return { language, setLanguage };
}

export default useLanguage;