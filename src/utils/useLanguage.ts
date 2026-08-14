{"import { useState, useEffect } from 'react';

interface LanguageProps {
  language: string;
}

const useLanguage = () => {
  const [language, setLanguage] = useState<string>('javascript');

  useEffect(() => {
    // fetch languages from server
    // setLanguage('javascript');
  }, []);

  return { languages: ['javascript', 'python', 'html'] }; // placeholder for languages
}

export default useLanguage;