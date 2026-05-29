{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function EditorComponent() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'update') {
        setEditorState(data.editorState);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    const socket = new WebSocket('ws://localhost:8080');
    socket.send(JSON.stringify({
      type: 'update',
      editorState,
    }));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbarClassName='toolbar-class'
      wrapperClassName='wrapper-class'
      editorClassName='editor-class'
    />
  );
}

export default EditorComponent;