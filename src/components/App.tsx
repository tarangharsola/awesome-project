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

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  const handleCodeChange = (code) => {
    setCode(code);
  };

  const handleCursorChange = (cursorPosition) => {
    setCursorPositions((prevCursorPositions) => {
      return {
        ...prevCursorPositions,
        [cursorPosition.userId]: cursorPosition.position
      };
    });
  };

  return (
    <div>
      <LanguageSelector language={language} onChange={handleLanguageChange} />
      <Editor language={language} code={code} onChange={handleCodeChange} />
      <UserList users={users} cursorPositions={cursorPositions} />
      <WebSocket ws={ws} />
    </div>
  );
}

export default App;