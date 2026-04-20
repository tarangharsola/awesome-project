{"import { useState } from 'react';

interface Language {
  syntaxHighlighting: (code: string, language: string) => string;
}

const languages: { [key: string]: Language } = {
  javascript: {
    syntaxHighlighting: (code, language) => code,
  },
  python: {
    syntaxHighlighting: (code, language) => code,
  },
  html: {
    syntaxHighlighting: (code, language) => code,
  },
};

const useLanguage = (language: string) => {
  const [syntaxHighlighting, setSyntaxHighlighting] = useState(languages[language].syntaxHighlighting);

  return { syntaxHighlighting };
};

export default useLanguage;