{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import WebSocket from './WebSocket';

function App() {
  const [users, setUsers] = useState([]);
  const [editor, setEditor] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'editor') {
        setEditor(data.editor);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <Editor editor={editor} />
      <WebSocket ws={ws} users={users} />
    </div>
  );
}

export default App;