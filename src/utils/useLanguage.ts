{"import React from 'react';
import { useState } from 'react';

interface Language {
  id: string;
  name: string;
  syntax: string;
}

interface LanguageState {
  language: Language | null;
  setLanguage: (language: Language) => void;
}

const useLanguage = (): LanguageState => {
  const [language, setLanguage] = useState<Language | null>(null);

  const handleLanguageChange = (language: Language) => {
    setLanguage(language);
  };

  return {
    language,
    setLanguage: handleLanguageChange,
  };
};

export default useLanguage;