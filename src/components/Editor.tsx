{"import React, { useState, useEffect } from 'react';
import EditorComponent from './EditorComponent';
import WebSocket from './WebSocket';
import useWebSocket from './useWebSocket';
import useEditor from './useEditor';

const Editor = () => {
  const [code, setCode] = useState('');
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});
  const { send, receive } = useWebSocket();
  const { code, users: editorUsers, cursorPositions: editorCursorPositions } = useEditor();

  useEffect(() => {
    send({ type: 'JOIN', data: { code, users } });
  }, [code, users]);

  return (
    <div>
      <EditorComponent code={code} setCode={setCode} users={editorUsers} cursorPositions={editorCursorPositions} />
      <WebSocket receive={receive} />
    </div>
  );
};

export default Editor;