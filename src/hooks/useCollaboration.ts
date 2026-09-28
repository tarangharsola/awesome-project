import { useEffect } from 'react';
import useWebSocket from './useWebSocket';
import useConflictResolver from './useConflictResolver';
import usePresence from './usePresence';
import { EditorChange } from '../types/editor';
import { UserPresence } from '../types/presence';

export default function useCollaboration(
  sessionId: string,
  localUser: UserPresence,
  onChange: (change: EditorChange) => void
) {
  const ws = useWebSocket(sessionId);
  const { applyRemoteChange, getLocalChange } = useConflictResolver();
  const { users, updateCursor } = usePresence(sessionId, localUser);

  // Send local document changes to the server
  useEffect(() => {
    if (!ws) return;
    const handle = (change: EditorChange) => {
      ws.send(JSON.stringify({ type: 'doc-change', payload: change }));
    };
    const unsubscribe = getLocalChange(handle);
    return unsubscribe;
  }, [ws, getLocalChange]);

  // Receive remote document changes from the server
  useEffect(() => {
    if (!ws) return;
    const listener = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'doc-change') {
          applyRemoteChange(data.payload);
          onChange(data.payload);
        }
      } catch {}
    };
    ws.addEventListener('message', listener);
    return () => ws.removeEventListener('message', listener);
  }, [ws, applyRemoteChange, onChange]);

  return { users, updateCursor };
}
