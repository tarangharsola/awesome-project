{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';
import { OperationalTransformation } from 'ot-react';

const useEditor = () => {
  const [editorState, setEditorState] = useState({
    text: ''
  });

  useEffect(() => {
    const ot = new OperationalTransformation();
    ot.init();
    return () => {
      ot.destroy();
    };
  }, []);

  const handleEditorChange = (newText) => {
    setEditorState({
      text: newText
    });
    ot.applyChange(newText);
  };

  return {
    editorState,
    handleEditorChange
  };
};

export default useEditor;