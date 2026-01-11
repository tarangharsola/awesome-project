{"import React from 'react';
import { useState, useEffect } from 'react';
import AceEditor from 'react-ace';

const Editor = () => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const storedValue = localStorage.getItem('editorValue');
    if (storedValue) {
      setValue(storedValue);
    }
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('editorLanguage', lang);
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    localStorage.setItem('editorFontSize', size);
  };

  const handleCodeChange = (newValue) => {
    setValue(newValue);
    localStorage.setItem('editorValue', newValue);
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      padding: 20
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
      }}>
        <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
        </select>
        <select value={fontSize} onChange={(e) => handleFontSizeChange(e.target.value)}>
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
        </select>
      </div>
      <AceEditor
        value={value}
        onChange={handleCodeChange}
        mode={language}
        theme="monokai"
        fontSize={fontSize}
        width="100%"
        height="calc(100vh - 100px)"
      />
    </div>
  );
};

export default Editor;