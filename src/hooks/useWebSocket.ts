import { useEffect, useRef, useState, useCallback } from 'react';

interface WebSocketHookOptions {
  url: string;
  onMessage: (event: MessageEvent) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface WebSocketConnection {
  sendMessage: (data: any) => void;
  status: 'connected' | 'disconnected' | 'connecting';
}

export function useWebSocket({ url, onMessage, onOpen, onClose }: WebSocketHookOptions): WebSocketConnection {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
  const socketRef = useRef<WebSocket | null>(null);
  const pendingQueue = useRef<any[]>([]);
  const reconnectAttempts = useRef(0);
  const maxReconnectDelay = 30000; // 30 seconds

  const flushQueue = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      while (pendingQueue.current.length > 0) {
        const data = pendingQueue.current.shift();
        socketRef.current.send(JSON.stringify(data));
      }
    }
  }, []);

  const sendMessage = useCallback((data: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      pendingQueue.current.push(data);
    }
  }, []);

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
      // Request latest document state after (re)connection
      sendMessage({ type: 'sync-request' });
      // Broadcast presence (handled in useAwareness hook via same socket)
      if (onOpen) onOpen();
      flushQueue();
    };

    ws.onmessage = (event) => {
      onMessage(event);
    };

    ws.onclose = () => {
      setStatus('disconnected');
      if (onClose) onClose();
      // Exponential backoff reconnection
      const delay = Math.min(1000 * 2 ** reconnectAttempts.current, maxReconnectDelay);
      reconnectAttempts.current += 1;
      setTimeout(() => {
        connect();
      }, delay);
    };

    ws.onerror = () => {
      // Errors are handled by onclose automatically in most browsers
      ws.close();
    };
  }, [url, onMessage, onOpen, onClose, sendMessage, flushQueue]);

  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sendMessage, status };
}
