{"import { useState, useEffect } from 'react';
import { language } from './language';

function useLanguage() {
  const [language, setLanguage] = useState(language);

  useEffect(() => {
    setLanguage(language);
  }, [language]);

  return language;
}

export default useLanguage;