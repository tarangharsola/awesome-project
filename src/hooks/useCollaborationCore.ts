import { useEffect, useRef, useState } from 'react';
import { useWebSocket } from './useWebSocket';
import { resolveChange } from '../utils/conflict';
import { CollaborationMessage, DocumentChange, CollaborationUser } from '../types/collaboration';
import { usePresence } from './usePresence';

/**
 * Core collaboration hook handling WebSocket communication, CRDT conflict resolution,
 * and presence broadcasting. It is deliberately kept framework‑agnostic so that
 * higher‑level hooks can compose a convenient API for components.
 */
export function useCollaborationCore(roomId: string, user: CollaborationUser) {
  const { socket, status, connect, disconnect } = useWebSocket();
  const [docVersion, setDocVersion] = useState(0);
  const [content, setContent] = useState<string>('');
  const pendingOps = useRef<any[]>([]);
  const { broadcastPresence, remoteUsers, updateRemoteCursor } = usePresence(user);

  // Establish connection when roomId changes
  useEffect(() => {
    if (!roomId) return;
    connect(`wss://your-backend.example.com/rooms/${roomId}`);
    // Notify server of new participant
    const joinMsg: CollaborationMessage = { type: 'join', payload: user };
    socket?.send(JSON.stringify(joinMsg));
    return () => {
      const leaveMsg: CollaborationMessage = { type: 'leave', payload: { id: user.id } };
      socket?.send(JSON.stringify(leaveMsg));
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, user.id]);

  // Incoming message handling
  useEffect(() => {
    if (!socket) return;
    const handleMessage = (event: MessageEvent) => {
      const msg: CollaborationMessage = JSON.parse(event.data);
      switch (msg.type) {
        case 'change': {
          const change: DocumentChange = msg.payload;
          // Resolve using CRDT strategy
          const newContent = resolveChange(content, change.ops);
          setContent(newContent);
          setDocVersion(change.version);
          break;
        }
        case 'presence':
          broadcastPresence(msg.payload);
          break;
        case 'join':
          // Remote user joined – add to presence list
          broadcastPresence({ type: 'join', user: msg.payload });
          break;
        case 'leave':
          broadcastPresence({ type: 'leave', userId: msg.payload.id });
          break;
        default:
          // No‑op for unknown types
          break;
      }
    };
    socket.addEventListener('message', handleMessage);
    return () => socket.removeEventListener('message', handleMessage);
  }, [socket, content, broadcastPresence]);

  // Outgoing change handling – called by the editor component
  const submitLocalChange = (ops: any[]) => {
    const newVersion = docVersion + 1;
    const changeMsg: CollaborationMessage = {
      type: 'change',
      payload: { version: newVersion, ops } as DocumentChange
    };
    socket?.send(JSON.stringify(changeMsg));
    // Optimistically apply locally
    const newContent = resolveChange(content, ops);
    setContent(newContent);
    setDocVersion(newVersion);
  };

  // Cursor updates – thin wrapper around presence utility
  const updateCursor = (position: { line: number; ch: number }) => {
    const cursorMsg: CollaborationMessage = {
      type: 'presence',
      payload: { userId: user.id, position }
    };
    socket?.send(JSON.stringify(cursorMsg));
    updateRemoteCursor(user.id, position);
  };

  return {
    content,
    status,
    remoteUsers,
    submitLocalChange,
    updateCursor,
    reconnect: () => connect(`wss://your-backend.example.com/rooms/${roomId}`)
  };
}
