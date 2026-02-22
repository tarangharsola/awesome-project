{"import React from 'react';
import { useEditor } from './useEditor';

const Editor = () => {
  const { language, code, setCode } = useEditor();

  const handleLanguageChange = (language: string) => {
    setCode(code);
    setLanguage(language);
  };

  return (
    <div>
      <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang.syntax} value={lang.syntax}>{lang.name}</option>
        ))}
      </select>
      <textarea value={code} onChange={(e) => setCode(e.target.value)}>
      </textarea>
    </div>
  );
};

export default Editor;