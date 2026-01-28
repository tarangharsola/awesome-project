{"import React from 'react';
import { useState, useEffect } from 'react';
import { Editor } from 'react-simple-code-editor';
import { Highlight, Languages } from 'prismjs';

const EditorComponent = () => {
  const [language, setLanguage] = useState(Languages.javascript);
  const [code, setCode] = useState("// Your code here");
  const [formattedCode, setFormattedCode] = useState("// Your code here");

  useEffect(() => {
    Highlight.allLanguages.forEach((language) => {
      Highlight.addLanguage(language);
    });
  }, []);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
  };

  const handleCodeChange = (code: string) => {
    setCode(code);
    setFormattedCode(prism.highlight(code, Highlight.getLanguage(language), Highlight.highlightElement(code)));
  };

  return (
    <div>
      <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        {Languages.all.map((language) => (
          <option key={language} value={language}>{language}</option>
        ))}
      </select>
      <Editor
        value={code}
        onValueChange={handleCodeChange}
        highlight={formattedCode}
        padding={10}
        style={{
          fontSize: 12,
          fontFamily: 'monospace',
        }}
      />
    </div>
  );
};

export default EditorComponent;