import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { WebSocketMessage } from '../types/websocketMessage';
import { receiveRemoteEdit } from '../store/editorActions';
import { updateUserPresence, setUsers } from '../store/usersActions';

interface UseWebSocketProps {
  url: string;
  userId: string;
  userName: string;
  userColor: string;
}

export default function useWebSocket({ url, userId, userName, userColor }: UseWebSocketProps) {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
  const socketRef = useRef<WebSocket | null>(null);
  const messageQueue = useRef<WebSocketMessage[]>([]);
  const reconnectAttempts = useRef(0);
  const maxAttempts = 10;
  const baseDelay = 1000; // ms

  const dispatch = useDispatch();

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      messageQueue.current.push(msg);
    }
  }, []);

  const flushQueue = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      messageQueue.current.forEach((m) => {
        socketRef.current?.send(JSON.stringify(m));
      });
      messageQueue.current = [];
    }
  }, []);

  const handleOpen = useCallback(() => {
    setStatus('connected');
    reconnectAttempts.current = 0;
    // Broadcast our presence immediately after connection
    sendMessage({
      type: 'presence',
      payload: { userId, userName, userColor },
    });
    // Request full document and awareness sync
    sendMessage({ type: 'syncRequest', payload: {} });
    flushQueue();
  }, [sendMessage, flushQueue, userId, userName, userColor]);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      let data: WebSocketMessage;
      try {
        data = JSON.parse(event.data);
      } catch {
        console.warn('Received malformed message', event.data);
        return;
      }
      switch (data.type) {
        case 'remoteEdit':
          dispatch(receiveRemoteEdit(data.payload));
          break;
        case 'presence':
          dispatch(updateUserPresence(data.payload));
          break;
        case 'presenceSync':
          dispatch(setUsers(data.payload.users));
          break;
        case 'syncResponse':
          // payload: { document: string, users: User[] }
          dispatch({ type: 'EDITOR/SET_STATE', payload: data.payload.document });
          dispatch(setUsers(data.payload.users));
          break;
        default:
          console.warn('Unhandled WebSocket message type', data.type);
      }
    },
    [dispatch]
  );

  const handleClose = useCallback(() => {
    setStatus('disconnected');
    attemptReconnect();
  }, []);

  const attemptReconnect = useCallback(() => {
    if (reconnectAttempts.current >= maxAttempts) {
      console.error('Maximum reconnection attempts reached. Giving up.');
      return;
    }
    const delay = baseDelay * Math.pow(2, reconnectAttempts.current);
    reconnectAttempts.current += 1;
    setTimeout(() => {
      connect();
    }, delay);
  }, []);

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    socketRef.current = ws;
    ws.onopen = handleOpen;
    ws.onmessage = handleMessage;
    ws.onclose = handleClose;
    ws.onerror = () => ws.close();
  }, [url, handleOpen, handleMessage, handleClose]);

  useEffect(() => {
    connect();
    return () => {
      socketRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, sendMessage } as const;
}
