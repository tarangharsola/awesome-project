import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';
import { WS_URL } from '../utils/websocketClient';

type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

export const useWebSocket = (roomId: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const backoffRef = useRef<number>(1000);
  const maxBackoff = 30000;
  const reconnectAttempts = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    setConnectionStatus('connecting');
    const ws = new WebSocket(`${WS_URL}?room=${roomId}`);

    ws.onopen = () => {
      setConnectionStatus('connected');
      backoffRef.current = 1000;
      reconnectAttempts.current = 0;
    };

    ws.onmessage = (event) => {
      const data: WebSocketMessage = JSON.parse(event.data);
      // TODO: dispatch data to store or relevant listeners
    };

    ws.onclose = () => {
      setConnectionStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };

    setSocket(ws);
  }, [roomId]);

  const scheduleReconnect = () => {
    if (timeoutRef.current) return;
    const delay = Math.min(backoffRef.current, maxBackoff);
    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      reconnectAttempts.current += 1;
      backoffRef.current *= 2;
      connect();
    }, delay);
  };

  const sendMessage = useCallback(
    (msg: WebSocketMessage) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(msg));
      }
    },
    [socket]
  );

  const manualRetry = useCallback(() => {
    if (socket?.readyState !== WebSocket.OPEN) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      backoffRef.current = 1000;
      connect();
    }
  }, [socket, connect]);

  useEffect(() => {
    connect();
    return () => {
      if (socket) {
        socket.close();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect]);

  return { socket, sendMessage, connectionStatus, manualRetry };
};