{"import React from 'react';
import { useState, useEffect } from 'react';
import AceEditor from 'react-ace';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState({
    mode: 'javascript',
    theme: 'monokai',
    fontSize: 14,
    showLineNumbers: true,
    showPrintMargin: false,
    showGutter: true,
    highlightActiveLine: false,
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    enableSnippets: false,
    showInvisibles: false,
    tabSize: 2
  });

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

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <AceEditor
        mode={language}
        theme="monokai"
        value={value}
        onChange={handleValueChange}
        name="editor"
        width="100%"
        height="300"
        fontSize={14}
        showLineNumbers={true}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={false}
        enableBasicAutocompletion={false}
        enableLiveAutocompletion={false}
        enableSnippets={false}
        showInvisibles={false}
        tabSize={2}
      />
    </div>
  );
};

export default Editor;