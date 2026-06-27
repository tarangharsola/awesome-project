{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';

function App() {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'cursorPositions') {
        setCursorPositions(data.cursorPositions);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <Editor users={users} cursorPositions={cursorPositions} />
    </div>
  );
}
export default App;