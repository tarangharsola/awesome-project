import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWebSocket } from '../utils/hooks/useWebSocket';
import { useDispatch } from 'react-redux';
import { addRemoteUser, removeUser } from '../store/usersReducer';
import { setLocalUser } from '../store/userReducer';

interface WSMessage {
  type: string;
  payload?: any;
}

const WebSocketProvider: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const dispatch = useDispatch();
  const { isConnected, sendMessage } = useWebSocket(`wss://example.com/ws/${roomId}`);

  // Handle incoming messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data: WSMessage = JSON.parse(event.data);
      switch (data.type) {
        case 'USER_JOIN':
          dispatch(addRemoteUser(data.payload));
          break;
        case 'USER_LEAVE':
          dispatch(removeUser(data.payload.id));
          break;
        case 'CURSOR_UPDATE':
          // Handled elsewhere via awareness hook
          break;
        default:
          break;
      }
    };

    // Attach listener if socket is ready
    const socket = (sendMessage as any).socket as WebSocket | null;
    if (socket) {
      socket.addEventListener('message', handleMessage);
    }
    return () => {
      if (socket) {
        socket.removeEventListener('message', handleMessage);
      }
    };
  }, [sendMessage, dispatch]);

  // Example: send local user info on connect
  useEffect(() => {
    if (isConnected) {
      const userInfo = { id: crypto.randomUUID(), name: 'Anonymous', color: '#'+Math.floor(Math.random()*16777215).toString(16) };
      dispatch(setLocalUser(userInfo));
      sendMessage({ type: 'USER_JOIN', payload: userInfo });
    }
  }, [isConnected, sendMessage, dispatch]);

  return null; // This component only manages WS side‑effects
};

export default WebSocketProvider;
