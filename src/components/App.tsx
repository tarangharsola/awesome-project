{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import WebSocket from './WebSocket';
import UserList from './UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [editorValue, setEditorValue] = useState('');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateUsers') {
        setUsers(data.users);
      } else if (data.type === 'updateEditorValue') {
        setEditorValue(data.editorValue);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleUserJoin = (username) => {
    setUsers([...users, { username, color: getRandomColor() }]);
  };

  const handleUserLeave = (username) => {
    setUsers(users.filter((user) => user.username !== username));
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
    ws.send(JSON.stringify({ type: 'updateEditorValue', editorValue: value }));
  };

  return (
    <div>
      <Editor value={editorValue} onChange={handleEditorChange} language={language} />
      <WebSocket ws={ws} />
      <UserList users={users} />
    </div>
  );
}

export default App;