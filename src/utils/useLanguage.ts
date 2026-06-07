{"import { useState, useEffect } from 'react';

const useLanguage = () => {
  const [language, setLanguage] = useState('javascript');
  useEffect(() => {
    // Update language here
  }, []);
  return language;
}

export default useLanguage;