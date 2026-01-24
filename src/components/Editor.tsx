{"import React from 'react';
import { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';

const Editor = () => {
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

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <br />
      <textarea value={code} onChange={handleCodeChange} />
      <br />
      <MonacoEditor
        language={language}
        value={code}
        onChange={handleEditorChange}
        onMount={(editor) => setEditor(editor)}
      />
    </div>
  );
};

export default Editor;