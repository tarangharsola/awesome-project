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
  const { code, users, cursorPositions } = useEditor();

  useEffect(() => {
    send({ type: 'JOIN', data: { username: 'John Doe' } });
  }, []);

  return (
    <div>
      <EditorComponent code={code} setCode={setCode} />
      <WebSocket send={send} receive={receive} />
      <UserList users={users} setUsers={setUsers} />
      <CursorTracker cursorPositions={cursorPositions} setCursorPositions={setCursorPositions} />
    </div>
  );
};

export default Editor;