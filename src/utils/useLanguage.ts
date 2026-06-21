{"import { useState, useEffect } from 'react';

interface LanguageProps {
  language: string;
}

const useLanguage = (props: LanguageProps) => {
  const [language, setLanguage] = useState(props.language);
  useEffect(() => {
    setLanguage(props.language);
  }, [props.language]);
  return language;
};

export default useLanguage;