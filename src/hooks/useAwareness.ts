import { useEffect, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import { useUsers } from './useUsers';
import type { WebSocketMessage } from '../types/websocketMessage';
import type { User } from '../types';

/**
 * Hook that manages user awareness (presence) over the collaborative WebSocket.
 * It broadcasts the local user on connect/reconnect and keeps the remote user list
 * in sync with join/leave messages.
 */
export function useAwareness(roomId: string, localUser: User) {
  const { ws, status, sendMessage } = useWebSocket(`${process.env.REACT_APP_WS_URL}/${roomId}`);
  const { users, addUser, removeUser, setUsers } = useUsers();

  // Broadcast local presence whenever the socket becomes connected
  const broadcastPresence = useCallback(() => {
    if (status !== 'connected') return;
    const msg: WebSocketMessage = {
      type: 'presence',
      payload: { user: localUser }
    };
    sendMessage(msg);
  }, [status, sendMessage, localUser]);

  // Handle incoming awareness messages
  const handleMessage = useCallback((event: MessageEvent) => {
    const data: WebSocketMessage = JSON.parse(event.data);
    switch (data.type) {
      case 'presence': {
        const remoteUser: User = data.payload.user;
        if (remoteUser.id !== localUser.id) {
          addUser(remoteUser);
        }
        break;
      }
      case 'presence:leave': {
        const { userId } = data.payload;
        removeUser(userId);
        break;
      }
      case 'presence:sync': {
        // Full user list sync (used after reconnect)
        const remoteUsers: User[] = data.payload.users;
        setUsers(remoteUsers.filter(u => u.id !== localUser.id));
        break;
      }
      default:
        // ignore other messages – they are handled elsewhere
        break;
    }
  }, [addUser, removeUser, setUsers, localUser.id]);

  // Attach listeners and broadcast on (re)connect
  useEffect(() => {
    if (!ws) return;
    ws.addEventListener('message', handleMessage as any);
    if (status === 'connected') broadcastPresence();
    return () => {
      ws.removeEventListener('message', handleMessage as any);
    };
  }, [ws, status, broadcastPresence, handleMessage]);

  // When reconnecting, request a full sync of users from the server
  useEffect(() => {
    if (status === 'connected') {
      const syncMsg: WebSocketMessage = { type: 'presence:requestSync', payload: {} };
      sendMessage(syncMsg);
    }
  }, [status, sendMessage]);
}
