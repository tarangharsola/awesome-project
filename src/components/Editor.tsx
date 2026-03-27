{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editors';
import { useLanguage } from './useLanguage';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';

const EditorComponent: React.FC = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const { languages, onSelect } = useLanguage();
  const { handleFormat } = useKeyboardShortcuts();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    onSelect(language);
    localStorage.setItem('language', language);
  };

  return (
    <div className="editor">
      <LanguageSelector languages={languages} selectedLanguage={language} onSelect={handleLanguageChange} />
      <Editor code={code} onCodeChange={(newCode) => setCode(newCode)} />
      <button onClick={handleFormat}>Format</button>
    </div>
  );

  return EditorComponent;
}
export default EditorComponent;