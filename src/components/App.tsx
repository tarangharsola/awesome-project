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
      if (data.type === 'updateUsers') {
        setUsers(data.users);
      } else if (data.type === 'updateCode') {
        setCode(data.code);
      } else if (data.type === 'updateCursorPositions') {
        setCursorPositions(data.cursorPositions);
      }
    };
    return () => ws.close();
  }, []);

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  const handleCodeChange = (code) => {
    setCode(code);
  };

  const handleUserJoin = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleUserLeave = (user) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
  };

  return (
    <div>
      <LanguageSelector language={language} onChange={handleLanguageChange} />
      <Editor language={language} code={code} onChange={handleCodeChange} />
      <UserList users={users} onUserJoin={handleUserJoin} onUserLeave={handleUserLeave} />
      <WebSocket ws={ws} />
    </div>
  );
};

export default App;