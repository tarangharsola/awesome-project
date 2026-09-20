import { useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import { useUsers } from './useUsers';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

type PresenceMessage = {
  type: 'presence';
  user: User;
};

type LeaveMessage = {
  type: 'user-leave';
  userId: string;
};

type SyncMessage = {
  type: 'sync';
  users: User[];
};

type RequestSyncMessage = {
  type: 'request-sync';
};

type IncomingMessage = PresenceMessage | LeaveMessage | SyncMessage | RequestSyncMessage;

export const useAwareness = (roomId: string, username: string, color: string) => {
  const wsUrl = `${process.env.REACT_APP_WS_URL}/${roomId}`;
  const { status, sendMessage, addMessageListener } = useWebSocket(wsUrl);
  const { addUser, removeUser, setUsers } = useUsers();

  const broadcastPresence = () => {
    const msg: PresenceMessage = {
      type: 'presence',
      user: { id: uuidv4(), name: username, color },
    };
    sendMessage(msg);
  };

  useEffect(() => {
    if (status === 'connected') {
      broadcastPresence();
      sendMessage({ type: 'request-sync' } as RequestSyncMessage);
    }
  }, [status, username, color, sendMessage]);

  useEffect(() => {
    const handler = (msg: IncomingMessage) => {
      switch (msg.type) {
        case 'presence':
          addUser(msg.user);
          break;
        case 'user-leave':
          removeUser(msg.userId);
          break;
        case 'sync':
          setUsers(msg.users);
          break;
        default:
          break;
      }
    };
    const unsubscribe = addMessageListener(handler);
    return unsubscribe;
  }, [addMessageListener, addUser, removeUser, setUsers]);
};
