{"import React from 'react';
import { useLanguage } from '../utils/useLanguage';

const Editor = () => {
  const language = useLanguage();
  const [code, setCode] = React.useState('');
  const [formattingDefaults, setFormattingDefaults] = React.useState({
    indentSize: 2,
    tabSize: 2
  });

  const handleLanguageChange = (language: string) => {
    setCode('');
    setFormattingDefaults({
      indentSize: language === 'javascript' ? 4 : 2,
      tabSize: language === 'javascript' ? 4 : 2
    });
  };

  return (
    <div>
      <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} style={{
        fontSize: 16,
        padding: 10,
        width: '100%',
        height: '100vh'
      }}/>
      <button onClick={() => setCode(formatCode(code, formattingDefaults))}>Format</button>
    </div>
  );
};

export default Editor;