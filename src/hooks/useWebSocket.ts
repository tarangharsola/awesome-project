import { useEffect, useRef, useState } from 'react';
import { User, DocumentChange, Cursor } from '../types';

interface WebSocketMessage {
  type: 'change' | 'cursor' | 'presence';
  payload: any;
}

export function useWebSocket(roomId: string, user: User) {
  const [connected, setConnected] = useState(false);
  const [remoteCursors, setRemoteCursors] = useState<Record<string, Cursor>>({});
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);

  const sendMessage = (msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  const broadcastChange = (change: DocumentChange) => {
    sendMessage({ type: 'change', payload: change });
  };

  const broadcastCursor = (cursor: Cursor) => {
    sendMessage({ type: 'cursor', payload: cursor });
  };

  const handleMessage = (event: MessageEvent) => {
    try {
      const msg: WebSocketMessage = JSON.parse(event.data);
      switch (msg.type) {
        case 'cursor':
          setRemoteCursors(prev => ({ ...prev, [msg.payload.userId]: msg.payload }));
          break;
        // other message types can be handled by consumers via callbacks
        default:
          break;
      }
    } catch (e) {
      console.error('Failed to parse WebSocket message', e);
    }
  };

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket(`${process.env.REACT_APP_WS_URL}/rooms/${roomId}`);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnected(true);
        reconnectAttempts.current = 0;
        // announce presence
        sendMessage({ type: 'presence', payload: { user } });
      };

      ws.onmessage = handleMessage;

      ws.onclose = () => {
        setConnected(false);
        // exponential backoff reconnection
        const timeout = Math.min(10000, 1000 * 2 ** reconnectAttempts.current);
        reconnectAttempts.current += 1;
        setTimeout(connect, timeout);
      };

      ws.onerror = err => {
        console.error('WebSocket error', err);
        ws.close();
      };
    };

    connect();

    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, user.id]);

  return { connected, broadcastChange, broadcastCursor, remoteCursors };
}
