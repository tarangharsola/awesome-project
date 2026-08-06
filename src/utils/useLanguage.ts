{"import { useState } from 'react';

const useLanguage = () => {
  const [language, setLanguage] = useState('javascript');
  return language;
};

export default useLanguage;