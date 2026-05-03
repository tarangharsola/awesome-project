import { useState, useEffect } from 'react';

interface Language {
  id: string;
  name: string;
}

interface LanguageContextType {
  language: Language | null;
  setLanguage: (language: Language) => void;
}

const LanguageContext = React.createContext<LanguageContextType>({} as LanguageContextType);

const useLanguage = () => {
  const [language, setLanguage] = useState<Language | null>(null);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(JSON.parse(storedLanguage));
    }
  }, []);

  useEffect(() => {
    if (language) {
      localStorage.setItem('language', JSON.stringify(language));
    }
  }, [language]);

  return { language, setLanguage };
}

export default useLanguage;