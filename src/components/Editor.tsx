{"import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorComponent = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
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

  const handleUpdate = (editorState) => {
    setEditorState(editorState);
    socket.send(JSON.stringify({
      type: 'update',
      editorState,
    }));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleUpdate}
      toolbarClassName='toolbarClassName'
      editorClassName='editorClassName'
    />
  );
};

export default EditorComponent;