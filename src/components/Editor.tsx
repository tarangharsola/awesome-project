{"import React from 'react';
import { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-html';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState('');
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        setValue(value + '  ');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLanguageChange = (language) => {
    setLanguage(language);
    setValue('');
  };

  const handleValueChange = (value) => {
    setValue(value);
  };

  const handleFontSizeChange = (fontSize) => {
    setFontSize(fontSize);
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <AceEditor
        mode={language}
        value={value}
        onChange={handleValueChange}
        fontSize={fontSize}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
        }}
      />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        <button onClick={() => handleLanguageChange('javascript')}>JavaScript</button>
        <button onClick={() => handleLanguageChange('python')}>Python</button>
        <button onClick={() => handleLanguageChange('html')}>HTML</button>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        <button onClick={() => handleFontSizeChange(fontSize + 1)}>Increase Font Size</button>
        <button onClick={() => handleFontSizeChange(fontSize - 1)}>Decrease Font Size</button>
      </div>
    </div>
  );
};

export default Editor;