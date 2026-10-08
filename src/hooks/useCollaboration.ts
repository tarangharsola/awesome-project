import { useEffect, useRef } from 'react';
import { useWebSocket } from './useWebSocket';
import { CollaborationMessage, PresenceMessage } from '../types';
import { usePresence } from './usePresence';
import { useConflictResolver } from './useConflictResolver';
import { useEditor } from '../utils/useEditor';

export const useCollaboration = (roomId: string, username: string) => {
  const { ws, status, sendMessage } = useWebSocket(`${process.env.REACT_APP_WS_URL}/${roomId}`);
  const { updatePresence, users } = usePresence(username);
  const { applyRemoteChanges, getLocalChanges } = useConflictResolver();
  const editorRef = useRef<any>(null);

  // Broadcast presence periodically
  useEffect(() => {
    if (status !== 'connected') return;
    const interval = setInterval(() => {
      const cursor = editorRef.current?.getCursorPosition?.() ?? null;
      const msg: PresenceMessage = { type: 'presence', user: username, cursor };
      sendMessage(msg);
    }, 1000);
    return () => clearInterval(interval);
  }, [status, username, sendMessage]);

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (!ws) return;
    const handleMessage = (event: MessageEvent) => {
      const data: CollaborationMessage = JSON.parse(event.data);
      switch (data.type) {
        case 'operation':
          applyRemoteChanges(data);
          break;
        case 'presence':
          updatePresence(data);
          break;
        default:
          break;
      }
    };
    ws.addEventListener('message', handleMessage);
    return () => ws.removeEventListener('message', handleMessage);
  }, [ws, applyRemoteChanges, updatePresence]);

  // Send local editor changes
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const handleChange = () => {
      const ops = getLocalChanges();
      if (!ops || ops.length === 0) return;
      const msg: CollaborationMessage = { type: 'operation', ops, user: username };
      sendMessage(msg);
    };
    editor.on('change', handleChange);
    return () => editor.off('change', handleChange);
  }, [getLocalChanges, sendMessage, username]);

  return { ws, status, editorRef, users };
};