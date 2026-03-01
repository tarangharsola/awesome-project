{"import { useState, useEffect } from 'react';
import { Editor as CodeMirror } from 'react-codemirror-editor';

const useEditor = () => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [options, setOptions] = useState({
    lineNumbers: true,
    mode: 'javascript',
    theme: 'monokai'
  });

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), options);
    setValue(editor.getValue());
    return () => {
      editor.toTextArea();
    };
  }, [options]);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    setOptions({
      ...options,
      mode: language
    });
  };

  return {
    value,
    setValue,
    language,
    setLanguage,
    options,
    setOptions,
    handleLanguageChange
  };
};

export default useEditor;