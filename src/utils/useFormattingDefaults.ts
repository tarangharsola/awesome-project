{"import { useState, useEffect } from 'react';

interface Props {
  language: string;
}

const useFormattingDefaults = ({ language }) => {
  const [defaults, setDefaults] = useState({});

  useEffect(() => {
    const loadDefaults = async () => {
      const response = await fetch(`/api/formatting-defaults/${language}`);
      const data = await response.json();
      setDefaults(data);
    };
    loadDefaults();
  }, [language]);

  return defaults;
}
export default useFormattingDefaults;