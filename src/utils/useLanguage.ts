import { useState, useEffect } from 'react';

const useLanguage = () => {
  const [languages, setLanguages] = useState(['javascript', 'python', 'html']);
  useEffect(() => {
    // Update languages here
  }, []);
  return { languages };
};

export default useLanguage;