{"import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WebSocket from 'ws';

const WebSocket = () => {
  const { roomId } = useParams();
  const [connected, setConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/${roomId}`);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'text') {
        setEditorState(EditorState.create(message.text));
      } else if (message.type === 'cursor') {
        setCursorPositions(message.cursorPositions);
      } else if (message.type === 'users') {
        setUsers(message.users);
      }
    };
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    return () => ws.close();
  }, [roomId]);

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
    </div>
  );
};

export default WebSocket;