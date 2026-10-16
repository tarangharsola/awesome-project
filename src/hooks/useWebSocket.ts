import { useWebSocketCore, WSOptions } from './useWebSocketCore';
import { CollaborationMessage } from '../types/collaborationTypes';

export const useWebSocket = (options: WSOptions) => {
  const { connected, lastMessage, sendMessage } = useWebSocketCore(options);

  const sendCollaboration = (msg: CollaborationMessage) => {
    sendMessage({ type: msg.type, payload: msg.payload });
  };

  const collaborationMessage = lastMessage as CollaborationMessage | null;

  return { connected, collaborationMessage, sendCollaboration };
};
