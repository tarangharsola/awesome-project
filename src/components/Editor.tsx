{"import React from 'react';
import { useState, useEffect } from 'react';
import AceEditor from 'react-ace';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState('');
  const [fontSize, setFontSize] = useState(14);

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

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <select value={fontSize} onChange={handleFontSizeChange}>
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
      </select>
      <AceEditor
        mode={language}
        theme="monokai"
        value={value}
        onChange={setValue}
        fontSize={fontSize}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Editor;