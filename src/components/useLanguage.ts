{"import { useState, useEffect } from 'react';
import { Languages } from 'prismjs';

const useLanguage = () => {
  const [language, setLanguage] = useState(Languages.javascript);

  useEffect(() => {
    Highlight.init(Languages[language]);
  }, [language]);

  return {
    language,
  };
};

export default useLanguage;