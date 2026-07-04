{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import WebSocket from './WebSocket';

function App() {
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'cursorUpdate') {
        setCursorPositions(data.cursorPositions);
      } else if (data.type === 'userUpdate') {
        setUsers(data.users);
      }
    };
    return () => ws.close();
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    WebSocket.send({ type: 'codeUpdate', code: newCode });
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
      <LanguageSelector language={language} onChange={handleLanguageChange} />
      <Editor code={code} language={language} onChange={handleCodeChange} />
      <UserList users={users} onUserJoin={handleUserJoin} onUserLeave={handleUserLeave} />
      <WebSocket ws={ws} />
    </div>
  );
}

export default App;