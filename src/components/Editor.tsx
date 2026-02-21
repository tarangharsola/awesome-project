{"import React from 'react';
import { useEditor } from './useEditor';
import { MonacoEditor } from 'react-monaco-editor';

const Editor = () => {
  const { language, code, editor, setLanguage, setCode, setEditor } = useEditor();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleEditorChange = (editor) => {
    setEditor(editor);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value='javascript'>JavaScript</option>
        <option value='python'>Python</option>
        <option value='html'>HTML</option>
      </select>
      <br />
      <textarea value={code} onChange={handleCodeChange} />
      <br />
      <MonacoEditor
        language={language}
        value={code}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default Editor;