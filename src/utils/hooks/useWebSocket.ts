import { useEffect, useRef, useState } from 'react';
import { useReconnection } from './useReconnection';
import { createConflictResolver } from '../useConflictResolver';
import { EditorChange, PresenceMessage } from '../../types';

/**
 * Centralised WebSocket hook used by the editor and awareness layers.
 * Handles automatic reconnection with exponential back‑off, versioned
 * conflict resolution, and an initial document sync after each reconnect.
 */
export function useWebSocket(
  url: string,
  username: string,
  onRemoteChange: (change: EditorChange) => void,
  onPresence: (msg: PresenceMessage) => void
) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const conflictResolver = useRef(createConflictResolver());

  const { schedule, reset } = useReconnection(() => {
    connect();
  });

  const send = (msg: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  const connect = () => {
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      setConnected(true);
      reset();
      // announce ourselves
      send({ type: 'join', username });
      // request the latest document state from the server
      send({ type: 'syncRequest' });
    };
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'change': {
          const remote = conflictResolver.current.applyRemoteChange(data.change, data.version);
          if (remote) {
            onRemoteChange(remote);
          }
          break;
        }
        case 'sync': {
          // Full document sync – replace local state and version.
          conflictResolver.current.applyRemoteChange({ text: data.content }, data.version);
          onRemoteChange({ text: data.content });
          break;
        }
        case 'presence': {
          onPresence(data);
          break;
        default:
          // ignore unknown messages
          break;
      }
    };
    wsRef.current.onclose = () => {
      setConnected(false);
      schedule();
    };
    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, username]);

  const broadcastChange = (change: EditorChange) => {
    const { change: localChange, version } = conflictResolver.current.applyLocalChange(change);
    send({ type: 'change', change: localChange, version });
  };

  const broadcastPresence = (msg: PresenceMessage) => {
    send({ type: 'presence', ...msg });
  };

  return { connected, broadcastChange, broadcastPresence };
}
