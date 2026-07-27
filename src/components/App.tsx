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

  const handleCodeChange = (code) => {
    setCode(code);
    ws.send(JSON.stringify({ type: 'codeChange', code }));
  };

  const handleLanguageChange = (language) => {
    setLanguage(language);
    ws.send(JSON.stringify({ type: 'languageChange', language }));
  };

  return (
    <div>
      <h1>Collaborative Code Editor</h1>
      <LanguageSelector language={language} onChange={handleLanguageChange} />
      <Editor code={code} language={language} onChange={handleCodeChange} />
      <UserList users={users} cursorPositions={cursorPositions} />
      <WebSocket ws={ws} />
    </div>
  );
}

export default App;