{"import { useState, useEffect } from 'react';

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState({
    indentSize: 2,
    tabSize: 2,
    newline: '\n'
  });

  useEffect(() => {
    const storedDefaults = localStorage.getItem('formattingDefaults');
    if (storedDefaults) {
      setFormattingDefaults(JSON.parse(storedDefaults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formattingDefaults', JSON.stringify(formattingDefaults));
  }, [formattingDefaults]);

  return formattingDefaults;
};

export default useFormattingDefaults;