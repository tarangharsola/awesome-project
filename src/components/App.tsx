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
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateUsers') {
        setUsers(data.users);
      } else if (data.type === 'updateCode') {
        setCode(data.code);
      } else if (data.type === 'updateCursorPositions') {
        setCursorPositions(data.cursorPositions);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  const handleCodeChange = (code) => {
    setCode(code);
  };

  const handleCursorPositionChange = (userId, position) => {
    setCursorPositions((prevCursorPositions) => ({
      ...prevCursorPositions,
      [userId]: position,
    }));
  };

  return (
    <div>
      <LanguageSelector language={language} onChange={handleLanguageChange} />
      <Editor language={language} code={code} onChange={handleCodeChange} />
      <UserList users={users} />
      <WebSocket socket={socket} />
    </div>
  );
}

export default App;