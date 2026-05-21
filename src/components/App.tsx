{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import UserList from './UserList';
import WebSocket from './WebSocket';

function App() {
  const [users, setUsers] = useState([]);
  const [editorState, setEditorState] = useState({});
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'editorState') {
        setEditorState(data.editorState);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <Editor editorState={editorState} setEditorState={setEditorState} />
      <UserList users={users} />
      <WebSocket ws={ws} />
    </div>
  );
}

export default App;