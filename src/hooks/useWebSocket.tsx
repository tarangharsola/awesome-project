import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addRemoteChange } from '../store/editorActions';
import { updateUserPresence, removeUser } from '../store/usersReducer';
import { WebSocketMessage, MessageType } from '../types/websocketMessage';

/**
 * Hook that manages a WebSocket connection for a collaborative editing session.
 * It provides automatic reconnection with exponential back‑off, re‑synchronisation
 * of document state, and re‑broadcast of user presence to keep awareness consistent.
 */
export function useWebSocket(roomId: string, username: string, color: string) {
  const dispatch = useDispatch();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 10;
  const baseDelay = 500; // ms
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  // Broadcast presence (join) message – used on initial connect and after reconnection
  const broadcastPresence = useCallback(() => {
    const presenceMsg: WebSocketMessage = {
      type: MessageType.PRESENCE,
      payload: { username, color, roomId },
    };
    sendMessage(presenceMsg);
  }, [username, color, roomId, sendMessage]);

  // Request full document sync – useful after a reconnect to recover any missed ops
  const requestSync = useCallback(() => {
    const syncMsg: WebSocketMessage = {
      type: MessageType.SYNC_REQUEST,
      payload: { roomId },
    };
    sendMessage(syncMsg);
  }, [roomId, sendMessage]);

  // Core connection logic
  useEffect(() => {
    let isMounted = true;
    const connect = () => {
      if (!isMounted) return;
      setStatus('connecting');
      const ws = new WebSocket(`${process.env.REACT_APP_WS_URL}/${roomId}`);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!isMounted) return;
        setStatus('connected');
        reconnectAttemptsRef.current = 0;
        broadcastPresence();
        requestSync();
      };

      ws.onmessage = (event) => {
        if (!isMounted) return;
        let msg: WebSocketMessage;
        try {
          msg = JSON.parse(event.data);
        } catch {
          console.warn('Received malformed message', event.data);
          return;
        }
        switch (msg.type) {
          case MessageType.CHANGE:
            dispatch(addRemoteChange(msg.payload));
            break;
          case MessageType.PRESENCE:
            dispatch(updateUserPresence(msg.payload));
            break;
          case MessageType.PRESENCE_LEAVE:
            dispatch(removeUser(msg.payload.username));
            break;
          case MessageType.SYNC_RESPONSE:
            // Replace local editor state with the authoritative snapshot
            dispatch({ type: 'EDITOR/SET_STATE', payload: msg.payload });
            break;
          default:
            console.warn('Unhandled message type', msg.type);
        }
      };

      ws.onclose = () => {
        if (!isMounted) return;
        setStatus('disconnected');
        // Attempt reconnection with exponential back‑off
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = baseDelay * 2 ** reconnectAttemptsRef.current;
          reconnectAttemptsRef.current += 1;
          setTimeout(connect, delay);
        } else {
          console.error('Maximum reconnection attempts reached');
        }
      };

      ws.onerror = (err) => {
        console.error('WebSocket error', err);
        ws.close();
      };
    };

    connect();

    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, broadcastPresence, requestSync]);

  // Expose a convenient send function for editor changes
  const sendChange = useCallback(
    (change: any) => {
      const msg: WebSocketMessage = {
        type: MessageType.CHANGE,
        payload: { ...change, roomId, author: username },
      };
      sendMessage(msg);
    },
    [roomId, username, sendMessage]
  );

  return { status, sendChange };
}
