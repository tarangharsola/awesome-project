{"import React, { useState, useEffect } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorComponent = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'cursorPosition') {
        setCursorPositions(data.positions);
      } else if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    return () => ws.close();
  }, []);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertFromRaw(contentState);
    const cursorPosition = editorState.getSelection().getStart();
    const ws = new WebSocket('ws://localhost:8080');
    ws.send(JSON.stringify({
      type: 'cursorPosition',
      positions: { [cursorPosition]: 'red' }
    }));
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
};

export default EditorComponent;