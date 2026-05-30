{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import WebSocket from './WebSocket';

function App() {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});
  const [language, setLanguage] = useState('javascript');

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

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  return (
    <div>
      <h1>Collaborative Code Editor</h1>
      <LanguageSelector language={language} onChange={handleLanguageChange} />
      <Editor language={language} cursorPositions={cursorPositions} />
      <WebSocket users={users} />
    </div>
  );
}

export default App;