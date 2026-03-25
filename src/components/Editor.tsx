import React, { useState, useEffect } from 'react';
import { EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/draft.min.css';
import EditorToolbar from './EditorToolbar';
import EditorContent from './EditorContent';

const Editor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'update') {
        setEditorState(data.editorState);
      }
      if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const handleUpdate = (editorState) => {
    setEditorState(editorState);
    const socket = new WebSocket('ws://localhost:8080');
    socket.send(JSON.stringify({ type: 'update', editorState }));
  };

  return (
    <div>
      <EditorToolbar onUpdate={handleUpdate} />
      <EditorContent editorState={editorState} users={users} />
    </div>
  );
};

export default Editor;