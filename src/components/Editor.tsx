{"import React from 'react';
import { Editor } from 'react-simple-code-editor';
import { Highlight, Languages } from 'prismjs';

const EditorComponent = () => {
  const [language, setLanguage] = React.useState(Languages.javascript);
  const [code, setCode] = React.useState("// Your code here");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (code) => {
    setCode(code);
  };

  return (
    <Editor
      value={code}
      onValueChange={handleCodeChange}
      highlight={Highlight}
      language={language}
      padding={10}
      style={{
        fontSize: 12,
        fontFamily: "monospace",
      }}
    />
  );
};

export default EditorComponent;