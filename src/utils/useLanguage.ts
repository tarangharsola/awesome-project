{"import { useState, useEffect } from 'react';

interface Language {
  id: string;
  name: string;
}

interface UseLanguageProps {
  languages: Language[];
  defaultLanguage: string;
}

const useLanguage = ({ languages, defaultLanguage }: UseLanguageProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  useEffect(() => {
    const handleLanguageChange = (language: string) => {
      setSelectedLanguage(language);
    };

    return () => {
      // Clean up
    };
  }, []);

  return { selectedLanguage, setSelectedLanguage };
}
export default useLanguage;