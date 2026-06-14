{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorComponent = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'update') {
        setEditorState(data.editorState);
      }
    };
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const content = contentState.getPlainText();
    const ws = new WebSocket('ws://localhost:8080');
    ws.send(JSON.stringify({ type: 'update', editorState }));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      toolbarClassName='toolbar-class'
      editorClassName='editor-class'
    />
  );
};

export default EditorComponent;