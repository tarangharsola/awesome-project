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
      <br />
      <label>Font Size:</label>
      <input type="number" value={fontSize} onChange={handleFontSizeChange} />
      <br />
      <AceEditor
        mode={language}
        theme="monokai"
        value={value}
        onChange={setValue}
        fontSize={fontSize}
        showPrintMargin={false}
        showGutter={false}
        highlightActiveLine={false}
        enableBasicAutocompletion={false}
        enableLiveAutocompletion={false}
        enableSnippets={false}
        showLineNumbers={false}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: false,
        }}
      />
    </div>
  );
};
export default Editor;