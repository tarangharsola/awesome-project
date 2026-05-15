{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import WebSocket from './WebSocket';

function App() {
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [editorValue, setEditorValue] = useState('');
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateUsers') {
        setUsers(data.users);
      } else if (data.type === 'updateCursorPositions') {
        setCursorPositions(data.cursorPositions);
      }
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleUserJoin = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleUserLeave = (user) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
  };

  return (
    <div>
      <LanguageSelector language={language} onChange={handleLanguageChange} />
      <Editor value={editorValue} onChange={handleEditorChange} language={language} />
      <UserList users={users} />
      <WebSocket onUserJoin={handleUserJoin} onUserLeave={handleUserLeave} />
    </div>
  );
}

export default App;