{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = () => {
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'users':
          setUsers(data.users);
          break;
        case 'language':
          setLanguage(data.language);
          break;
        default:
          break;
      }
    };
    return () => ws.close();
  }, []);

  return { users, language, setLanguage };
};

export default useWebSocket;