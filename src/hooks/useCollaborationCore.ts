import { useEffect, useCallback } from 'react';
import { useCollaborationLogic } from './useCollaborationLogic';
import { useDispatch } from '../store';
import { applyRemoteOps } from '../store/editorActions';
import { updateRemoteCursor } from '../store/usersActions';
import { setUserPresence } from '../store/userActions';
import { EditorOperation } from '../types/editor';
import { Presence } from '../types/presence';

export function useCollaborationCore(sessionId: string, userId: string, username: string, color: string) {
  const dispatch = useDispatch();

  const {
    initWebSocket,
    sendDocChange,
    sendCursorUpdate,
    sendPresence,
  } = useCollaborationLogic(
    `${process.env.REACT_APP_WS_URL}/${sessionId}`,
    (ops: EditorOperation[]) => dispatch(applyRemoteOps(ops)),
    (remoteUserId: string, position: number) => dispatch(updateRemoteCursor(remoteUserId, position)),
    (presence: Presence) => dispatch(setUserPresence(presence))
  );

  // Initialize connection on mount
  useEffect(() => {
    initWebSocket();
    // announce presence
    sendPresence({ userId, username, color, status: 'join' });
    return () => {
      sendPresence({ userId, username, color, status: 'leave' });
    };
  }, [initWebSocket, sendPresence, userId, username, color]);

  // Expose helpers for editor component
  const broadcastOps = useCallback((ops: EditorOperation[], version: number) => {
    sendDocChange(ops, version);
  }, [sendDocChange]);

  const broadcastCursor = useCallback((position: number) => {
    sendCursorUpdate(userId, position);
  }, [sendCursorUpdate, userId]);

  return { broadcastOps, broadcastCursor };
}
