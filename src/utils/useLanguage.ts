{"import { useState, useEffect } from 'react';

interface UseLanguageReturn {
  language: string;
  selectLanguage: (language: string) => void;
}

const useLanguage = (): UseLanguageReturn => {
  const [language, setLanguage] = useState('javascript');

  const selectLanguage = (language: string) => {
    setLanguage(language);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return { language, selectLanguage };
}

export default useLanguage;