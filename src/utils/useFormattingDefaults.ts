{"import { useState, useEffect } from 'react';

interface FormattingDefaultsState {
  formattingDefaults: { [key: string]: string };
  setFormattingDefaults: (formattingDefaults: { [key: string]: string }) => void;
}

const useFormattingDefaults = (): FormattingDefaultsState => {
  const [formattingDefaults, setFormattingDefaults] = useState({
    'indentSize': '2',
    'tabSize': '2',
  });

  useEffect(() => {
    const storedFormattingDefaults = localStorage.getItem('formattingDefaults');
    if (storedFormattingDefaults) {
      setFormattingDefaults(JSON.parse(storedFormattingDefaults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formattingDefaults', JSON.stringify(formattingDefaults));
  }, [formattingDefaults]);

  return { formattingDefaults, setFormattingDefaults };
}

export default useFormattingDefaults;