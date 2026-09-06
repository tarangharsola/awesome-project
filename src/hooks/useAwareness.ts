import { useEffect, useState } from 'react';
import { useWebSocket } from './useWebSocket';
import { User } from '../types';
import { WebSocketMessage, MessageType } from '../types/websocketMessage';

/**
 * Hook that tracks user presence (join/leave) and provides a list of active users.
 */
export function useAwareness(roomId: string, user: User) {
  const { status, sendMessage, lastMessage } = useWebSocket(roomId, user);
  const [users, setUsers] = useState<User[]>([]);

  // Announce our presence when the socket becomes ready
  useEffect(() => {
    if (status === 'connected') {
      const joinMsg: WebSocketMessage = {
        type: MessageType.JOIN,
        payload: { userId: user.id, name: user.name, color: user.color }
      };
      sendMessage(joinMsg);
    }
  }, [status, sendMessage, user]);

  // React to incoming presence‑related messages
  useEffect(() => {
    if (!lastMessage) return;
    const { type, payload } = lastMessage;
    switch (type) {
      case MessageType.PRESENCE:
        setUsers(payload.users.map(u => ({ id: u.userId, name: u.name, color: u.color })));
        break;
      case MessageType.JOIN:
        setUsers(prev => [...prev, { id: payload.userId, name: payload.name, color: payload.color }]);
        break;
      case MessageType.LEAVE:
        setUsers(prev => prev.filter(u => u.id !== payload.userId));
        break;
      default:
        // ignore unrelated messages
        break;
    }
  }, [lastMessage]);

  return { status, users };
}
