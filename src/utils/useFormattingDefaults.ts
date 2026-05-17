{"import { useState, useEffect } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
}

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState<FormattingDefaults>({ tabSize: 2, indentSize: 2 });

  useEffect(() => {
    // Load formatting defaults from local storage
    const storedDefaults = localStorage.getItem('formattingDefaults');
    if (storedDefaults) {
      setFormattingDefaults(JSON.parse(storedDefaults));
    }
  }, []);

  useEffect(() => {
    // Save formatting defaults to local storage
    localStorage.setItem('formattingDefaults', JSON.stringify(formattingDefaults));
  }, [formattingDefaults]);

  return formattingDefaults;
};

export default useFormattingDefaults;