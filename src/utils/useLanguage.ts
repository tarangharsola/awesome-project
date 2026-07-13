{"import { useState, useEffect } from 'react';

interface Props {
  language: string;
}

const useLanguage = (language: string) => {
  const [languages, setLanguages] = useState(['JavaScript', 'Python', 'HTML']);
  return { languages };
};

export default useLanguage;