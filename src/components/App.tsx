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
      if (data.type === 'cursorPosition') {
        setCursorPositions(data.cursorPositions);
      } else if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    return () => ws.close();
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    ws.send(JSON.stringify({ type: 'codeChange', code: newCode }));
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div>
      <h1>Code Editor</h1>
      <LanguageSelector language={language} onChange={handleLanguageChange} />
      <Editor code={code} language={language} onChange={handleCodeChange} />
      <UserList users={users} />
      <WebSocket ws={ws} />
    </div>
  );
}

export default App;