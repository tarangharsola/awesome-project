{"import { useState, useEffect } from 'react';

interface LanguageProps {
  language: string;
}

const useLanguage = ({ language }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedLanguage(language);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [language]);

  return selectedLanguage;
}

export default useLanguage;