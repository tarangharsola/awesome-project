{"import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditorState, Editor } from 'prosemirror-editor';
import { history } from './useWebSocket';

const EditorComponent = () => {
  const dispatch = useDispatch();
  const editorState = useSelector((state) => state.editor);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const editorInstance = new EditorState();
    setEditor(editorInstance);
  }, []);

  const handleTextChange = (text) => {
    dispatch({ type: 'UPDATE_EDITOR_STATE', payload: text });
  };

  return (
    <Editor
      value={editorState}
      onChange={handleTextChange}
    />
  );
};

export default EditorComponent;