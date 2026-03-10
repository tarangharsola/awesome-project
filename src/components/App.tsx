{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import WebSocket from './WebSocket';

const App = () => {
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [editorValue, setEditorValue] = useState('');
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

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  return (
    <div>
      <LanguageSelector language={language} onChange={handleLanguageChange} />
      <Editor value={editorValue} language={language} onChange={handleEditorChange} />
      <UserList users={users} />
      <WebSocket cursorPositions={cursorPositions} />
    </div>
  );
};

export default App;