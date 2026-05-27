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
      } else if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const socket = new WebSocket('ws://localhost:8080');
    socket.send(JSON.stringify({ type: 'update', editorState }));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbarClassName='toolbarClassName'
      wrapperClassName='wrapperClassName'
      editorClassName='editorClassName'
    />
  );
}

export default EditorComponent;