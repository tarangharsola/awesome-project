{"import React from 'react';
import { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';
import { MonacoEditor } from 'react-monaco-editor';
import LanguageSelector from './LanguageSelector';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ line: 0, column: 0 });

  useEffect(() => {
    const handleLanguageChange = (language) => {
      setLanguage(language);
    };

    const handleCodeChange = (code) => {
      setCode(code);
    };

    const handleCursorPositionChange = (cursorPosition) => {
      setCursorPosition(cursorPosition);
    };

    return () => {
      // Clean up
    };
  }, []);

  return (
    <div>
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <Editor language={language} code={code} cursorPosition={cursorPosition} setCode={setCode} setCursorPosition={setCursorPosition} />
    </div>
  );
};

export default Editor;