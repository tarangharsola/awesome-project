import { useEffect, useRef } from 'react';
import type { AwarenessMessage, UserPresence } from '../../types';
import useWebSocket from '../useWebSocket';
import { v4 as uuidv4 } from 'uuid';

/**
 * Hook that manages user awareness (cursor position, name, color).
 * It broadcasts local presence changes and merges remote updates into a shared map.
 */
export default function useAwareness(roomId: string, username: string, color: string, onUpdate: (users: Record<string, UserPresence>) => void) {
  const userId = useRef(uuidv4());
  const presenceMap = useRef<Record<string, UserPresence>>({});

  const handleMessage = (msg: AwarenessMessage) => {
    if (msg.type !== 'awareness' || msg.roomId !== roomId) return;
    const { userId: remoteId, presence } = msg;
    if (remoteId === userId.current) return; // ignore own messages
    presenceMap.current[remoteId] = presence;
    onUpdate({ ...presenceMap.current });
  };

  const { sendMessage } = useWebSocket(`wss://example.com/rooms/${roomId}`, handleMessage);

  // Broadcast initial presence
  useEffect(() => {
    const init: AwarenessMessage = {
      type: 'awareness',
      roomId,
      userId: userId.current,
      presence: { username, color, cursor: null },
    };
    sendMessage(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, username, color, sendMessage]);

  const broadcastCursor = (cursor: { line: number; ch: number } | null) => {
    const msg: AwarenessMessage = {
      type: 'awareness',
      roomId,
      userId: userId.current,
      presence: { username, color, cursor },
    };
    sendMessage(msg);
    // Update local map for immediate UI feedback
    presenceMap.current[userId.current] = { username, color, cursor };
    onUpdate({ ...presenceMap.current });
  };

  // Cleanup on unmount – inform others that this user left
  useEffect(() => {
    return () => {
      const leaveMsg: AwarenessMessage = {
        type: 'awareness-leave',
        roomId,
        userId: userId.current,
        presence: { username, color, cursor: null },
      };
      sendMessage(leaveMsg);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { broadcastCursor, localUserId: userId.current };
}
