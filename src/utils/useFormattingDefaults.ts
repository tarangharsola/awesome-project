import { useState, useEffect } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
}

const useFormattingDefaults = (): FormattingDefaults => {
  const [defaults, setDefaults] = useState<FormattingDefaults>({ tabSize: 2, indentSize: 2 });

  useEffect(() => {
    // Load formatting defaults from local storage
    const storedDefaults = localStorage.getItem('formattingDefaults');
    if (storedDefaults) {
      setDefaults(JSON.parse(storedDefaults));
    }
  }, []);

  useEffect(() => {
    // Save formatting defaults to local storage
    localStorage.setItem('formattingDefaults', JSON.stringify(defaults));
  }, [defaults]);

  return defaults;
}

export default useFormattingDefaults;