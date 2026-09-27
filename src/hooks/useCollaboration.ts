import { useEffect, useState } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';
import { CollaborationMessage } from '../types/collaborationMessage';
import useWebSocket from './useWebSocket';

export interface CollaborationState {
  content: string;
  cursors: Record<string, number>;
  users: Record<string, { color: string }>;
}

export const useCollaboration = (sessionId: string, username: string, color: string) => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(`wss://example.com/${sessionId}`);
  const [state, setState] = useState<CollaborationState>({
    content: '',
    cursors: {},
    users: { [username]: { color } },
  });

  // announce presence when connection opens
  useEffect(() => {
    if (readyState === WebSocket.OPEN) {
      const joinMsg: CollaborationMessage = { type: 'join', username, color };
      sendMessage({ sessionId, payload: joinMsg });
    }
  }, [readyState, sendMessage, sessionId, username, color]);

  // handle inbound messages
  useEffect(() => {
    if (!lastMessage) return;
    const msg = (lastMessage as WebSocketMessage).payload as CollaborationMessage;
    setState(prev => {
      const next = { ...prev };
      switch (msg.type) {
        case 'join':
          next.users[msg.username] = { color: msg.color };
          break;
        case 'leave':
          delete next.users[msg.username];
          delete next.cursors[msg.username];
          break;
        case 'cursor':
          next.cursors[msg.username] = msg.position;
          break;
        case 'content':
          next.content = msg.delta; // simple replace; real merging handled elsewhere
          break;
      }
      return next;
    });
  }, [lastMessage]);

  const broadcastCursor = (position: number) => {
    const cursorMsg: CollaborationMessage = { type: 'cursor', username, position };
    sendMessage({ sessionId, payload: cursorMsg });
  };

  const broadcastContent = (delta: string, version: number) => {
    const contentMsg: CollaborationMessage = { type: 'content', delta, version };
    sendMessage({ sessionId, payload: contentMsg });
  };

  return { state, broadcastCursor, broadcastContent, readyState };
};
