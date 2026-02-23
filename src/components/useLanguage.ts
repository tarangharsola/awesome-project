{"import { useState } from 'react';

interface Props {
  onChange: (language: string) => void;
  value: string;
}

const useLanguage = ({ onChange, value }: Props) => {
  const [language, setLanguage] = useState(value);

  const handleLanguageChange = (newLanguage: string) => {
    onChange(newLanguage);
    setLanguage(newLanguage);
  };

  return {
    language,
    onChange: handleLanguageChange,
  };
};

export default useLanguage;