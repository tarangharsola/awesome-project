{"import { useState, useEffect } from 'react';

const useEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState('');
  const [onChange, setOnChange] = useState(() => () => {});

  useEffect(() => {
    const handleFormat = () => {
      const formattedText = formatText(value);
      setOnChange(() => (newText) => setValue(formattedText));
    };

    const handleShortcut = (event) => {
      if (event.key === 'f') {
        handleFormat();
      }
    };

    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, []);

  return { language, onChange, value };
};

export default useEditor;