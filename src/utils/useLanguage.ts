{"import { useState } from 'react';
const useLanguage = () => {
  const languages = ['javascript', 'python', 'html'];
  const [language, setLanguage] = useState('javascript');

  return { languages, language };
};

export default useLanguage;