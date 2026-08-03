{"import { useState, useEffect } from 'react';

interface Props {
}

const useLanguage = () => {
  const [language, setLanguage] = useState('javascript');
  const [languages, setLanguages] = useState(['javascript', 'python', 'html']);

  const selectLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return {
    languages,
    selectLanguage,
  };
}

export default useLanguage;