{"import { useState, useEffect } from 'react';

interface Language {
  name: string;
  formatCode: (code: string) => string;
}

const languages: Language[] = [
  { name: 'JavaScript', formatCode: (code) => code },
  { name: 'Python', formatCode: (code) => code },
  { name: 'HTML', formatCode: (code) => code },
];

const useLanguage = (language: string) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    const selectedLanguage = languages.find((lang) => lang.name === language);
    if (selectedLanguage) {
      setSelectedLanguage(selectedLanguage);
    }
  }, [language]);

  return { formatCode: selectedLanguage.formatCode };
};

export default useLanguage;