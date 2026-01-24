{"import { useState, useEffect } from 'react';

const useEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
    };

    const handleCodeChange = (event) => {
      setCode(event.target.value);
    };

    const handleEditorChange = (value) => {
      setCode(value);
    };

    document.addEventListener('languagechange', handleLanguageChange);
    document.addEventListener('codechange', handleCodeChange);
    editor.on('change', handleEditorChange);

    return () => {
      document.removeEventListener('languagechange', handleLanguageChange);
      document.removeEventListener('codechange', handleCodeChange);
      editor.off('change', handleEditorChange);
    };
  }, [editor]);

  return {
    language,
    code,
    setLanguage,
    setCode,
    editor,
    setEditor
  };
};

export default useEditor;