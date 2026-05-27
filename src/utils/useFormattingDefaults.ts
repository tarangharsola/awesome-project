{"import { useState, useEffect } from 'react';

interface UseFormattingDefaultsReturn {
  formattingDefaults: { [key: string]: any };
  updateFormattingDefaults: (defaults: { [key: string]: any }) => void;
}

const useFormattingDefaults = (): UseFormattingDefaultsReturn => {
  const [formattingDefaults, setFormattingDefaults] = useState({
    indentSize: 2,
    tabSize: 2,
  });

  const updateFormattingDefaults = (defaults: { [key: string]: any }) => {
    setFormattingDefaults(defaults);
  };

  useEffect(() => {
    const storedDefaults = localStorage.getItem('formattingDefaults');
    if (storedDefaults) {
      setFormattingDefaults(JSON.parse(storedDefaults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formattingDefaults', JSON.stringify(formattingDefaults));
  }, [formattingDefaults]);

  return { formattingDefaults, updateFormattingDefaults };
}

export default useFormattingDefaults;