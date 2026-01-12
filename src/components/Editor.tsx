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

    const handleEditorMount = (editor) => {
      setEditor(editor);
    };

    document.addEventListener('languageChange', handleLanguageChange);
    document.addEventListener('codeChange', handleCodeChange);
    document.addEventListener('editorMount', handleEditorMount);

    return () => {
      document.removeEventListener('languageChange', handleLanguageChange);
      document.removeEventListener('codeChange', handleCodeChange);
      document.removeEventListener('editorMount', handleEditorMount);
    };
  }, []);

  const handleFormat = () => {
    const formattedCode = editor.formatDocument(code);
    setCode(formattedCode);
  };

  const handleKeyboardShortcut = (event) => {
    if (event.key === 'F') {
      handleFormat();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcut);
    };
  }, []);

  return (
    <div>
      <select value={language} onChange={(event) => setLanguage(event.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <MonacoEditor
        language={language}
        value={code}
        onMount={(editor) => setEditor(editor)}
      />
      <button onClick={handleFormat}>Format</button>
    </div>
  );
};

export default Editor;