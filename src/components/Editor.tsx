{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';
import { useLanguage } from './useLanguage';

function EditorComponent({ value, language }) {
  const [editorValue, setEditorValue] = useState(value);
  const languageHook = useLanguage(language);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleEditorChange = (newEditorValue) => {
    setEditorValue(newEditorValue);
    // Send new editor value to server
  };

  return (
    <Editor
      value={editorValue}
      onChange={handleEditorChange}
      language={languageHook.language}
    />
  );
}

export default EditorComponent;