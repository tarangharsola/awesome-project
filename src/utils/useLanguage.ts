{"import { useState, useEffect } from 'react';

const useLanguage = () => {
  const [language, setLanguage] = useState('javascript');
  useEffect(() => {
    const handleSelect = (e) => {
      setLanguage(e.target.value);
    };
    document.addEventListener('change', handleSelect);
    return () => document.removeEventListener('change', handleSelect);
  }, []);
  return language;
};

export default useLanguage;