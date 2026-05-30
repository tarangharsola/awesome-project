{"import { useState, useEffect } from 'react';
import { languages } from './languages';

const useLanguage = () => {
  const [language, setLanguage] = useState(languages[0]);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
    };

    document.addEventListener('change', handleLanguageChange);

    return () => {
      document.removeEventListener('change', handleLanguageChange);
    };
  }, []);

  return language;
};

export default useLanguage;