import { useEffect, useRef } from 'react';
import { WebSocketClient } from '../utils/websocketClient';
import { CollaborationMessage, MessageType } from '../types/collaborationMessage';
import { DocumentState } from '../types/editor';
import { applyRemoteChange, localChangeToMessage } from './useCollaborationHelpers';

export function useCollaborationCore(
  wsClient: WebSocketClient,
  docState: DocumentState,
  setDocState: (state: DocumentState) => void,
  userId: string,
  userName: string,
  userColor: string
) {
  const pendingChanges = useRef<CollaborationMessage[]>([]);

  // Send local changes to the server
  const sendChange = (change: any) => {
    const msg = localChangeToMessage(change, userId, userName, userColor);
    wsClient.send(msg);
    pendingChanges.current.push(msg);
  };

  // Receive remote changes from the server
  useEffect(() => {
    const handler = (msg: CollaborationMessage) => {
      if (msg.senderId === userId) return; // ignore own echo
      const newState = applyRemoteChange(docState, msg);
      setDocState(newState);
    };
    wsClient.onMessage(handler);
    return () => wsClient.offMessage(handler);
  }, [wsClient, docState, setDocState, userId]);

  return { sendChange };
}
