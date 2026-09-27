import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWebSocket } from './useWebSocket';
import { applyRemoteOperation } from '../utils/conflictResolver';
import { setDocumentContent } from '../store/editorActions';
import { addUser, removeUser, updateUserPresence } from '../store/users';
import { RootState } from '../store';
import { CollaborationMessage } from '../types/collaborationMessage';
import { getUserInfo } from '../store/user';

export const useCollaboration = () => {
  const dispatch = useDispatch();
  const user = getUserInfo();
  const pendingOps = useRef<CollaborationMessage[]>([]);

  const handleMessage = (msg: CollaborationMessage) => {
    switch (msg.type) {
      case 'operation':
        applyRemoteOperation(msg.payload);
        break;
      case 'presence':
        if (msg.payload.username !== user.name) {
          dispatch(updateUserPresence(msg.payload));
        }
        break;
      case 'sync':
        dispatch(setDocumentContent(msg.payload.content));
        break;
      case 'join':
        dispatch(addUser(msg.payload));
        break;
      case 'leave':
        dispatch(removeUser(msg.payload.username));
        break;
      default:
        break;
    }
  };

  const { connected, send } = useWebSocket(handleMessage);

  // Flush queued operations when connection is (re)established
  useEffect(() => {
    if (connected) {
      pendingOps.current.forEach((op) => send(op));
      pendingOps.current = [];
    }
  }, [connected, send]);

  const broadcastOperation = (op: any) => {
    const msg: CollaborationMessage = { type: 'operation', payload: op };
    if (connected) {
      send(msg);
    } else {
      pendingOps.current.push(msg);
    }
  };

  // On reconnect request full document sync and re‑announce presence
  useEffect(() => {
    if (connected) {
      send({ type: 'requestSync', payload: {} });
      send({
        type: 'presence',
        payload: { username: user.name, color: user.color, cursor: null }
      });
    }
  }, [connected, send, user]);

  return { broadcastOperation };
};
