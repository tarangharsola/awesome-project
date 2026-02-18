{"import { useState, useEffect } from 'react';

interface LanguageProps {
  language: string;
}

const useLanguage = ({ language }: LanguageProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    // implement language selection logic here
  }, [language]);

  return selectedLanguage;
}

export default useLanguage;