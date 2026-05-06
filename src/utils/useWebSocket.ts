{"import { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

const useWebSocket = (roomId: string) => {
  const [connected, setConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});
  const [document, setDocument] = useState('');

  useEffect(() => {
    WebSocket.connect(roomId);
    WebSocket.on('users', (users) => setUsers(users));
    WebSocket.on('cursorPositions', (cursorPositions) => setCursorPositions(cursorPositions));
    WebSocket.on('document', (document) => setDocument(document));
  }, [roomId]);

  return { connected, users, cursorPositions, document };
};

export default useWebSocket;