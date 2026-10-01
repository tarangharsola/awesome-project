import { useEffect, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import type { PresenceMessage } from '../types/presence';
import type { User } from '../types';

interface UsePresenceOptions {
  roomId: string;
  user: User;
  onUserListUpdate: (users: User[]) => void;
}

/**
 * Manages user presence within a collaborative room.
 * Broadcasts join/leave events and keeps the local user list in sync,
 * even after reconnections.
 */
export function usePresence({ roomId, user, onUserListUpdate }: UsePresenceOptions) {
  const { isConnected, sendMessage } = useWebSocket({
    url: `${process.env.REACT_APP_WS_URL}/rooms/${roomId}`,
    onMessage: handleMessage,
    initPayload: { type: 'join', ...user },
  });

  // Broadcast our presence on (re)connect
  useEffect(() => {
    if (isConnected) {
      const joinMsg: PresenceMessage = {
        type: 'presence',
        action: 'join',
        roomId,
        user,
      };
      sendMessage(joinMsg);
    }
  }, [isConnected, sendMessage, roomId, user]);

  // Handle incoming presence updates
  const handleMessage = useCallback((msg: PresenceMessage) => {
    if (msg.type !== 'presence') return;
    switch (msg.action) {
      case 'join':
      case 'leave':
        // Server sends the full user list on each presence change
        onUserListUpdate(msg.users);
        break;
      default:
        console.warn('Unknown presence action', msg.action);
    }
  }, [onUserListUpdate]);

  // Notify server when we unload the page (graceful leave)
  useEffect(() => {
    const handleBeforeUnload = () => {
      const leaveMsg: PresenceMessage = {
        type: 'presence',
        action: 'leave',
        roomId,
        user,
      };
      // Use navigator.sendBeacon for best‑effort delivery
      const url = `${process.env.REACT_APP_WS_URL}/rooms/${roomId}`;
      navigator.sendBeacon(url, JSON.stringify(leaveMsg));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [roomId, user]);
}
