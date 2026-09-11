import { useEffect, useState } from 'react';
import { useWebSocket } from './useWebSocket';
import type { JoinMessage, LeaveMessage, PresenceMessage, WebSocketMessage } from '../types/websocketMessage';

export interface User {
  userId: string;
  username: string;
  color: string;
}

export const useAwareness = (url: string, sessionId: string, localUser: User) => {
  const { send, lastMessage, readyState } = useWebSocket(url);
  const [users, setUsers] = useState<User[]>([localUser]);

  // Announce local user join when connection is ready
  useEffect(() => {
    if (readyState === WebSocket.OPEN) {
      const joinMsg: JoinMessage = {
        type: 'join',
        sessionId,
        userId: localUser.userId,
        username: localUser.username,
        color: localUser.color,
        timestamp: Date.now(),
      };
      send(joinMsg);
    }
  }, [readyState, sessionId, localUser, send]);

  // Handle incoming awareness messages
  useEffect(() => {
    if (!lastMessage) return;
    const msg = lastMessage as WebSocketMessage;
    switch (msg.type) {
      case 'join': {
        const exists = users.some((u) => u.userId === msg.userId);
        if (!exists) {
          setUsers((prev) => [...prev, { userId: msg.userId, username: msg.username, color: msg.color }]);
        }
        break;
      }
      case 'leave': {
        setUsers((prev) => prev.filter((u) => u.userId !== msg.userId));
        break;
      }
      case 'presence': {
        const presence = (msg as PresenceMessage).users;
        setUsers(presence);
        break;
      }
      default:
        break;
    }
  }, [lastMessage, users]);

  // Announce leave on page unload
  useEffect(() => {
    const handleUnload = () => {
      const leaveMsg: LeaveMessage = {
        type: 'leave',
        sessionId,
        userId: localUser.userId,
        timestamp: Date.now(),
      };
      send(leaveMsg);
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [sessionId, localUser, send]);

  return { users, send, readyState };
};