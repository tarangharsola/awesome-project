{"import { useState, useEffect } from 'react';
import { languages } from 'prismjs';

const useLanguage = () => {
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const language = languages[language];
    if (language) {
      setLanguage(language);
    }
  }, [language]);

  return { language };
};

export default useLanguage;