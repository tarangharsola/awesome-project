{"import { useState, useEffect } from 'react';

interface Props {
  language: string;
}

const useLanguage = ({ language }) => {
  const [languages, setLanguages] = useState(['javascript', 'python', 'html']);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    // implement language selection logic here
  }, []);

  return { languages, selectLanguage: (lang) => setSelectedLanguage(lang) };
}

export default useLanguage;