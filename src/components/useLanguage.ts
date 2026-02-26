{"import { useState, useEffect } from 'react';

interface LanguageProps {
  language: string
}

const useLanguage = ({ language }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  return selectedLanguage;
}

export default useLanguage;