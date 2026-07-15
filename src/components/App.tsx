{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import WebSocket from './WebSocket';

const App = () => {
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateCode') {
        setCode(data.code);
      } else if (data.type === 'updateCursorPositions') {
        setCursorPositions(data.cursorPositions);
      }
    };
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    ws.send(JSON.stringify({ type: 'updateCode', code: newCode }));
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleUserJoin = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUserLeave = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <h1>Code Editor</h1>
      <LanguageSelector language={language} onChange={handleLanguageChange} />
      <Editor code={code} language={language} onChange={handleCodeChange} />
      <UserList users={users} onUserJoin={handleUserJoin} onUserLeave={handleUserLeave} />
      <WebSocket ws={ws} />
    </div>
  );
};

export default App;