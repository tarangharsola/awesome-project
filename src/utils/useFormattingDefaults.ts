import { useState, useEffect } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
}

const useFormattingDefaults = () => {
  const [defaults, setDefaults] = useState<FormattingDefaults>({});

  useEffect(() => {
    const storedDefaults = localStorage.getItem('formattingDefaults');
    if (storedDefaults) {
      setDefaults(JSON.parse(storedDefaults));
    }
  }, []);

  useEffect(() => {
    if (defaults) {
      localStorage.setItem('formattingDefaults', JSON.stringify(defaults));
    }
  }, [defaults]);

  return defaults;
}

export default useFormattingDefaults;