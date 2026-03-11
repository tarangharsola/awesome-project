{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-code-editor';
import { Highlight, Languages } from 'prismjs';

const EditorComponent = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(Languages.javascript);

  useEffect(() => {
    Highlight.init(Languages[language]);
  }, [language]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <Editor
      value={code}
      onValueChange={handleCodeChange}
      highlight={Highlight}
      language={language}
    />
  );
};

export default EditorComponent;