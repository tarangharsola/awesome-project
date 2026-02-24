{"import { useState } from 'react';

const useLanguage = () => {
  const [language, setLanguage] = useState('javascript');
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return [language, handleLanguageChange];
};

export default useLanguage;