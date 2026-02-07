{"import React from 'react';
import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const { editor, updateLanguage } = useEditor();

  useEffect(() => {
    updateLanguage(language);
  }, [language]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <div className="editor">
        {editor}
      </div>
    </div>
  );
};

export default Editor;