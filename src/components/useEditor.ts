{"import { useState, useEffect } from 'react';

const useEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState({
    mode: 'javascript',
    theme: 'monokai',
    fontSize: 14,
    showLineNumbers: true,
    showPrintMargin: false,
    showGutter: true,
    highlightActiveLine: false,
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    enableSnippets: false,
    showInvisibles: false,
    tabSize: 2
  });

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    localStorage.setItem('language', e.target.value);
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  return {
    language,
    value,
    options,
    handleLanguageChange,
    handleValueChange
  };
};

export default useEditor;