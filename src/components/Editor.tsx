{"import React from 'react';
import { useState, useEffect } from 'react';
import { EditorState, Editor } from 'react-simple-editor';
import MonacoEditor from 'react-monaco-editor';

const EditorComponent = () => {
  const [language, setLanguage] = useState('javascript');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [code, setCode] = useState('');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    localStorage.setItem('language', language);
 );

  const handleCodeChange = (code: string) => {
    setCode(code);
  };

  return (
    <div>
      <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <MonacoEditor
        language={language}
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default EditorComponent;