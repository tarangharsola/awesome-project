{"import { useState, useEffect } from 'react';
import { EditorState, Editor } from 'react-simple-editor';

const useEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    const handleLanguageChange = (event) => {
      // handle language change event
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

  return {
    editorState,
    editorValue,
    handleEditorChange,
  };
};

export default useEditor;