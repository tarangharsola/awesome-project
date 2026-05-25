{"import { useState, useEffect } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
}

const useFormattingDefaults = (): FormattingDefaults => {
  const [defaults, setDefaults] = useState<FormattingDefaults>({ tabSize: 2, indentSize: 2 });

  useEffect(() => {
    const storedDefaults = localStorage.getItem('formattingDefaults');
    if (storedDefaults) {
      setDefaults(JSON.parse(storedDefaults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formattingDefaults', JSON.stringify(defaults));
  }, [defaults]);

  return defaults;
}
export default useFormattingDefaults;