{"import React from 'react';
import { useState, useEffect } from 'react';
import { EditorState, Editor } from 'react-simple-editor';
import { MonacoEditor } from 'react-monaco-editor';

const EditorComponent = () => {
  const [language, setLanguage] = useState('javascript');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
    };
    document.addEventListener('languageChange', handleLanguageChange);
    return () => {
      document.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setEditorValue(editorState.getValue());
  };

  const handleFormat = () => {
    const formattedValue = editorValue.replace(/\n/g, '\n\t');
    setEditorValue(formattedValue);
  };

  return (
    <div>
      <select value={language} onChange={(event) => setLanguage(event.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <button onClick={handleFormat}>Format</button>
      <EditorState
        editorState={editorState}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default EditorComponent;