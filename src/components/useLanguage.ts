{"import { useState, useEffect } from 'react';
import { useLanguage } from './useLanguage';

interface Props {
  language: string;
}

const useLanguage = ({ language }) => {
  const [languages, setLanguages] = useState(['JavaScript', 'Python', 'HTML']);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    const handleLanguageChange = () => {
      setSelectedLanguage(language);
    };
    return () => {
      // Clean up
    };
  }, [language]);

  return { languages: languages, selectLanguage: setSelectedLanguage };
}

export default useLanguage;